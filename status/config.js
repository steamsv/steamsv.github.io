// 配置
window.Config = {

  // 站点名
  SiteName: '流媒体服务器状态',

  // 站点链接
  SiteUrl: '/',

  // UptimeRobot Api Keys
  // 支持 Monitor-Specific 和 Read-Only 两种 Api Key
  ApiKeys: [
    'ur958597-7c418426c1de340f4b74bf5f'
  ],

  // 是否显示监测站点的链接
  ShowLink: false,

  // 日志天数
  // 虽然免费版说仅保存60天日志，但测试好像API可以获取90天的
  // 不过时间不要设置太长，容易卡，接口请求也容易失败
  CountDays: 7,

  // 导航栏菜单
  Navi: [
    {
      text: '项目主页',
      url: 'https://github.com/geekyouth/uptime-status'
    },
    {
      text: 'GitHub',
      url: 'https://github.com/geekyouth/'
    },
    {
      text: '博客',
      url: 'https://java666.cn'
    }
  ]
};
