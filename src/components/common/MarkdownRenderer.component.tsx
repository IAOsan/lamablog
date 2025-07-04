import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism-tomorrow.css';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism';
import remarkGfm from 'remark-gfm';

function MarkdownRenderer({ content }: { content: string }): React.JSX.Element {
	return (
		<ReactMarkdown
			rehypePlugins={[rehypePrism]}
			remarkPlugins={[remarkGfm]}
		>
			{content}
		</ReactMarkdown>
	);
}

export default MarkdownRenderer;
