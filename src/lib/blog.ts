import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter(name => name.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const metadata = data as BlogPostMeta;

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
          slug,
          title: metadata.title,
          description: metadata.description,
          date: metadata.date,
          tags: metadata.tags || [],
          draft: metadata.draft || false,
          readingTime: `${readingTime} min read`,
          content,
        } as BlogPost;
      })
    );

    // Filter out draft posts in production
    const publishedPosts = posts.filter(post => 
      process.env.NODE_ENV === 'development' || !post.draft
    );

    // Sort posts by date (newest first)
    return publishedPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const metadata = data as BlogPostMeta;

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      tags: metadata.tags || [],
      draft: metadata.draft || false,
      readingTime: `${readingTime} min read`,
      content,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error loading post slugs:', error);
    return [];
  }
}