import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { compile, run } from "@mdx-js/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as jsxRuntime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// at top of src/app/blog/[slug]/page.tsx
type TParams = Promise<{ slug: string }>;

interface BlogPostPageProps {
  params: TParams;
}

interface MDXContentProps {
  content: string;
  components: any;
}

export const runtime = "nodejs";

async function MDXContent({ content, components }: MDXContentProps) {
  try {
    const compiled = await compile(content, {
      outputFormat: "function-body",
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypePrettyCode,
          {
            theme: { dark: "dracula", light: "dracula" },
            keepBackground: true,

            // Ensure empty lines render with height
            onVisitLine(node: any) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
              // add a class for CSS-based line numbers
              node.properties ??= {};
              node.properties.className ??= [];
              (node.properties.className as string[]).push("line");
            },

            // Add a class to highlighted lines
            onVisitHighlightedLine(node: any) {
              node.properties ??= {};
              node.properties.className ??= [];
              (node.properties.className as string[]).push("highlighted");
            },

            // (Optional) add a class to highlighted words
            onVisitHighlightedWord(node: any) {
              node.properties ??= {};
              node.properties.className ??= [];
              (node.properties.className as string[]).push("word");
            },
          },
        ],
      ],
    });

    const { default: Component } = await run(compiled, {
      ...jsxRuntime,
      useMDXComponents: () => components,
    });

    return <Component components={components} />;
  } catch (error) {
    console.error("Error compiling MDX:", error);
    return (
      <div className="text-red-500">
        <p>Error rendering content</p>
        <pre className="text-sm">{content}</pre>
      </div>
    );
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // Don't show draft posts in production
  if (post.draft && process.env.NODE_ENV === "production") {
    return notFound();
  }

  const components = mdxComponents({});

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to blog link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          ← Back to blog
        </Link>
      </div>

      {/* Article header */}
      <header className="mb-8">
        <div className="mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.readingTime && <span>• {post.readingTime}</span>}
            {post.draft && (
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-xs font-medium">
                Draft
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.description}
          </p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article content */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <MDXContent components={components} content={post.content || ""} />
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}
