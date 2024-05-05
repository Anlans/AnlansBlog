export * from "./navbar";

import { DefaultTheme } from "vitepress";
export const nav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "个人成长",
    items: [
      {
        text: "个人生活",
        link: "/column/Travel/",
      },
      {
        text: "后端技术",
        link: "/column/Backend/",
      },
    ],
  },
  {
    text: "关于我",
    items: [
      { text: "Github", link: "https://github.com/Anlans" },
      { text: "掘金", link: "https://juejin.cn/user/4125023359740840/posts" },
      { text: "cnblog", link: "https://www.cnblogs.com/honeyShi" },
    ],
  },
];
