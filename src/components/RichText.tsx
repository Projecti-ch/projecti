'use client';

import { Fragment } from 'react';

// Lexical rich text node types
interface TextNode {
  type: 'text';
  text: string;
  format?: number;
  style?: string;
}

interface LinkNode {
  type: 'link';
  fields: {
    url?: string;
    newTab?: boolean;
    linkType?: 'custom' | 'internal';
  };
  children: SerializedNode[];
}

interface ParagraphNode {
  type: 'paragraph';
  children: SerializedNode[];
}

interface HeadingNode {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: SerializedNode[];
}

interface ListNode {
  type: 'list';
  listType: 'bullet' | 'number';
  children: SerializedNode[];
}

interface ListItemNode {
  type: 'listitem';
  children: SerializedNode[];
}

interface QuoteNode {
  type: 'quote';
  children: SerializedNode[];
}

interface LinebreakNode {
  type: 'linebreak';
}

type SerializedNode =
  | TextNode
  | LinkNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | LinebreakNode
  | { type: string; children?: SerializedNode[]; [key: string]: unknown };

export type { SerializedNode };

interface RichTextProps {
  content: {
    root: {
      children: SerializedNode[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  } | null | undefined;
  className?: string;
}

// Text format flags (Lexical uses bitmask)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_UNDERLINE = 8;
const IS_STRIKETHROUGH = 4;

function renderText(node: TextNode): React.ReactNode {
  let text: React.ReactNode = node.text;
  const format = node.format || 0;

  if (format & IS_BOLD) {
    text = <strong>{text}</strong>;
  }
  if (format & IS_ITALIC) {
    text = <em>{text}</em>;
  }
  if (format & IS_UNDERLINE) {
    text = <u>{text}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    text = <s>{text}</s>;
  }

  return text;
}

function renderNode(node: SerializedNode, index: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return <Fragment key={index}>{renderText(node as TextNode)}</Fragment>;

    case 'linebreak':
      return <br key={index} />;

    case 'paragraph':
      return (
        <p key={index} className="mb-4 last:mb-0">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      );

    case 'heading': {
      const headingNode = node as HeadingNode;
      const Tag = headingNode.tag;
      const headingClasses: Record<string, string> = {
        h1: 'text-[32px] font-semibold mb-6 mt-8 first:mt-0',
        h2: 'text-[24px] font-semibold mb-4 mt-8 first:mt-0',
        h3: 'text-[20px] font-semibold mb-4 mt-6 first:mt-0',
        h4: 'text-[18px] font-semibold mb-3 mt-4 first:mt-0',
        h5: 'text-[16px] font-semibold mb-2 mt-4 first:mt-0',
        h6: 'text-[14px] font-semibold mb-2 mt-4 first:mt-0',
      };
      return (
        <Tag key={index} className={headingClasses[headingNode.tag]}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Tag>
      );
    }

    case 'link': {
      const linkNode = node as LinkNode;
      const rawUrl = linkNode.fields?.url || '#';
      // Sanitize URL to prevent javascript: protocol attacks
      const url = rawUrl.startsWith('javascript:') ? '#' : rawUrl;
      const openInNewTab = linkNode.fields?.newTab || url.startsWith('http');
      return (
        <a
          key={index}
          href={url}
          className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    case 'list': {
      const listNode = node as ListNode;
      const Tag = listNode.listType === 'number' ? 'ol' : 'ul';
      const listClass = listNode.listType === 'number' 
        ? 'list-decimal list-inside mb-4 space-y-2' 
        : 'list-disc list-inside mb-4 space-y-2';
      return (
        <Tag key={index} className={listClass}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </Tag>
      );
    }

    case 'listitem':
      return (
        <li key={index}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-accent pl-4 italic my-6 text-muted">
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    default:
      // Handle unknown nodes with children
      if ('children' in node && Array.isArray((node as { children?: unknown[] }).children)) {
        const children = (node as { children: SerializedNode[] }).children;
        return (
          <Fragment key={index}>
            {children.map((child, i) => renderNode(child, i))}
          </Fragment>
        );
      }
      return null;
  }
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content?.root?.children) {
    return null;
  }

  return (
    <div className={`rich-text ${className}`}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
