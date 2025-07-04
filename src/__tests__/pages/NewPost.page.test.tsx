import '@/__tests__/mocks/next-cache.mock';
import '@/__tests__/mocks/next-headers.mock';
import NewPostPage from '@/app/blog/posts/new/page';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { describe } from 'vitest';
import {
	blogCategories,
	dummyFile,
	dummyLargeFile,
	dummyUnsoportedFile,
	newPostCoverImageInput,
	newPostDescriptionInput,
	newPostSaveButton,
	newPostTitleInput,
	postEditorbBoldButton,
	postEditorCheckedlistButton,
	postEditorCodeButton,
	postEditorContentArea,
	postEditorimageButton,
	postEditorItalicButton,
	postEditorLinkButton,
	postEditorOrderedlistButton,
	postEditorPreviewButton,
	postEditorQuoteButton,
	postEditorStrikethroughButton,
	postEditorUnorderedlistButton,
} from '../fixtures';
import mockObjectFromEntries from '../mocks/objectFromEntries.mock';
import { setup, waitForElementToBeRemoved } from '../testUtils';

const description =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum, nibh euismod consectetur pellentesque, arcu nunc feugiat sapien, quis aliquam risus neque lobortis erat. Proin hendrerit nec magna imperdiet dignissim. Curabitur vestibulum.';
const shortDescription =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim.';
const longDescription =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis lorem et sapien molestie pharetra. Vivamus tellus lorem, dictum non tincidunt sit amet, bibendum sit amet nisi. Pellentesque faucibus dapibus ipsum, vitae interdum magna congue ut. Praesent finibus tempor orci. Praesent erat tellus, consequat non ex vel, ultricies porta tortor. Phasellus felis mi, sagittis commodo libero sit amet, vehicula iaculis.';

