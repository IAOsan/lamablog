import { RGBColor, rgb } from 'wcag-contrast';

export function capitalize(string: string): string {
	return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

export function formatDate(date: string): string {
	const parsedDate = new Date(date);
	const year = parsedDate.getFullYear();
	const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
	const day = String(parsedDate.getDate()).padStart(2, '0');

	return `${year}.${month}.${day}`;
}

export function truncateText(text: string, length: number): string {
	return `${text.slice(0, length)}...`;
}

export function isDarkColor(rgbColor: RGBColor): boolean {
	const LIGHT_COLOR: RGBColor = [255, 255, 255];
	const DARK_COLOR: RGBColor = [0, 0, 0];
	const lightContrast = rgb(rgbColor, LIGHT_COLOR);
	const darkContrast = rgb(rgbColor, DARK_COLOR);

	return darkContrast > lightContrast;
}

export function testId(testId: string): Record<string, string> {
	return process.env.NODE_ENV === 'test' ? { 'data-testid': testId } : {};
}

export function imageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			if (reader.result) {
				resolve(reader.result as string);
			} else {
				throw new Error('No se pudo leer el archivo');
			}
		};

		reader.onerror = () => {
			reject(new Error('Error al leer el archivo'));
		};

		reader.readAsDataURL(file);
	});
}
