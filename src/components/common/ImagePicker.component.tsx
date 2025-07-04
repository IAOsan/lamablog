import { imageToBase64 } from '@/utils';
import React from 'react';
import { Button } from 'react-bootstrap';

interface ImagePickerContextType {
	inputRef: React.RefObject<HTMLInputElement | null>;
	previewUrl: string;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImagePickerContext = React.createContext<ImagePickerContextType>({
	inputRef: {} as React.RefObject<HTMLInputElement | null>,
	previewUrl: '',
	handleImageChange: () => {},
});

function useImagePickerContext() {
	const ctx = React.useContext(ImagePickerContext);

	if (!ctx) {
		throw new Error(
			'ImagePicker sub-components must be used within <ImagePicker>'
		);
	}

	return ctx;
}

function ImagePicker({ children }: React.PropsWithChildren): React.JSX.Element {
	const [previewUrl, setPreviewUrl] = React.useState<string>('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = e.target.files?.[0];

		if (!selectedFile) {
			setPreviewUrl('');
			return;
		}

		try {
			const base64 = await imageToBase64(selectedFile);
			setPreviewUrl(base64);
		} catch (error) {
			console.error('Error processing image:', error);
		}
	}

	return (
		<ImagePickerContext.Provider
			value={{
				inputRef,
				handleImageChange,
				previewUrl,
			}}
		>
			{children}
		</ImagePickerContext.Provider>
	);
}

ImagePicker.Preview = ImagePickerPreview;
ImagePicker.Input = ImagePickerInput;

export default ImagePicker;

function ImagePickerPreview({
	children,
	...restProps
}: React.PropsWithChildren<
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
>) {
	const { inputRef, previewUrl } = useImagePickerContext();

	function handleClick(): void {
		inputRef.current?.click(); // Click the hidden input
	}

	return (
		<Button
			onClick={handleClick}
			type='button'
			{...restProps}
		>
			{previewUrl ? (
				<img
					src={previewUrl}
					alt='Preview'
					className='w-100 h-100 object-fit-cover position-absolute top-0 start-0'
				/>
			) : (
				children
			)}
		</Button>
	);
}

function ImagePickerInput({
	onChange,
	...restProps
}: Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'type'
>): React.JSX.Element {
	const { inputRef, handleImageChange } = useImagePickerContext();

	return (
		<input
			type='file'
			{...restProps}
			ref={inputRef}
			onChange={(e) => {
				handleImageChange(e);
				if (onChange) onChange(e);
			}}
		/>
	);
}
