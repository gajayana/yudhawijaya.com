import sanitizeHtml from "sanitize-html";

/**
 * Composable for sanitizing HTML content to prevent XSS attacks.
 * Uses sanitize-html with a safe configuration for rich text content.
 */
export function useSanitizeHtml() {
  const sanitize = (html: string | undefined | null): string => {
    if (!html) return "";

    return sanitizeHtml(html, {
      // Allow safe HTML tags for rich text content
      allowedTags: [
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
      allowedAttributes: {
        a: ["href", "target", "rel", "title", "class", "id"],
        img: ["src", "alt", "title", "class", "id", "loading", "width", "height"],
        "*": ["class", "id"],
      },
      // Allow specific URL schemes
      allowedSchemes: ["http", "https", "mailto"],
    });
  };

  return { sanitize };
}
