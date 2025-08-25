import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thoughts, tutorials, and insights about web development and technology.
        </p>
      </div>

      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.readingTime && (
                    <span>• {post.readingTime}</span>
                  )}
                </div>

                <h2 className="text-2xl font-bold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.description}
                </p>

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

                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development and technology.',
};