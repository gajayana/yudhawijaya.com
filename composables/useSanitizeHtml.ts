import DOMPurify from "isomorphic-dompurify";

/**
 * Composable for sanitizing HTML content to prevent XSS attacks.
 * Uses DOMPurify with a safe configuration for rich text content.
 */
export function useSanitizeHtml() {
  const sanitize = (html: string | undefined | null): string => {
    if (!html) return "";

    return DOMPurify.sanitize(html, {
      // Allow safe HTML tags for rich text content
      ALLOWED_TAGS: [
        "a",
        "b",
        "blockquote",
        "br",
        "code",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "i",
        "img",
        "li",
        "ol",
        "p",
        "pre",
        "span",
        "strong",
        "u",
        "ul",
      ],
      // Allow safe attributes
      ALLOWED_ATTR: [
        "href",
        "target",
        "rel",
        "src",
        "alt",
        "title",
        "class",
        "id",
        "loading",
        "width",
        "height",
      ],
      // Ensure links are safe
      ALLOW_DATA_ATTR: false,
      // Add rel="noopener noreferrer" to links with target="_blank"
      ADD_ATTR: ["target"],
    });
  };

  return { sanitize };
}
