import { DefaultTheme } from "vitepress";
export const sidebar: DefaultTheme.Sidebar = {
  // 开发/后端/FastAPI 目录文章
  //   "/column/Develop/Backend/FastAPI/": [
  //     {
  //       text: "FastAPI Article",
  //       items: [
  //         {
  //           text: "001FastAPItest",
  //           link: "/column/Develop/Backend/FastAPI/001_test1.md",
  //         },
  //         {
  //           text: "002FastAPItest",
  //           link: "/column/Develop/Backend/FastAPI/002_test2.md",
  //         },
  //       ],
  //     },
  //   ],
  "/column/Develop/": [
    {
      text: "技术目录",
      items: [
        {
          text: "后端目录",
          items: [
            {
              text: "FastAPI文章",
              link: "/column/Develop/Backend/FastAPI/",
              items: [
                {
                  text: "001FastAPItest",
                  link: "/column/Develop/Backend/FastAPI/001_test1.md",
                },
                {
                  text: "0022FastAPItest",
                  link: "/column/Develop/Backend/FastAPI/002_test2.md",
                },
                {
                  text: "http协议",
                  link: "/column/Develop/Backend/FastAPI/http协议.md",
                },
                {
                  text: "Nginx在Docker的使用小记",
                  link: "/column/Develop/Backend/FastAPI/Nginx在Docker的使用小记.md",
                },
                {
                  text: "SQLAlchemy和Tortoise具体使用",
                  link: "/column/Develop/Backend/FastAPI/SQLAlchemy和Tortoise.md",
                },
              ],
            },
            {
              text: "系统设计",
              link: "/column/Develop/Backend/System-Design/",
              items: [
                {
                  text: "状态码",
                  link: "/column/Develop/Backend/System-Design/01.md",
                },
              ],
            },
          ],
        },
        {
          text: "前端目录",
          link: "/column/Develop/Frontend/",
        },
        {
          text: "刷题目录",
          items: [
            {
              text: "LeetCode",
              link: "/column/Develop/Algorithm/",
              items: [
                {
                  text: "704-二分查找",
                  link: "/column/Develop/Algorithm/704-二分查找.md",
                },
                {
                  text: "27-移除元素",
                  link: "/column/Develop/Algorithm/27-移除元素.md",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
