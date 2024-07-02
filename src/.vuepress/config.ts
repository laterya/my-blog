import {defineUserConfig} from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
    dest: "./html",
    base: "/",

    lang: "zh-CN",
    title: "时间回答所有",
    description: "laterya的个人博客记录",

    theme,

    // 和 PWA 一起启用
    // shouldPrefetch: false,
});
