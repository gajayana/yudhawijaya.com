import type {
  StoryblokRichTextContext,
  StoryblokRichTextNode,
  StoryblokRichTextOptions,
} from "@storyblok/richtext";
import { BlockTypes, MarkTypes } from "@storyblok/richtext";

/**
 * Custom resolvers for Storyblok rich text rendering.
 * Uses the new @storyblok/richtext resolver API.
 *
 * These resolvers customize the appearance of links, headings, paragraphs,
 * and other elements to match the application's design system using Tailwind CSS.
 */
export const customRichTextResolvers: StoryblokRichTextOptions<string>["resolvers"] =
  {
    /**
     * Custom link resolver with styled appearance
     */
    [MarkTypes.LINK]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render(
        "a",
        {
          href: node.attrs?.href || "",
          target: node.attrs?.target || "_self",
          class:
            "text-blue-700 visited:text-blue-700/90 hover:text-blue-800 transition-colors duration-200",
        },
        node.text || node.children
      );
    },

    /**
     * Custom code block with dark theme styling
     */
    [BlockTypes.CODE_BLOCK]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render(
        "pre",
        {
          class:
            "backdrop-blur bg-black/70 mx-0 md:mx-20 overflow-x-auto rounded p-4 text-white text-sm font-mono",
        },
        context.render("code", {}, node.children)
      );
    },

    /**
     * Custom heading with bold styling and responsive font sizes
     */
    [BlockTypes.HEADING]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      const level = node.attrs?.level || 1;
      const sizeClasses: Record<number, string> = {
        1: "text-2xl sm:text-3xl md:text-4xl",
        2: "text-xl sm:text-2xl md:text-3xl",
        3: "text-lg sm:text-xl md:text-2xl",
        4: "text-base sm:text-lg md:text-xl",
        5: "text-base sm:text-lg",
        6: "text-sm sm:text-base",
      };
      return context.render(
        `h${level}`,
        { class: `font-bold mx-0 md:mx-20 ${sizeClasses[level] || "text-lg"}` },
        node.children
      );
    },

    /**
     * Custom paragraph with responsive margins and image handling
     */
    [BlockTypes.PARAGRAPH]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render(
        "p",
        {
          class: [
            "mx-0 md:mx-20 text-base",
            "has-[img]:gap-1 has-[img]:text-sm has-[img]:text-neutral-500 md:has-[img]:mx-0",
            "[&>img]:w-full [&>img]:rounded [&>img]:border [&>img]:border-neutral-200",
          ].join(" "),
        },
        node.children
      );
    },

    /**
     * Custom bullet list styling
     */
    [BlockTypes.UL_LIST]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render(
        "ul",
        { class: "list-disc list-outside mx-8 md:mx-32 pl-4" },
        node.children
      );
    },

    /**
     * Custom ordered list styling
     */
    [BlockTypes.OL_LIST]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render(
        "ol",
        { class: "list-decimal list-outside mx-8 md:mx-32 pl-4" },
        node.children
      );
    },

    /**
     * Custom list item styling
     */
    [BlockTypes.LIST_ITEM]: (
      node: StoryblokRichTextNode<string>,
      context: StoryblokRichTextContext<string>
    ) => {
      return context.render("li", { class: "[&>p]:mx-0" }, node.children);
    },
  };

/**
 * Pre-configured options object for use with renderRichText
 * @example
 * renderRichText(content, customStoryblokRichTextOptions)
 */
const customStoryblokRichTextOptions: StoryblokRichTextOptions<string> = {
  resolvers: customRichTextResolvers,
};

export default customStoryblokRichTextOptions;
