import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import { cloudflareZones } from "./src/data/queries";
import { kubernetesNamespacesByTeam } from "./src/data/queries";

const sidebar = [
  {
    label: "Guides",
    items: [{ label: "Example Guide", link: "/guides/example/" }],
  },
  {
    label: "Generated",
    items: [
      {
        label: "Cloudflare",
        items: [
          {
            label: "Zones",
            items: [
              {
                label: "Overview",
                link: `/cloudflare`,
              },
              ...cloudflareZones.map((zone) => {
                return {
                  label: zone.name,
                  link: `/cloudflare/zones/${zone.name}`,
                };
              }),
            ],
          },
        ],
      },
      {
        label: "Kubernetes",
        collapsed: true,
        items: [
          {
            label: "Overview",
            link: `/kubernetes`,
          },
          {
            label: "Teams",
            items: [
              ...kubernetesNamespacesByTeam.map(({ team }) => {
                return { label: team, link: `/kubernetes/teams/${team}` };
              }),
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Reference",
    autogenerate: { directory: "reference" },
  },
];

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar,
    }),
  ],
});
