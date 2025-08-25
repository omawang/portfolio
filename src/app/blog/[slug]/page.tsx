import Prose from '@/components/mdx/Prose';
import { posts } from '@/content/posts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
    },
  };
}

'use client';

import { Suspense } from 'react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return notFound();
  
  const PostContent = post.component;
  
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.meta.title}</h1>
          <div className="text-muted-foreground">
            {new Date(post.meta.date).toLocaleDateString()}
          </div>
          {post.meta.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.meta.tags.map(tag => (
                <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <Prose>
          <Suspense fallback={<div>Loading content...</div>}>
            <PostContent />
          </Suspense>
        </Prose>
      </article>
    </div>
  );
}