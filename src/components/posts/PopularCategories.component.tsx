import SubSectionHeader from '../layout/SubSectionHeader.component';
import PopularCategoryCard from './PopularCategoryCard.component';
import blogService from '../../services/blog.service';

async function PopularCategories(): Promise<React.JSX.Element> {
	const categories = await blogService.getAllCategories();

	return (
		<section className='mb-5'>
			<SubSectionHeader>
				<SubSectionHeader.Title>Popular Categories</SubSectionHeader.Title>
			</SubSectionHeader>
			<div className='d-flex flex-wrap gap-3'>
				{categories.map((c) => (
					<PopularCategoryCard
						key={c.id}
						color={c.color}
						id={c.id}
						image={c.image}
						name={c.name}
					/>
				))}
			</div>
		</section>
	);
}

export default PopularCategories;
