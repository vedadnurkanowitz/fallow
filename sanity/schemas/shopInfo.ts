import { defineField, defineType } from "sanity";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const shopInfo = defineType({
  name: "shopInfo",
  title: "Shop info",
  type: "document",
  fields: [
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [
        {
          type: "object",
          name: "dayHours",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: { list: DAYS.map((d) => ({ title: d, value: d })) },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "closed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "open",
              title: "Opens at",
              type: "string",
              description: "24-hour format, e.g. 07:30",
              hidden: ({ parent }) => parent?.closed,
            }),
            defineField({
              name: "close",
              title: "Closes at",
              type: "string",
              description: "24-hour format, e.g. 17:00",
              hidden: ({ parent }) => parent?.closed,
            }),
          ],
          preview: {
            select: { day: "day", open: "open", close: "close", closed: "closed" },
            prepare({ day, open, close, closed }) {
              return {
                title: day,
                subtitle: closed ? "Closed" : `${open} – ${close}`,
              };
            },
          },
        },
      ],
      validation: (r) => r.required().min(7).max(7),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps embed URL",
      type: "url",
      description: "The full src URL from the Google Maps embed iframe.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "announcement",
      title: "Announcement banner",
      type: "string",
      description:
        'Optional text shown site-wide (e.g. "Closed Christmas Eve"). Leave blank to hide.',
    }),
  ],
  preview: {
    prepare() {
      return { title: "Shop info" };
    },
  },
});
