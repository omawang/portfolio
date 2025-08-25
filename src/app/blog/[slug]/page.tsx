import { posts } from '@/content/posts';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// import Prose from '@/components/mdx/Prose'; // Uncomment if you have a Prose component

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return notFound();
  const PostComponent = post.default;
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* <Prose> */}
      <PostComponent />
      {/* </Prose> */}
    </div>
  );
}