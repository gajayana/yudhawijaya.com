import cloneDeep from "clone-deep";
import type { ISbNode } from "storyblok-js-client";

/**
 * Custom schema for Storyblok rich text rendering that extends the default RichTextSchema
 * with custom styling and formatting rules.
 *
 * This schema customizes the appearance of links, headings, and paragraphs to match
 * the application's design system using Tailwind CSS classes.
 * See https://github.com/storyblok/storyblok-js-client/blob/main/src/schema.ts
 */
const customStoryblokRichTextSchema = cloneDeep(RichTextSchema);

/**
 * Custom link mark renderer that adds styling for links
 * @param node - The Storyblok node containing link information
 * @returns Rendered link with custom styling
 */
customStoryblokRichTextSchema.marks.link = (node: ISbNode) => {
  node.attrs.class =
    "text-blue-700 visited:text-blue-700/90 hover:text-blue-800 transition-colors duration-200";
  return RichTextSchema.marks.link(node);
};

customStoryblokRichTextSchema.nodes.code_block = () => ({
  tag: [
    {
      tag: "pre",
      attrs: {
        class:
          "backdrop-blur bg-black/70 mx-0 md:mx-20 overflow-x-auto rounded p-4 text-white text-sm font-mono",
      },
    },
  ],
});

/**
 * Custom heading node renderer that applies appropriate heading styles based on level
 * @param node - The Storyblok node containing heading information
 * @returns Rendered heading with level-appropriate styling
 */
customStoryblokRichTextSchema.nodes.heading = (node: ISbNode) => ({
  tag: [
    {
      tag: `h${node.attrs.level}`,
      attrs: {
        class: "font-bold",
      },
    },
  ],
});

/**
 * Custom paragraph node renderer that adds consistent spacing between paragraphs
 * @param node - The Storyblok node containing paragraph information
 * @returns Rendered paragraph with margin styling
 */
customStoryblokRichTextSchema.nodes.paragraph = () => ({
  tag: [
    {
      tag: "p",
      attrs: {
        class: [
          "mx-0 md:mx-20 text-base",
          "has-[img]:gap-1 has-[img]:text-sm has-[img]:text-neutral-500",
          "[&>img]:w-full",
        ].join(" "),
      },
    },
  ],
});

customStoryblokRichTextSchema.nodes.bullet_list = () => ({
  tag: [
    {
      tag: "ul",
      attrs: {
        class: "list-disc list-outside mx-8 md:mx-32 pl-4",
      },
    },
  ],
});

customStoryblokRichTextSchema.nodes.ordered_list = () => ({
  tag: [
    {
      tag: "ol",
      attrs: {
        class: "list-decimal list-outside mx-8 md:mx-32 pl-4",
      },
    },
  ],
});

customStoryblokRichTextSchema.nodes.list_item = () => ({
  tag: [
    {
      tag: "li",
      attrs: {
        class: "[&>p]:mx-0",
      },
    },
  ],
});

export default customStoryblokRichTextSchema;

// :deep(._body) {

//   table {
//     @apply border-collapse mb-4 table-auto text-sm w-full;

//     th {
//       @apply border-b dark:border-slate-600 font-bold p-2 text-left;
//     }

//     td {
//       @apply border-b border-slate-100 dark:border-slate-700 p-2;
//     }
//   }
