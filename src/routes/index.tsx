import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

const DESCRIPTION =
  "Move-in, move-out, deep and student room cleaning in Ibogun, Ifo and Lagos. We bring our own supplies. Get a quote within 24 hours.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comfort Clean - Cleaning Service in Ibogun, Ifo & Lagos" },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content: "Comfort Clean - Cleaning Service in Ibogun, Ifo & Lagos",
      },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
