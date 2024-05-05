import { SocialLink } from "./../../node_modules/vitepress/types/default-theme.d";
import { defineConfig } from "vitepress";
import { nav } from "./relaConf/navbar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/AnlansBlog/",
  title: "Anlans技术小栈",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "my_pic.png",
    nav: nav,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
  },
});
