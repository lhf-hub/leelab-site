/**
 * 站点事实与动态数据。
 *
 * 静态文案已经写在 index.html 里，保证无 JS 时也能读；
 * 这里放 JS 运行时真正需要的链接、数字和新增项目时复用的数据结构。
 */
export const site = {
  name: 'Lee',
  brand: 'leelab',
  email: 'leemail208@163.com',
  domain: 'leelab.com.cn',
  url: 'https://leelab.com.cn/',
  brandLine: '谋生有度，生活有光。',
  intro: '我是 Lee，写代码，也做点让上班和找工作都没那么难熬的小工具。',
  meta: '独立开发 · Windows 工具与 Web',

  links: {
    blog: 'https://blog.csdn.net/lhf__',
    github: 'https://github.com/lhf-hub?tab=repositories',
  },

  projects: [
    {
      id: 'salaryticker',
      name: 'SalaryTicker',
      displayName: '实时计算器',
      tagline: '把月薪拆成看得见的每一秒。',
      url: 'https://salaryticker.leelab.com.cn/',
      platform: 'Windows 10/11',
      version: '1.2.0',
      demo: true,
      chips: ['五险一金', '个税', '班制补班', '摸鱼计时'],
    },
    {
      id: 'jobpilot',
      name: 'JobPilot',
      displayName: '智能求职助手',
      tagline: '为你的下一份工作，做好准备。',
      description: '真实招聘数据 + AI 深度分析：优化简历、模拟面试、发现机会。',
      url: 'http://47.106.222.233:8000/',
      platform: 'Web',
      domainPending: true,
      chips: ['简历优化', '面试模拟', '岗位推荐', '本地存储'],
    },
  ],

  salaryTicker: {
    name: 'SalaryTicker',
    displayName: '实时计算器',
    tagline: '把月薪拆成看得见的每一秒。',
    quote: '不是又一个工资计算器，是屏幕角落一直在涨的那个数字。',
    url: 'https://salaryticker.leelab.com.cn/',
    version: '1.2.0',
    platform: 'Windows 10/11',
    base: 8720.86,
    perSecond: 0.0304,
    today: 838.86,
    hour: 17.82,
    chips: ['五险一金', '个税', '班制补班', '摸鱼计时'],
    demo: true,
  },

  jobPilot: {
    name: 'JobPilot',
    displayName: '智能求职助手',
    tagline: '为你的下一份工作，做好准备。',
    description: '真实招聘数据 + AI 深度分析：优化简历、模拟面试、发现机会。',
    url: 'http://47.106.222.233:8000/',
    platform: 'Web',
    domainPending: true,
    chips: ['简历优化', '面试模拟', '岗位推荐', '本地存储'],
  },

  marquee: ['谋生有度', '生活有光', '做点有用的东西', '写点想写的东西'],
};
