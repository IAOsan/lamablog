import blogService from '@/services/blog.service';
import SubSectionHeader from '../layout/SubSectionHeader.component';
import CategoryBadge from './CategoryBadge.component';

async function CategoriesList(): Promise<React.JSX.Element> {
	const categories = await blogService.getAllCategories();

	return (
		<section className='mb-5'>
			<SubSectionHeader>
				<SubSectionHeader.Subtitle>Discover by topic</SubSectionHeader.Subtitle>
				<SubSectionHeader.Title>Categories</SubSectionHeader.Title>
			</SubSectionHeader>
			<div className='d-flex flex-wrap gap-3'>
				{categories.map((c) => (
					<CategoryBadge
						key={c.id}
						color={c.color}
						name={c.name}
					/>
				))}
			</div>
		</section>
	);
}

export default CategoriesList;
