import { Fragment, ReactNode } from "react";

/**
 * Renders translation strings that contain simple inline emphasis markup
 * (`<span class="...">text</span>`) without using dangerouslySetInnerHTML.
 * Any other markup is rendered as plain text, so untrusted HTML can never be
 * injected into the DOM.
 */
const SPAN_RE = /<span class="([^"]*)">([\s\S]*?)<\/span>/g;

export function renderRichText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  SPAN_RE.lastIndex = 0;

  while ((match = SPAN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    nodes.push(
      <span key={`s-${match.index}`} className={match[1]}>
        {match[2]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

const RichTranslationText = ({ text, className }: { text: string; className?: string }) => (
  <p className={className}>{renderRichText(text)}</p>
);

export default RichTranslationText;
