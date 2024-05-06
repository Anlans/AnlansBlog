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
    ],
  },
  {
    text: "开发",
    items: [
      {
        text: "后端",
        link: "/column/Develop/Backend/",
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
