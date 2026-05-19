import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-3 -mx-1 px-1">
      <table
        className="min-w-full text-[12px] border-collapse border border-[#E5E7EB]"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-[#F9FAFB]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="text-left font-bold text-[#0A0A0A] px-3 py-2 border border-[#E5E7EB] whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="text-[#374151] px-3 py-2 border border-[#E5E7EB] align-top"
      {...props}
    >
      {children}
    </td>
  ),
};

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div
      className={`prose prose-sm max-w-none text-[14px] text-[#0A0A0A] leading-[1.7]
        prose-headings:font-plex-sans-kr prose-headings:text-[#0A0A0A]
        prose-h1:text-[20px] prose-h1:font-extrabold prose-h1:mt-6 prose-h1:mb-3
        prose-h2:text-[17px] prose-h2:font-bold prose-h2:mt-5 prose-h2:mb-2
        prose-h3:text-[15px] prose-h3:font-bold prose-h3:mt-4 prose-h3:mb-2
        prose-h4:text-[14px] prose-h4:font-bold prose-h4:mt-3 prose-h4:mb-1
        prose-p:text-[13px] prose-p:text-[#374151] prose-p:my-2
        prose-strong:text-[#0A0A0A] prose-strong:font-bold
        prose-ul:my-2 prose-ol:my-2 prose-li:text-[13px] prose-li:text-[#374151] prose-li:my-0.5
        prose-a:text-[#0991B2] prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-2 prose-blockquote:border-[#0991B2] prose-blockquote:bg-[#F9FAFB]
        prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:my-3
        prose-blockquote:text-[12px] prose-blockquote:text-[#6B7280] prose-blockquote:not-italic
        prose-hr:border-[#E5E7EB] prose-hr:my-5
        prose-code:text-[12px] prose-code:bg-[#F3F4F6] prose-code:text-[#0991B2]
        prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
