export const jf2 = async (request, response) => {
  const { application } = request.app.locals;
  const feedUrl = new URL(request.originalUrl, application.url).href;
  let posts = [];

  const postsCollection = application?.collections?.get("posts");
  if (postsCollection) {
    posts = await postsCollection
      .find({
        "properties.post-status": {
          $ne: "draft",
        },
      })
      .toArray();
  }

  return response.type("application/jf2feed+json").json({
    type: "feed",
    name: application.name,
    url: feedUrl,
    children: posts.map((post) => post.properties),
  });
};
