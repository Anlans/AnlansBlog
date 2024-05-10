import { defineConfig } from "vitepress";
import { nav } from "./relaConf/navbar";
import { sidebar } from "./relaConf/sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  base: "/AnlansBlog/",
  title: "Anlans技术小栈",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "my_pic.png",
    nav: nav,
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/Anlans" }],
    outline: {
      level: [2, 6],
      label: "目录",
    },
  },
});
