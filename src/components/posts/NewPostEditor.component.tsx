import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
	boldCommand,
	checkedListCommand,
	codeBlockCommand,
	headingLevel1Command,
	headingLevel2Command,
	headingLevel3Command,
	headingLevel4Command,
	headingLevel5Command,
	headingLevel6Command,
	imageCommand,
	italicCommand,
	linkCommand,
	orderedListCommand,
	quoteCommand,
	strikethroughCommand,
	unorderedListCommand,
	useTextAreaMarkdownEditor,
} from 'react-mde';
import Icon from '../common/Icon.component';
import MarkdownRenderer from '../common/MarkdownRenderer.component';

const commandMap = {
	heading1: headingLevel1Command,
	heading2: headingLevel2Command,
	heading3: headingLevel3Command,
	heading4: headingLevel4Command,
	heading5: headingLevel5Command,
	heading6: headingLevel6Command,
	bold: boldCommand,
	italic: italicCommand,
	strikethrough: strikethroughCommand,
	link: linkCommand,
	quote: quoteCommand,
	code: codeBlockCommand,
	image: imageCommand,
	unOrderedList: unorderedListCommand,
	orderedList: orderedListCommand,
	checkList: checkedListCommand,
};

function NewPostEditor({
	content,
	onChange,
}: {
	content: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.JSX.Element {
	const [preview, setPreview] = React.useState<boolean>(false);
	const { ref, commandController } = useTextAreaMarkdownEditor({
		commandMap,
	});

	function handleEditorCommand(
		command: keyof typeof commandMap & string
	): () => Promise<void> {
		return async () => {
			await commandController.executeCommand(command);
		};
	}

	function handlePreviewToggle(): void {
		setPreview((prevState) => !prevState);
	}

	return (
		<div
			className='h-100 d-flex flex-column overflow-auto position-relative'
			style={{
				maxHeight: '680px',
			}}
		>
			<Toolbar
				onHeading1={handleEditorCommand('heading1')}
				onHeading2={handleEditorCommand('heading2')}
				onHeading3={handleEditorCommand('heading3')}
				onHeading4={handleEditorCommand('heading4')}
				onHeading5={handleEditorCommand('heading5')}
				onHeading6={handleEditorCommand('heading6')}
				onBold={handleEditorCommand('bold')}
				onItalic={handleEditorCommand('italic')}
				onStrikethrough={handleEditorCommand('strikethrough')}
				onLink={handleEditorCommand('link')}
				onQuote={handleEditorCommand('quote')}
				onCode={handleEditorCommand('code')}
				onImage={handleEditorCommand('image')}
				onUnorderedList={handleEditorCommand('unOrderedList')}
				onOrderedList={handleEditorCommand('orderedList')}
				onCheckList={handleEditorCommand('checkList')}
				onPreview={handlePreviewToggle}
				isPreviewMode={!!preview}
			/>
			{preview ? (
				<div className='border h-100 p-3'>
					<MarkdownRenderer content={content} />
				</div>
			) : (
				<Form.Control
					onChange={onChange}
					as={'textarea'}
					ref={ref}
					placeholder='Type your post'
					className='flex-fill rounded-top-0 rounded-bottom-2 p-3'
					name='content'
					defaultValue={content}
				/>
			)}
		</div>
	);
}

export default NewPostEditor;

function Toolbar({
	onHeading1,
	onHeading2,
	onHeading3,
	onHeading4,
	onHeading5,
	onHeading6,
	onBold,
	onItalic,
	onStrikethrough,
	onLink,
	onQuote,
	onPreview,
	onCode,
	onImage,
	onUnorderedList,
	onOrderedList,
	onCheckList,
	isPreviewMode,
}: {
	onHeading1: () => void;
	onHeading2: () => void;
	onHeading3: () => void;
	onHeading4: () => void;
	onHeading5: () => void;
	onHeading6: () => void;
	onBold: () => void;
	onItalic: () => void;
	onStrikethrough: () => void;
	onPreview: () => void;
	onLink: () => void;
	onQuote: () => void;
	onCode: () => void;
	onImage: () => void;
	onUnorderedList: () => void;
	onOrderedList: () => void;
	onCheckList: () => void;
	isPreviewMode?: boolean;
}): React.JSX.Element {
	return (
		<div className='border bg-light rounded-top-2 position-sticky top-0 start-0'>
			<ToolbarButtonGroup start>
				<ToolbarButton
					onClick={onPreview}
					type='button'
				>
					<span className='visually-hidden'>Preview</span>
					<span>
						<Icon name={isPreviewMode ? 'preview-solid' : 'preview-outline'} />
					</span>
				</ToolbarButton>
			</ToolbarButtonGroup>
			{!isPreviewMode && (
				<>
					<ToolbarButtonGroup>
						<ToolbarButton
							type='button'
							onClick={onHeading1}
						>
							<span className='visually-hidden'>Insert heading 1</span>
							<span>
								<Icon name='heading-1' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onHeading2}
						>
							<span className='visually-hidden'>Insert heading 2</span>
							<span>
								<Icon name='heading-2' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onHeading3}
						>
							<span className='visually-hidden'>Insert heading 3</span>
							<span>
								<Icon name='heading-3' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onHeading4}
						>
							<span className='visually-hidden'>Insert heading 4</span>
							<span>
								<Icon name='heading-4' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onHeading5}
						>
							<span className='visually-hidden'>Insert heading 5</span>
							<span>
								<Icon name='heading-5' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onHeading6}
						>
							<span className='visually-hidden'>Insert heading 6</span>
							<span>
								<Icon name='heading-6' />
							</span>
						</ToolbarButton>
					</ToolbarButtonGroup>
					<ToolbarButtonGroup>
						<ToolbarButton
							type='button'
							onClick={onBold}
						>
							<span className='visually-hidden'>Add bold text</span>
							<span>
								<Icon name='bold' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onItalic}
						>
							<span className='visually-hidden'>Add italic text</span>
							<span>
								<Icon name='italic' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onStrikethrough}
						>
							<span className='visually-hidden'>Add strikethrough text</span>
							<span>
								<Icon name='strikethrough' />
							</span>
						</ToolbarButton>
					</ToolbarButtonGroup>
					<ToolbarButtonGroup>
						<ToolbarButton
							type='button'
							onClick={onLink}
						>
							<span className='visually-hidden'>Add a link</span>
							<span>
								<Icon name='link' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onQuote}
						>
							<span className='visually-hidden'>Add a quote</span>
							<span>
								<Icon name='quote' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onCode}
						>
							<span className='visually-hidden'>Insert code</span>
							<span>
								<Icon name='code' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onImage}
						>
							<span className='visually-hidden'>Add image</span>
							<span>
								<Icon name='image-outline' />
							</span>
						</ToolbarButton>
					</ToolbarButtonGroup>
					<ToolbarButtonGroup end>
						<ToolbarButton
							type='button'
							onClick={onUnorderedList}
						>
							<span className='visually-hidden'>Add unordered list</span>
							<span>
								<Icon name='unordered-list' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onOrderedList}
						>
							<span className='visually-hidden'>Add ordered list</span>
							<span>
								<Icon name='ordered-list' />
							</span>
						</ToolbarButton>
						<ToolbarButton
							type='button'
							onClick={onCheckList}
						>
							<span className='visually-hidden'>Add checked list</span>
							<span>
								<Icon name='checklist' />
							</span>
						</ToolbarButton>
					</ToolbarButtonGroup>
				</>
			)}
		</div>
	);
}

function ToolbarButton({
	children,
	...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren): React.JSX.Element {
	return (
		<Button
			type='button'
			variant='light'
			className='rounded-0'
			{...restProps}
		>
			{children}
		</Button>
	);
}

function ToolbarButtonGroup({
	children,
	start,
	end,
}: {
	start?: boolean;
	end?: boolean;
} & React.PropsWithChildren): React.JSX.Element {
	const classname = clsx(
		'border border-top-0 border-bottom-0 d-inline-block px-2',
		{ 'border-start-0': !!start },
		{ 'border-end-0': !!end }
	);

	return <div className={classname}>{children}</div>;
}
