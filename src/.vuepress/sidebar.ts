import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        "",
        {
            text: "Java",
            icon: "logos:java",
            prefix: "java/",
            children: "structure",
        },
        {
            text: "数据库",
            icon: "material-symbols:database",
            prefix: "database/",
            children: "structure",
        },
        {
            text: "Spring",
            icon: "devicon:spring",
            prefix: "spring/",
            children: "structure",
        },
        {
            text: "云",
            icon: "fxemoji:cloud",
            prefix: "cloud/",
            children: "structure",
        },
        {
            text: "项目",
            icon: "eos-icons:project",
            prefix: "project/",
            children: "structure",
        },
        {
            text: "基础",
            icon: "carbon:skill-level-basic",
            prefix: "basic/",
            children: "structure",
        }
    ],
});

// export default sidebar({
//     "/java/": "structure",
//     "/database/": "structure",
//     "/spring/": "structure",
//     "/cloud/": "structure",
//     "/project/": "structure",
//     "/basic/": "structure"
// });