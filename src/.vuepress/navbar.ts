import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: '主页',
        icon: 'material-symbols:home-outline',
        link: '/'
    },
    {
        text: 'Java 语言',
        icon: 'logos:java',
        link: '/java/'
    },
    {
        text: '数据库',
        icon: 'material-symbols:database',
        link: '/database/'
    },
    {
        text: 'Spring',
        icon: 'devicon:spring',
        link: '/spring/'
    },
    {
        text: '云',
        icon: 'fxemoji:cloud',
        link: '/cloud/'
    },
    {
        text: '项目',
        icon: 'eos-icons:project',
        link: '/project/'
    },
    {
        text: '基础',
        icon: 'carbon:skill-level-basic',
        link: '/basic/'
    },
    {
        text: '其他',
        icon: 'ph:article-medium',
        link: '/post/'
    },
    {
        text: '时间轴',
        icon: 'icons8:timeline',
        link: '/timeline/'
    },
]);