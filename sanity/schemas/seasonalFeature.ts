import { defineField, defineType } from "sanity";

export const seasonalFeature = defineType({
  name: "seasonalFeature",
  title: "Seasonal feature",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Short hero text shown on the home page (e.g. "Summer Cold Brew is here").',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "item",
      title: "Featured menu item",
      type: "reference",
      to: [{ type: "menuItem" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      headline: "headline",
      start: "startDate",
      end: "endDate",
      media: "item.image",
    },
    prepare({ headline, start, end, media }) {
      return {
        title: headline,
        subtitle: start && end ? `${start} → ${end}` : "No dates set",
        media,
      };
    },
  },
});
