/**
 * Validates a URL slug for safe use in API requests
 * Allows alphanumeric characters, hyphens, and underscores
 * Maximum length of 100 characters
 */
export function validateSlug(slug: unknown): string | null {
  if (typeof slug !== "string") {
    return null;
  }

  // Max 100 characters, alphanumeric with hyphens and underscores
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const maxLength = 100;

  if (slug.length === 0 || slug.length > maxLength) {
    return null;
  }

  if (!slugPattern.test(slug)) {
    return null;
  }

  return slug;
}
