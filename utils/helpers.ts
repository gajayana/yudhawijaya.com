interface StoryblokImageParams {
  filters?: string[];
  url: string;
  height?: number;
  smart?: boolean;
  width: number;
}

/**
 * Generates a Storyblok image URL with specified parameters
 * @param params - Image parameters including dimensions and filters
 * @returns Formatted image URL string
 */
export const storyblokImage = ({
  filters = [],
  url,
  height = 0,
  smart,
  width,
}: StoryblokImageParams): string => {
  // Pre-allocate array size for better performance
  const params = new Array(filters.length + 2);
  params[0] = "m";
  // Use 0 for height to let Storyblok auto-calculate based on aspect ratio
  params[1] = `${width}x${height}`;

  let paramIndex = 2;

  if (smart) {
    params[paramIndex++] = "smart";
  }

  if (filters.length) {
    params[paramIndex] = `filters:${filters.join(":")}`;
  }

  // Use slice to only include used array elements
  return `${url}/${params.slice(0, paramIndex + 1).join("/")}`;
};
