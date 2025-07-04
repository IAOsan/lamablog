import {
	postEditorbBoldButton,
	postEditorCheckedlistButton,
	postEditorCodeButton,
	postEditorContentArea,
	postEditorHeading1Button,
	postEditorHeading2Button,
	postEditorHeading3Button,
	postEditorHeading4Button,
	postEditorHeading5Button,
	postEditorHeading6Button,
	postEditorimageButton,
	postEditorItalicButton,
	postEditorLinkButton,
	postEditorOrderedlistButton,
	postEditorPreviewButton,
	postEditorQuoteButton,
	postEditorStrikethroughButton,
	postEditorUnorderedlistButton,
} from '@/__tests__/fixtures';
import { executeCommand } from '@/__tests__/mocks/react-mde.mock';
import { setup } from '@/__tests__/testUtils';
import NewPostEditor from '@/components/posts/NewPostEditor.component';
import { vi } from 'vitest';

const content = 'holamundo';
const onChangeHandler = vi.fn();

describe('<NewPostEditor />', () => {
	describe('Layout', () => {
		it('debería mostrar el botón de heading 1', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading1Button()).toBeInTheDocument();
			expect(postEditorHeading1Button()).toHaveAttribute('type', 'button');
		});

		it('debería mostrar el botón de heading 2', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading2Button()).toBeInTheDocument();
			expect(postEditorHeading2Button()).toHaveAttribute('type', 'button');
		});

		it('debería mostrar el botón de heading 3', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading3Button()).toBeInTheDocument();
			expect(postEditorHeading3Button()).toHaveAttribute('type', 'button');
		});

		it('debería mostrar el botón de heading 4', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading4Button()).toBeInTheDocument();
			expect(postEditorHeading4Button()).toHaveAttribute('type', 'button');
		});

		it('debería mostrar el botón de heading 5', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading5Button()).toBeInTheDocument();
			expect(postEditorHeading5Button()).toHaveAttribute('type', 'button');
		});

		it('debería mostrar el botón de heading 6', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorHeading6Button()).toBeInTheDocument();
			expect(postEditorHeading6Button()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de bold', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorbBoldButton()).toBeInTheDocument();
			expect(postEditorbBoldButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de italica', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorItalicButton()).toBeInTheDocument();
			expect(postEditorItalicButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de strikethrough', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorStrikethroughButton()).toBeInTheDocument();
			expect(postEditorStrikethroughButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de link', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorLinkButton()).toBeInTheDocument();
			expect(postEditorLinkButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de quote', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorQuoteButton()).toBeInTheDocument();
			expect(postEditorQuoteButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de code', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorCodeButton()).toBeInTheDocument();
			expect(postEditorCodeButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de imagen', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorimageButton()).toBeInTheDocument();
			expect(postEditorimageButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de imagen', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorimageButton()).toBeInTheDocument();
			expect(postEditorimageButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de lista desordenada', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorUnorderedlistButton()).toBeInTheDocument();
			expect(postEditorUnorderedlistButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de lista desordenada', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorOrderedlistButton()).toBeInTheDocument();
			expect(postEditorOrderedlistButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de checked list', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorCheckedlistButton()).toBeInTheDocument();
			expect(postEditorCheckedlistButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar el boton de preview', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorPreviewButton()).toBeInTheDocument();
			expect(postEditorPreviewButton()).toHaveAttribute('type', 'button');
		});

		it('deberia de mostrar inicialmente el content area para el post', () => {
			setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			expect(postEditorContentArea()).toBeInTheDocument();
			expect(postEditorContentArea()?.nodeName).toBe('TEXTAREA');
			expect(postEditorContentArea()).toHaveAttribute('name', 'content');
		});
	});

	describe('Interaction', () => {
		it('debería llamar executeCommand con "heading1" al hacer click en el botón Heading 1', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading1Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading1');
		});

		it('debería llamar executeCommand con "heading2" al hacer click en el botón Heading 2', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading2Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading2');
		});

		it('debería llamar executeCommand con "heading3" al hacer click en el botón Heading 3', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading3Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading3');
		});

		it('debería llamar executeCommand con "heading4" al hacer click en el botón Heading 4', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading4Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading4');
		});

		it('debería llamar executeCommand con "heading5" al hacer click en el botón Heading 5', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading5Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading5');
		});

		it('debería llamar executeCommand con "heading6" al hacer click en el botón Heading 6', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorHeading6Button()!);

			expect(executeCommand).toHaveBeenCalledWith('heading6');
		});

		it('debería llamar executeCommand con "bold" al hacer click en el botón bold', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorbBoldButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('bold');
		});

		it('debería llamar executeCommand con "italic" al hacer click en el botón italic', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorItalicButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('italic');
		});

		it('debería llamar executeCommand con "strikethrough" al hacer click en el botón strikethrough', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorStrikethroughButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('strikethrough');
		});

		it('debería llamar executeCommand con "link" al hacer click en el botón link', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorLinkButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('link');
		});

		it('debería llamar executeCommand con "quote" al hacer click en el botón quote', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorQuoteButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('quote');
		});

		it('debería llamar executeCommand con "code" al hacer click en el botón code block', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorCodeButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('code');
		});

		it('debería llamar executeCommand con "image" al hacer click en el botón image', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorimageButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('image');
		});

		it('debería llamar executeCommand con "unOrderedList" al hacer click en el botón unorderedlist', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorUnorderedlistButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('unOrderedList');
		});

		it('debería llamar executeCommand con "orderedList" al hacer click en el botón orderedlist', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorOrderedlistButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('orderedList');
		});

		it('debería llamar executeCommand con "checkList" al hacer click en el botón checklist', async () => {
			const { user } = setup(
				<NewPostEditor
					content={content}
					onChange={onChangeHandler}
				/>
			);

			await user.click(postEditorCheckedlistButton()!);

			expect(executeCommand).toHaveBeenCalledExactlyOnceWith('checkList');
		});
	});
});
