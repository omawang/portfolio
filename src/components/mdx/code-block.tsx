// src/components/mdx/code-block.tsx
'use client'

import { Check, Copy } from 'lucide-react'
import { useRef, useState } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const copyToClipboard = async () => {
    try {
      // Find the nested <code> element rendered by rehype-pretty-code
      const codeEl = containerRef.current?.querySelector('pre code')
      const text = codeEl?.textContent ?? ''

      if (!text) return

      await navigator.clipboard.writeText(text.replace(/\u00A0/g, ' ')) // replace non-breaking spaces
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div ref={containerRef} className="relative group">
      {children}
      <button
        type="button"
        onClick={copyToClipboard}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute top-2 right-2 rounded bg-black/50 hover:bg-black/70 px-2 py-1 text-xs text-white
                   opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}
