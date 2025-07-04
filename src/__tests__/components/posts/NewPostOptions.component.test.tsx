import {
	blogCategories,
	dummyFile,
	newPostCoverImageInput,
	newPostDescriptionInput,
	newPostSaveButton,
	newPostTitleInput,
} from '@/__tests__/fixtures';
import { screen, setup } from '@/__tests__/testUtils';
import NewPostOptions from '@/components/posts/NewPostOptions.component';
import { capitalize } from '@/utils';
import { describe } from 'vitest';

const categoriesEntries = Object.entries(blogCategories).map(([k, v]) => ({
	...v,
	id: k,
}));
const changeHandler = vi.fn();
const loading = false;

describe('<NewPostOptions />', () => {
	describe('Layout', () => {
		it('deberia de mostrar el input para el titulo del post', () => {
			setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(newPostTitleInput()).toBeInTheDocument();
			expect(newPostTitleInput()).toHaveAttribute('type', 'text');
			expect(newPostTitleInput()).toHaveAttribute('name', 'title');
			expect(newPostTitleInput()).toHaveAttribute('autocomplete', 'off');
			expect(newPostTitleInput()).toHaveAttribute(
				'placeholder',
				'Add a title for your post'
			);
		});

		it('deberia de mostrar correctamente las categorias de los posts', () => {
			setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			Object.entries(blogCategories).forEach(([_, category]) => {
				const option = screen.queryByText(capitalize(category.name));
				expect(option).toBeInTheDocument();
				expect(option).toHaveAttribute('type', 'button');
			});
		});

		it('deberia de mostrar el input de descripcion', () => {
			setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(newPostDescriptionInput()).toBeInTheDocument();
			expect(newPostDescriptionInput()?.nodeName).toBe('TEXTAREA');
			expect(newPostDescriptionInput()).toHaveAttribute('name', 'description');
			expect(newPostDescriptionInput()).toHaveAttribute(
				'placeholder',
				'Add a brief description'
			);
		});

		it('deberia de mostrar el input del image picker', () => {
			setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(newPostCoverImageInput()).toBeInTheDocument();
			expect(newPostCoverImageInput()).toHaveAttribute('type', 'file');
			expect(newPostCoverImageInput()).toHaveAttribute('name', 'cover_image');
			expect(newPostCoverImageInput()).toHaveAttribute(
				'accept',
				'image/png,image/jpeg,image/webp'
			);
		});

		it('deberia de mostrar el boton para guardar el post', () => {
			setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(newPostSaveButton()).toBeInTheDocument();
			expect(newPostSaveButton()).toHaveAttribute('type', 'submit');
		});

		it('deberia de mostrar el input para marcar el post como featured', () => {
			const { queryByLabelText } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(queryByLabelText('Mark as featured post')).toBeInTheDocument();
		});

		it('deberia de mostrar el input para marcar el post como editors pick', () => {
			const { queryByLabelText } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			expect(
				queryByLabelText("Mark as editor's pick post")
			).toBeInTheDocument();
		});
	});

	describe('Interaction', () => {
		it('deberia de llamar a la funcion "onChange" al escribir en el input de titulo', async () => {
			const { user } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			await user.type(newPostTitleInput()!, '123');

			expect(changeHandler).toHaveBeenCalledTimes(3);
		});

		it('deberia de llamar a la funcion "onChange" al escribir en el input de descripcion', async () => {
			const { user } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			await user.type(newPostDescriptionInput()!, '123');

			expect(changeHandler).toHaveBeenCalledTimes(3);
		});

		it('deberia de llamar a la funcion "onChange" al seleccionar una imagen con el input de imagen', async () => {
			const { user } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			await user.upload(newPostCoverImageInput()!, dummyFile);

			expect(changeHandler).toHaveBeenCalledOnce();
		});

		it('deberia de llamar a la funcion "onChange" al seleccionar una categoria', async () => {
			const { user, queryByText } = setup(
				<NewPostOptions
					categories={categoriesEntries}
					onChange={changeHandler}
					isLoading={loading}
				/>
			);

			await user.click(queryByText(/categories/i)!);
			await user.click(queryByText(/coding/i)!);

			expect(changeHandler).toHaveBeenCalledOnce();
		});
	});
});
