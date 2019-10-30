/**
 * menuConfig.js
 * leftNav的菜单配置
 */

const menuConfig = [
  {
    title: '首页', // 菜单标题名称
    path: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '项目管理',
    path: '/project',
    icon: 'bars'
  },
  {
    title: '业务管理',
    path: '/business',
    icon: 'control',
    children: [
      {
        title: '单位管理',
        path: '/business/org',
        icon: 'appstore'
      },
      {
        title: '项目类型管理',
        path: '/business/category',
        icon: 'folder',
      },
      {
        title: '项目负责人管理',
        path: '/business/leader',
        icon: 'user',
      },
      {
        title: '合作公司管理',
        path: '/business/company',
        icon: 'team',
      }
    ]
  }
  ,
  {
    title: '图形图表',
    path: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        path: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        path: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        path: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },
  {
    title: '用户管理',
    path: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    path: '/role',
    icon: 'safety',
  },
]

export default menuConfig