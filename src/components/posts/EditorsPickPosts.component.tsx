import blogService from '@/services/blog.service';
import { Stack } from 'react-bootstrap';
import SubSectionHeader from '../layout/SubSectionHeader.component';
import EditorPickPostCard from './EditorPickPostCard.component';

async function EditorsPickPosts(): Promise<React.JSX.Element> {
	const posts = await blogService.getEditorsPickPosts();

	return (
		<section>
			<SubSectionHeader>
				<SubSectionHeader.Subtitle>
					Chosen by the editor
				</SubSectionHeader.Subtitle>
				<SubSectionHeader.Title>Editors Pick</SubSectionHeader.Title>
			</SubSectionHeader>
			<Stack gap={4}>
				{posts.map((p) => (
					<EditorPickPostCard
						key={p.id}
						datetime={p.datetime}
						title={p.title}
						user={p.user}
					/>
				))}
			</Stack>
		</section>
	);
}

export default EditorsPickPosts;
