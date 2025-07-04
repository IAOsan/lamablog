export default function objectFromEntries(mockEntries: {
	[key: string]: unknown;
}) {
	const originalFromEntries = Object.fromEntries;

	vi.spyOn(Object, 'fromEntries').mockImplementationOnce((entries) => {
		// Ejecuta la implementación original para obtener los otros campos del formulario
		const dataFromOriginalEntries = originalFromEntries(entries);

		// Sobreescribe el campo 'cover_image' con tu archivo mock
		return {
			...dataFromOriginalEntries,
			...mockEntries,
		};
	});
}
