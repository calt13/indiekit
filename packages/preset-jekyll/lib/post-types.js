import plur from "plur";

/**
 * Get paths and URLs for configured post types
 * @param {object} postTypes - Post type configuration
 * @returns {object} Updated post type configuration
 */
export const getPostTypes = (postTypes) => {
  const types = [];

  for (const postType of postTypes) {
    const { type } = postType;
    const collection = plur(type);

    if (type === "article") {
      /**
       * Posts use `_posts` folder
       * @see {@link https://jekyllrb.com/docs/posts/}
       */
      types.push({
        type,
        post: {
          path: "_posts/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "{yyyy}/{MM}/{dd}/{slug}",
        },
        media: {
          path: "media/{yyyy}/{MM}/{dd}/{filename}",
        },
      });
    } else {
      /**
       * Other post types use collection folders
       * @see {@link https://jekyllrb.com/docs/collections/}
       */
      types.push({
        type,
        post: {
          path: `_${collection}/{yyyy}-{MM}-{dd}-{slug}.md`,
          url: `${collection}/{yyyy}/{MM}/{dd}/{slug}`,
        },
        media: {
          path: `media/${collection}/{yyyy}/{MM}/{dd}/{filename}`,
        },
      });
    }
  }

  return types;
};
