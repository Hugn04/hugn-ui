// extensions/CustomImage.ts
import { Image } from "@tiptap/extension-image";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: "width: 100%; height: auto;",
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          return {
            style: attributes.style,
          };
        },
      },
    };
  },
});
