import * as HelloWorld from './hello-world.mdx';

export type PostModule = {
  meta: {
    title: string;
    date: string; // ISO string
    description?: string;
    tags?: string[];
    draft?: boolean;
  };
  default: React.ComponentType;
  slug: string;
};

export const posts: PostModule[] = [
  { ...(HelloWorld as any), slug: 'hello-world' },
  // add more posts here
].filter(p => process.env.NODE_ENV === 'production' ? !p.meta.draft : true)
 .sort((a,b) => (a.meta.date < b.meta.date ? 1 : -1));