describe('<NewPostPage/>', () => {
	describe('Interaction', () => {
		it('deberia de ser capaz de escribir en el content area del post', async () => {
			const { user } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'hola mundo');

			expect(postEditorContentArea()).toHaveValue('hola mundo');
		});

		it('deberia de ser capaz de escribir en el input de titulo', async () => {
			const { user } = setup(await NewPostPage());

			await user.type(newPostTitleInput()!, 'hola mundo');

			expect(newPostTitleInput()).toHaveValue('hola mundo');
		});

		it('deberia de ser capaz de escribir en el input de descripcion', async () => {
			const { user } = setup(await NewPostPage());

			await user.type(newPostTitleInput()!, 'hola mundo');

			expect(newPostTitleInput()).toHaveValue('hola mundo');
		});

		it('deberia de ocultar los botones de edicion al hacer click en preview', async () => {
			const { user } = setup(await NewPostPage());

			await user.click(postEditorPreviewButton()!);

			expect(postEditorbBoldButton()).not.toBeInTheDocument();
			expect(postEditorItalicButton()).not.toBeInTheDocument();
			expect(postEditorStrikethroughButton()).not.toBeInTheDocument();
			expect(postEditorLinkButton()).not.toBeInTheDocument();
			expect(postEditorQuoteButton()).not.toBeInTheDocument();
			expect(postEditorCodeButton()).not.toBeInTheDocument();
			expect(postEditorimageButton()).not.toBeInTheDocument();
			expect(postEditorUnorderedlistButton()).not.toBeInTheDocument();
			expect(postEditorOrderedlistButton()).not.toBeInTheDocument();
			expect(postEditorCheckedlistButton()).not.toBeInTheDocument();
		});

		it('deberia de volver a mostrar los botones de edicion al volver a hacer click en preview', async () => {
			const { user } = setup(await NewPostPage());

			await user.dblClick(postEditorPreviewButton()!);

			expect(postEditorbBoldButton()).toBeInTheDocument();
			expect(postEditorItalicButton()).toBeInTheDocument();
			expect(postEditorStrikethroughButton()).toBeInTheDocument();
			expect(postEditorLinkButton()).toBeInTheDocument();
			expect(postEditorQuoteButton()).toBeInTheDocument();
			expect(postEditorCodeButton()).toBeInTheDocument();
			expect(postEditorimageButton()).toBeInTheDocument();
			expect(postEditorUnorderedlistButton()).toBeInTheDocument();
			expect(postEditorOrderedlistButton()).toBeInTheDocument();
			expect(postEditorCheckedlistButton()).toBeInTheDocument();
		});

		it('deberia de ocultar el input para el contenido del post al hacer click en preview', async () => {
			const { user } = setup(await NewPostPage());

			await user.click(postEditorPreviewButton()!);

			expect(postEditorContentArea()).not.toBeInTheDocument();
		});

		it('deberia de mostrar el preview del codigo markdown al hacer click en preview', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'hola mundo');
			await user.click(postEditorPreviewButton()!);

			expect(postEditorContentArea()).not.toBeInTheDocument();
			expect(queryByText(/hola mundo/i)).toBeInTheDocument();
		});

		it('deberia de mostrar nuevamente el content area del post al hacer click en preview otra vez', async () => {
			const { user } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'hola mundo');
			await user.dblClick(postEditorPreviewButton()!);

			expect(postEditorContentArea()).toBeInTheDocument();
			expect(postEditorContentArea()).toHaveValue('hola mundo');
		});

		it('deberia de poder seleccionar una categoria', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.click(queryByText(/style/i)!);

			expect(queryByText(/coding/i)?.className.includes('active')).toBeFalsy();
			expect(queryByText(/style/i)?.className.includes('active')).toBeTruthy();
		});

		it('deberia de mostrar un indicador de que el post se esta guardando', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			const file = new File(['holamundo'], 'hola.png', { type: 'image/png' });
			await user.upload(newPostCoverImageInput(), file);
			await user.click(queryByText(/categories/i)!);
			await user.click(queryByText(/coding/i)!);
			await user.click(newPostSaveButton()!);

			expect(queryByText('Saving...')).toBeInTheDocument();
			expect(newPostSaveButton()).toHaveAttribute('disabled', '');
		});

		it('deberia de aparecer una notificacion al guardar el post correctamente', async () => {
			const { user, queryByText, queryByRole } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.upload(newPostCoverImageInput(), dummyFile);
			await user.click(queryByText('Categories')!);
			await user.click(queryByText(/style/i)!);
			await user.click(newPostSaveButton()!);

			await waitForElementToBeRemoved(() => queryByText('Saving...'), {
				timeout: 6000,
			});

			expect(queryByRole('alert')).toBeInTheDocument();
			expect(
				queryByText('Tu post se ha creado correctamente')
			).toBeInTheDocument();
			expect(
				queryByRole('link', { name: /haz clic aquí para verlo/i })
			).toBeInTheDocument();
			expect(
				queryByRole('link', { name: /haz clic aquí para verlo/i })
			).toHaveAttribute(
				'href',
				`/blog/posts/${Object.keys(blogCategories)[0]}`
			);
		});

		it('deberia de navegar a la pagina del post al hacer click en el enlace al post de la notificacion al guardar el post correctamente', async () => {
			const { user, queryByText, queryByRole } = setup(await NewPostPage(), {
				wrapper: MemoryRouterProvider,
			});

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, 'Title of the new post :D');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			const file = new File(['hola'], 'hola.png', { type: 'image/png' });
			await user.upload(newPostCoverImageInput(), file);
			await user.click(queryByText('Categories')!);
			await user.click(queryByText(/style/i)!);
			await user.click(newPostSaveButton()!);

			await waitForElementToBeRemoved(() => queryByText('Saving...'), {
				timeout: 6000,
			});

			expect(queryByRole('alert')).toBeInTheDocument();

			const postURL = queryByRole('link', {
				name: /haz clic aquí para verlo/i,
			}) as HTMLAnchorElement;

			await user.click(postURL);

			expect(mockRouter.asPath).toEqual(
				`/blog/posts/${Object.keys(blogCategories)[0]}`
			);
		});

		it('deberia de cerrar la notificacion de que el post se guardo correctamente al hacer click en el boton de cerrar', async () => {
			const { user, queryByText, queryByRole } = setup(await NewPostPage());
			const closeAlertButton = () =>
				queryByRole('button', {
					name: /close alert/i,
				}) as HTMLButtonElement;

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, 'Title of the new post :D');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			const file = new File(['hola'], 'hola.png', { type: 'image/png' });
			await user.upload(newPostCoverImageInput(), file);
			await user.click(queryByText('Categories')!);
			await user.click(queryByText(/style/i)!);
			await user.click(newPostSaveButton()!);

			await waitForElementToBeRemoved(() => queryByText('Saving...'), {
				timeout: 6000,
			});

			await user.click(closeAlertButton());

			expect(queryByRole('alert')).not.toBeInTheDocument();
		});
	});

	describe('Validation', () => {
		it('deberia de mostrar un error si no hay contenido al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Please, add content to your post')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si no hay titulo al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Please, add a title to your post')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si el titulo es menor a 10 caracteres al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345');
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('The title must be longer than 10 characters')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si no hay una descripcion al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Please, add a description to your post')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si la descripcion es menor a 220 caracteres  al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			await user.type(newPostDescriptionInput()!, shortDescription);
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('The description must be longer than 220 characters')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si la descripcion es mayor a 300 caracteres  al guardar el post', async () => {
			const { user, findByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = longDescription;
			await user.click(newPostSaveButton()!);

			expect(
				await findByText('The description must be less than 300 characters')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si no se selecciona una imagen de cover al guardar el post', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Please, add a cover image to your post')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si la imagen seleccionada es mayor a 1MB', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyLargeFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.upload(newPostCoverImageInput(), dummyLargeFile);
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('The image must be less than 1MB')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si el tipo de la imagen seleccionada no es soportado', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyUnsoportedFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.upload(newPostCoverImageInput(), dummyUnsoportedFile);
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Only JPEG, PNG and WEBP images are allowed')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si no se selecciona ninguna categoria', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			const file = new File(['hola'], 'hola.png', { type: 'image/png' });
			await user.upload(newPostCoverImageInput(), file);
			await user.click(newPostSaveButton()!);

			expect(
				queryByText('Please add a category to your post')
			).toBeInTheDocument();
		});

		it('deberia de mostrar un error si el post no se pudo guardar', async () => {
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyFile });

			await user.type(postEditorContentArea()!, 'post content');
			await user.type(newPostTitleInput()!, 'title not valid post');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.upload(newPostCoverImageInput(), dummyFile);
			await user.click(queryByText('Categories')!);
			await user.click(queryByText(/coding/i)!);
			await user.click(newPostSaveButton()!);

			await waitForElementToBeRemoved(() => queryByText('Saving...'), {
				timeout: 6000,
			});

			expect(
				queryByText(
					/no se pudo guardar el post\. por favor, intenta de nuevo más tarde/i
				)
			);
		});

		it('deberia de borrar el error del contenido al guardar el post al volver a cambiar su contenido', async () => {
			const { user, queryByText } = setup(await NewPostPage());
			const errorMessage = () =>
				queryByText('Please, add content to your post');

			await user.click(newPostSaveButton()!);

			expect(errorMessage()).toBeInTheDocument();

			await user.type(postEditorContentArea()!, 'hola');

			expect(errorMessage()).not.toBeInTheDocument();
		});

		it('deberia de borrar el error del titulo al guardar el post al volver a cambiar su contenido', async () => {
			const { user, queryByText } = setup(await NewPostPage());
			const errorMessage = () =>
				queryByText('Please, add a title to your post');

			await user.type(postEditorContentArea()!, 'content');
			await user.click(newPostSaveButton()!);

			expect(errorMessage()).toBeInTheDocument();

			await user.type(newPostTitleInput()!, '12345678910');

			expect(errorMessage()).not.toBeInTheDocument();
		});

		it(
			'deberia de borrar el error de la descripcion al guardar el post al volver a cambiar su contenido',
			async () => {
				const { user, queryByText } = setup(await NewPostPage());
				const errorMessage = () =>
					queryByText('Please, add a description to your post');

				await user.type(postEditorContentArea()!, 'content');
				await user.type(newPostTitleInput()!, '12345678910');
				await user.click(newPostSaveButton()!);

				expect(errorMessage()).toBeInTheDocument();

				await user.type(newPostDescriptionInput()!, description);

				expect(errorMessage()).not.toBeInTheDocument();
			},
			{ timeout: 6000 }
		);

		it('deberia de borrar el error de la imagen al guardar el post al volver a cambiar su contenido', async () => {
			const errorMessage = () =>
				queryByText('Please, add a cover image to your post');
			const { user, queryByText } = setup(await NewPostPage());

			await user.type(postEditorContentArea()!, 'content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.click(newPostSaveButton()!);

			expect(errorMessage()).toBeInTheDocument();

			mockObjectFromEntries({ cover_image: dummyFile });
			await user.upload(newPostCoverImageInput(), dummyFile);

			expect(errorMessage()).not.toBeInTheDocument();
		});

		it('deberia de borrar el error de la categoria al guardar el post al volver a cambiar su contenido', async () => {
			const errorMessage = () =>
				queryByText('Please add a category to your post');
			const { user, queryByText } = setup(await NewPostPage());

			mockObjectFromEntries({ cover_image: dummyFile });
			await user.type(postEditorContentArea()!, 'content');
			await user.type(newPostTitleInput()!, '12345678910');
			(newPostDescriptionInput() as HTMLInputElement).value = description;
			await user.upload(newPostCoverImageInput(), dummyFile);
			await user.click(newPostSaveButton()!);

			expect(errorMessage()).toBeInTheDocument();

			await user.click(queryByText('Categories')!);
			await user.click(queryByText(/coding/i)!);

			expect(errorMessage()).not.toBeInTheDocument();
		});
	});
});
