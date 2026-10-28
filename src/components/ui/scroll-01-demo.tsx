import { Scroll01 } from "@/components/ui/scroll-01";

const values = {
  items: [
    {
      title: "Build faster",
      description: "Create interfaces quickly using reusable blocks.",
      media:
        "https://cdn.21st.dev/assets/mirror/d3/d3cc531dd08ff828c572ac43c22057d34e7f4a48e86ee12a178f86073e6caf5a.jpg",
    },
    {
      title: "Customize easily",
      description: "Adapt everything to your design system.",
      media:
        "https://cdn.21st.dev/assets/mirror/f7/f75faa3b90f7f605bb660b0497013d0b44d57f97dc1bba97412521ee8f816efb.jpg",
    },
    {
      title: "Stay consistent",
      description: "Keep layouts balanced with a clear visual rhythm.",
      media:
        "https://cdn.21st.dev/assets/mirror/f2/f247ca8274d119e669ef1a78047884608b7818d425a4f76f3d66915f0ccac13c.jpg",
    },
    {
      title: "Guide attention",
      description: "Highlight the right content without adding noise.",
      media:
        "https://cdn.21st.dev/assets/mirror/6d/6d3292ee7e52514c2496d5e01f47a49901a5e9503271c027139a69489e6b2fdb.jpg",
    },
    {
      title: "Scale calmly",
      description: "Expand your pages with patterns that stay elegant.",
      media:
        "https://cdn.21st.dev/assets/mirror/2f/2f902ca3b242544d0a9e33a7824fc30cac31e9121fd2713c89e0aeeec0363a58.jpg",
    },
  ],
};

export default function Scroll01Demo() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="h-10" />
      <Scroll01 items={values.items} />
      <div className="h-32" />
    </div>
  );
}
