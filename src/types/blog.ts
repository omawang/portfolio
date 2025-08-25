export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  readingTime?: string;
  content?: string;
}

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
}

export interface PostModule {
  default: React.ComponentType;
  metadata: BlogPostMeta;
}