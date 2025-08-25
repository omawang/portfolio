import { posts } from '@/content/posts';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Blog',
  description: 'Read my latest articles and thoughts',
};

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.slug} className="overflow-hidden">
            <CardHeader>
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <CardTitle>{post.meta.title}</CardTitle>
              </Link>
              <div className="text-muted-foreground text-sm">{new Date(post.meta.date).toLocaleDateString()}</div>
            </CardHeader>
            {post.meta.description && (
              <CardContent>
                <CardDescription>{post.meta.description}</CardDescription>
              </CardContent>
            )}
            <CardFooter className="flex flex-wrap gap-2">
              {post.meta.tags?.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}