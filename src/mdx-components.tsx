import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LinkProps extends ComponentProps<'a'> {
  href: string;
  children: ReactNode;
}

interface ImageProps extends ComponentProps<'img'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Define custom components for MDX
export function useMDXComponents(components: any) {
  return {
    // Override heading styles
    h1: (props: ComponentProps<'h1'>) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
    ),
    h2: (props: ComponentProps<'h2'>) => (
      <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
    ),
    h3: (props: ComponentProps<'h3'>) => (
      <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
    ),
    // Override code block styles with Dracula theme
    pre: (props: ComponentProps<'pre'>) => (
      <pre className="p-4 rounded-lg bg-[#282a36] overflow-x-auto my-4 text-[#f8f8f2]" {...props} />
    ),
    code: (props: ComponentProps<'code'>) => {
      const className = props.className || '';
      return className.includes('language-') ? (
        <code className={`font-mono text-sm ${className} dracula-theme`} {...props} />
      ) : (
        <code className="font-mono text-sm bg-[#44475a] text-[#f8f8f2] px-1 py-0.5 rounded" {...props} />
      );
    },
    // Override anchor tags to use Next.js Link
    a: ({ href, children, ...props }: LinkProps) => {
      if (href.startsWith('/') || href.startsWith('#')) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" {...props}>
          {children}
        </a>
      );
    },
    // Override image tags to use Next.js Image
    img: ({ src, alt, ...props }: ImageProps) => {
      return (
        <Image 
          src={src} 
          alt={alt} 
          width={700} 
          height={400} 
          className="rounded-lg my-4" 
          {...props} 
        />
      );
    },
    // Override table styles with proper borders
    table: (props: ComponentProps<'table'>) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border-2 border-gray-300" {...props} />
      </div>
    ),
    th: (props: ComponentProps<'th'>) => (
      <th className="border-2 border-gray-300 p-2 bg-gray-100 font-bold" {...props} />
    ),
    td: (props: ComponentProps<'td'>) => (
      <td className="border-2 border-gray-300 p-2" {...props} />
    ),
    ...components,
  };
}