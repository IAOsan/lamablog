import NewPostForm from '@/components/posts/NewPostForm.component';
import blogService from '@/services/blog.service';
import React from 'react';

async function NewPostPage(): Promise<React.JSX.Element> {
	const categories = await blogService.getAllCategories();

	return <NewPostForm categories={categories} />;
}

export default NewPostPage;
