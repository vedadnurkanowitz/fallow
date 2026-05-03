import { defineField, defineType } from "sanity";

const ALLERGENS = [
  "Gluten",
  "Dairy",
  "Eggs",
  "Nuts",
  "Peanuts",
  "Soy",
  "Sesame",
  "Sulphites",
  "Celery",
  "Mustard",
  "Fish",
  "Shellfish",
  "Lupin",
  "Molluscs",
];

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "price",
      title: "Price (£)",
      type: "number",
      validation: (r) => r.required().min(0).precision(2),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "seasonal",
      title: "Seasonal item",
      type: "boolean",
      initialValue: false,
      description: "Marks this item with the seasonal badge on the menu.",
    }),
    defineField({
      name: "orderable",
      title: "Available for pre-order",
      type: "boolean",
      initialValue: true,
      description: "Show this item in the pre-order flow.",
    }),
    defineField({
      name: "allergens",
      title: "Allergens",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ALLERGENS.map((a) => ({ title: a, value: a })),
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      seasonal: "seasonal",
      media: "image",
    },
    prepare({ title, price, seasonal, media }) {
      return {
        title,
        subtitle: `£${price?.toFixed(2) ?? "—"}${seasonal ? " · Seasonal" : ""}`,
        media,
      };
    },
  },
});
