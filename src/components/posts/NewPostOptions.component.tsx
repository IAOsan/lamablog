import { IPostCategory } from '@/types/custom.types';
import { capitalize, testId } from '@/utils';
import clsx from 'clsx';
import React from 'react';
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Button,
	Form,
	ListGroup,
	ListGroupItem,
	Spinner,
	Stack,
} from 'react-bootstrap';
import ImagePicker from '../common/ImagePicker.component';

function NewPostOptions({
	categories,
	onChange,
	isLoading,
}: {
	categories: IPostCategory[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isLoading: boolean;
}): React.JSX.Element {
	return (
		<div
			className='d-flex flex-column justify-content-between'
			style={{
				height: '680px',
			}}
		>
			<Accordion defaultActiveKey='0'>
				<AccordionItem eventKey='0'>
					<AccordionHeader>Title</AccordionHeader>
					<AccordionBody>
						<Form.Control
							id='titleInput'
							type='text'
							name='title'
							autoComplete='off'
							placeholder='Add a title for your post'
							onChange={onChange}
						/>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem eventKey='1'>
					<AccordionHeader>Description</AccordionHeader>
					<AccordionBody>
						<Form.Control
							id='descriptionInput'
							name='description'
							as='textarea'
							rows={3}
							placeholder='Add a brief description'
							onChange={onChange}
						/>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem eventKey='2'>
					<AccordionHeader>Cover image</AccordionHeader>
					<AccordionBody>
						<ImagePicker>
							<ImagePicker.Preview
								style={{
									paddingTop: '66%',
								}}
								className='bg-dark-subtle border-0 overflow-hidden w-100 position-relative'
							>
								<span className='text-muted position-absolute top-50 start-0 text-center w-100'>
									Set cover image
								</span>
							</ImagePicker.Preview>
							<ImagePicker.Input
								className='d-none'
								id={'image-picker-input'}
								{...testId('image-picker-input')}
								name='cover_image'
								accept={'image/png,image/jpeg,image/webp'}
								onChange={onChange}
							/>
						</ImagePicker>
					</AccordionBody>
				</AccordionItem>
				<AccordionItem eventKey='3'>
					<AccordionHeader>Categories</AccordionHeader>
					<AccordionBody>
						<SelectCategory
							categories={categories}
							onChange={onChange}
						/>
					</AccordionBody>
				</AccordionItem>
			</Accordion>
			<div>
				<Stack
					className='mb-4'
					direction='vertical'
					gap={2}
				>
					<Form.Check
						type='checkbox'
						id='featuredInput'
						name='featured'
						label='Mark as featured post'
					/>
					<Form.Check
						size={4}
						type='checkbox'
						id='editorsPickInput'
						name='editors_pick'
						label="Mark as editor's pick post"
					/>
				</Stack>
				<Button
					disabled={isLoading}
					type='submit'
					variant='primary'
					size='lg'
					className='d-block w-100'
					{...testId('newpost-save-button')}
				>
					{isLoading ? (
						<>
							<Spinner
								as='span'
								animation='border'
								size='sm'
								role='status'
								aria-hidden='true'
							/>{' '}
							Saving...
						</>
					) : (
						'Save & close'
					)}
				</Button>
			</div>
		</div>
	);
}

export default NewPostOptions;

function SelectCategory({
	categories,
	onChange,
}: {
	categories: IPostCategory[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): React.JSX.Element {
	const [selectedCategory, setSelectedCategory] = React.useState<string>('');
	const categoryInputRef = React.useRef<HTMLInputElement>(null);

	function handleOnClick(category: IPostCategory): () => void {
		return function () {
			setSelectedCategory(category.id);

			// 2. Check if the ref to the hidden input element is currently available.
			if (categoryInputRef.current) {
				categoryInputRef.current.value = `${category.id}%${category.name}`;
				// 3. Create a synthetic React change event object.
				// We cast it 'as React.ChangeEvent<HTMLInputElement>' to satisfy TypeScript,
				// even though we're not manually populating all properties typically found
				// in a native browser event or a full React synthetic event.
				// This is sufficient because `handleInputChange` only relies on `target` and `currentTarget`.
				const syntheticEvent: React.ChangeEvent<HTMLInputElement> = {
					target: categoryInputRef.current, // Points to the actual hidden input DOM element
					currentTarget: categoryInputRef.current, // Also points to the actual hidden input DOM element
					type: 'change', // Specifies the event type as 'change'
					// Creates a native DOM Event, primarily to fulfill the `nativeEvent` property required by React's ChangeEvent interface.
					// 'bubbles: true' allows the event to bubble up the DOM tree, though not strictly necessary here as we call `onChange` directly.
					nativeEvent: new Event('change', { bubbles: true }),
				} as React.ChangeEvent<HTMLInputElement>; // Type assertion to conform to the expected interface

				// 4. Call the 'onChange' prop received from the parent component (`handleInputChange`).
				// This effectively triggers the parent's input change handler, allowing it to
				// read the `name` ('category') and `value` (c.id) from the synthetic event's target,
				// and consequently clear any validation error associated with the 'category' field.
				onChange(syntheticEvent);
			}
		};
	}

	return (
		<ListGroup variant='flush'>
			{categories.map((c) => (
				<ListGroupItem
					key={c.id}
					active={c.id === selectedCategory}
					type='button'
					action
					onClick={handleOnClick(c)}
					className={clsx({ 'rounded-2': c.id === selectedCategory })}
				>
					{capitalize(c.name)}
				</ListGroupItem>
			))}
			<input
				ref={categoryInputRef}
				type='hidden'
				name='category'
			/>
		</ListGroup>
	);
}
