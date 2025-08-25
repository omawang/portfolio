import type { ComponentProps, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

// Define MDXComponents type
type MDXComponents = Record<string, React.ComponentType<any>>

// Define prop types for our components
interface LinkProps extends Omit<ComponentProps<'a'>, 'ref'> {
  href?: string
  children?: ReactNode
}

interface ImageProps extends Omit<ComponentProps<'img'>, 'ref' | 'src' | 'alt'> {
  src?: string
  alt?: string
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use the default components with your own
    ...components,
    // Override the default components with your own
    a: ({ href, children, ...props }: LinkProps) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        )
      }
      
      if (href?.startsWith('#')) {
        return <a href={href} {...props}>{children}</a>
      }
      
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    },
    img: ({ src, alt, ...props }: ImageProps) => {
      if (!src) return null
      return (
        <Image
          src={src}
          alt={alt || ''}
          className="rounded-md"
          width={700}
          height={350}
          {...props as any}
        />
      )
    },
  }
}