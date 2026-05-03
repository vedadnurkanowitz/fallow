import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "fallow-coffee",
  title: "Fallow Coffee",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Shop info")
              .id("shopInfo")
              .child(
                S.document()
                  .schemaType("shopInfo")
                  .documentId("shopInfo")
              ),
            S.divider(),
            S.documentTypeListItem("menuItem").title("Menu items"),
            S.documentTypeListItem("category").title("Categories"),
            S.divider(),
            S.documentTypeListItem("seasonalFeature").title("Seasonal features"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
