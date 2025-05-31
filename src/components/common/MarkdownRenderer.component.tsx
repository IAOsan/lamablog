import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from "rehype-prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

function MarkdownRenderer({ content }: { content: string }): React.JSX.Element {
    return (
        <ReactMarkdown rehypePlugins={[rehypePrism]} remarkPlugins={[remarkGfm]}>
            {content}
        </ReactMarkdown>
    )
}

export default MarkdownRenderer;