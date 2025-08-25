import { lazy } from 'react';

// Import MDX content
const HelloWorldContent = lazy(() => import('./hello-world.mdx'));
// Get metadata from the MDX file
import { meta as helloWorldMeta } from './hello-world.mdx';

// Create a post object with metadata and component
const HelloWorld = {
  meta: helloWorldMeta,
  slug: 'hello-world',
  component: HelloWorldContent
};

export type PostModule = {
  meta: {
    title: string;
    date: string; // ISO string
    description?: string;
    tags?: string[];
    draft?: boolean;
  };
  slug: string;
  component: React.LazyExoticComponent<any>;
};

export const posts: PostModule[] = [
  HelloWorld,
  // add more posts here
].filter(p => process.env.NODE_ENV === 'production' ? !p.meta.draft : true)
 .sort((a,b) => (a.meta.date < b.meta.date ? 1 : -1));