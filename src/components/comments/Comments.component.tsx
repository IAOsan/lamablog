import commentsService from '@/services/comments.service';
import { IPost } from '@/types/custom.types';
import { Stack } from 'react-bootstrap';
import Comment from './Comment.component';
import LoginToCommentButton from './LoginToCommentButton.component';
import NewCommentForm from './NewCommentForm.component';
import { auth } from '@/lib/auth';

async function Comments({
	postId,
}: {
	postId: IPost['id'];
}): Promise<React.JSX.Element> {
	const comments = await commentsService.getCommentsByPostId(postId);
	const session = await auth();

	return (
		<div>
			<h2 className='fs-3 mt-5 mb-5'>
				<b>Comments</b>
			</h2>
			{!session?.user ? (
				<LoginToCommentButton />
			) : (
				<NewCommentForm postId={postId} />
			)}
			<Stack gap={4}>
				{comments.map((c) => (
					<Comment
						key={c.id}
						content={c.content}
						datetime={c.datetime}
						user={c.user}
					/>
				))}
			</Stack>
		</div>
	);
}

export default Comments;
