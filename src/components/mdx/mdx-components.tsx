import Image from "next/image";
import { JSX } from "react";
import { CodeBlock } from "./code-block";

type MDXComponents = Record<
  string,
  React.ComponentType<any> | keyof JSX.IntrinsicElements
>;

export function mdxComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-5 mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mt-3 mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold mt-3 mb-2 text-gray-900 dark:text-gray-100">
        {children}
      </h6>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,

    // Code blocks and inline code
    pre: (props: any) => {
      const isPretty =
        props?.["data-rehype-pretty-code-fragment"] !== undefined ||
        props?.["data-theme"] !== undefined;

      if (isPretty) {
        return (
          <CodeBlock>
            <pre {...props}>{props.children}</pre>
          </CodeBlock>
        );
      }
      return <pre {...props}>{props.children}</pre>;
    },

    code: (props: any) => <code {...props} />,

    // Tables
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-2 border-gray-300 dark:border-gray-600">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white dark:bg-gray-900">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-gray-300 dark:border-gray-600">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="border-2 border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-bold text-gray-900 dark:text-gray-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-2 border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-gray-300 dark:border-gray-600" />,

    // Images
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (!src) return null;

      const isLocal = src.startsWith("/") || src.startsWith("./");

      if (isLocal) {
        return (
          <Image
            src={src}
            alt={alt ?? ""}
            width={800}
            height={600}
            className="rounded-lg my-4 w-full h-auto"
          />
        );
      }

      return (
        <img
          src={src}
          alt={alt ?? ""}
          className="max-w-full h-auto rounded-lg my-4"
        />
      );
    },

    ...components,
  };
}
