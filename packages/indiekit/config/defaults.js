import { createRequire } from "node:module";
import process from "node:process";
import { validationSchemas } from "@indiekit/util";
import cookieSession from "cookie-session";
// eslint-ignore import/order
const require = createRequire(import.meta.url);
const package_ = require("../package.json");

export const defaultConfig = {
  application: {
    _devMode: false,
    endpoints: [],
    hasDatabase: false,
    localesAvailable: [
      "de",
      "en",
      "es",
      "es-419",
      "fr",
      "id",
      "nl",
      "pl",
      "pt",
      "sr",
      "zh-Hans-CN",
    ],
    mongodbUrl: process.env.MONGO_URL || false,
    name: "Indiekit",
    port: process.env.PORT || "3000",
    repository: package_.repository,
    themeColor: "#04f",
    themeColorScheme: "automatic",
    timeZone: "UTC",
    ttl: 604_800, // 7 days
    validationSchemas,
    version: package_.version,
  },
  plugins: [
    "@indiekit/endpoint-auth",
    "@indiekit/endpoint-files",
    "@indiekit/endpoint-image",
    "@indiekit/endpoint-media",
    "@indiekit/endpoint-micropub",
    "@indiekit/endpoint-posts",
    "@indiekit/endpoint-share",
    "@indiekit/endpoint-syndicate",
  ],
  publication: {
    categories: [],
    locale: "en",
    me: undefined,
    postTemplate: undefined,
    postTypes: {
      article: {
        name: "Article",
        fields: [
          "name",
          "content",
          "summary",
          "category",
          "geo",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["content", "name", "published"],
      },
      note: {
        name: "Note",
        fields: [
          "content",
          "category",
          "geo",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["content", "published"],
      },
      photo: {
        name: "Photo",
        fields: [
          "photo",
          "content",
          "category",
          "geo",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["photo", "published", "mp-photo-alt"],
      },
      video: {
        name: "Video",
        fields: [
          "video",
          "content",
          "category",
          "geo",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["video", "published"],
      },
      audio: {
        name: "Audio",
        discovery: "audio",
        fields: [
          "audio",
          "content",
          "category",
          "geo",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["audio", "published"],
      },
      bookmark: {
        name: "Bookmark",
        discovery: "bookmark-of",
        fields: [
          "bookmark-of",
          "name",
          "content",
          "category",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["bookmark-of", "published"],
      },
      event: {
        name: "Event",
        h: "event",
        fields: [
          "name",
          "start",
          "end",
          "url",
          "location",
          "content",
          "category",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["name", "start", "published"],
      },
      rsvp: {
        name: "RSVP",
        fields: [
          "in-reply-to",
          "rsvp",
          "content",
          "category",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["rsvp", "in-reply-to", "published"],
      },
      reply: {
        name: "Reply",
        fields: [
          "in-reply-to",
          "content",
          "category",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["content", "in-reply-to", "published"],
      },
      repost: {
        name: "Repost",
        fields: [
          "repost-of",
          "content",
          "category",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["repost-of", "published"],
      },
      like: {
        name: "Like",
        fields: [
          "like-of",
          "category",
          "content",
          "post-status",
          "published",
          "visibility",
        ],
        requiredFields: ["like-of", "published"],
      },
    },
    preset: undefined,
    slugSeparator: "-",
    storeMessageTemplate: (metaData) =>
      `${metaData.action} ${metaData.postType} ${metaData.fileType}`,
    syndicationTargets: [],
  },
};

defaultConfig.application.sessionMiddleware = cookieSession({
  name: defaultConfig.application.name,
  secret: crypto.randomUUID(),
});
