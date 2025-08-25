import { posts } from '@/content/posts';
import Link from 'next/link';
// import { Card } from '@/components/ui/card'; // Uncomment if you have a Card component
// import { Badge } from '@/components/ui/badge'; // Uncomment if you have a Badge component

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.slug} className="border rounded-lg p-6 bg-card shadow">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              <h2 className="text-2xl font-semibold mb-2">{post.meta.title}</h2>
            </Link>
            <div className="text-muted-foreground text-sm mb-2">{new Date(post.meta.date).toLocaleDateString()}</div>
            {post.meta.description && (
              <p className="mb-2 text-base text-muted-foreground">{post.meta.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {post.meta.tags?.map(tag => (
                <span key={tag} className="inline-block bg-muted px-2 py-1 rounded text-xs font-mono">#{tag}</span>
                // <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}