/**
 * 左侧导航条
 */

//引核心依赖
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'

//自定义
import './LeftNav.css'
import logo from '../../assets/images/logo.jpg'
import menuConfig from '../../config/menuConfig' //菜单数组

const { SubMenu, Item } = Menu

class LeftNav extends Component {
  //渲染前应生成
  componentWillMount() {
    // this.menuNodes = this.getmenuNodes(menuConfig)
    this.menuNodes = this.getmenuNodes_reduce(menuConfig) //reduce写法
  }

  /**
   * 界面函数:生成菜单项们
   */
  getmenuNodes = menuConfig => {
    //获取当前请求path
    const currentPath = this.props.location.pathname

    return menuConfig.map((item, index) => {
      // console.log(item)
      //遍历生成导航们
      const { title, path, icon, children } = item
      //1 标准导航
      if (!children) {
        return (
          <Item key={path}>
            <Link to={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </Link>
          </Item>
        )
      } else {
        //2 包含子导航的导航

        //2.1 先确认openKeys
        //如果这个导航(SubMenu)里包含与当前请求路径一样的子导航,则展开这个导航
        if (children.find(childItem => childItem.path === currentPath)) {
          this.openKeys = path
        }

        return (
          <SubMenu
            key={path}
            title={
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            {this.getmenuNodes(children)}
          </SubMenu>
        )
      }
    })
  }

  //reduce写法
  getmenuNodes_reduce = menuConfig => {
    //获取当前请求path
    const currentPath = this.props.location.pathname

    const menuNodes = menuConfig.reduce((pre, item) => {
      const { title, path, icon, children } = item
      //1 不包含children的导航
      if (!children) {
        pre.push(
          <Item key={path}>
            <Link to={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </Link>
          </Item>
        )
      } else {
        //2 包含子导航的导航
        //2.1 先确认openKeys
        //如果这个导航(SubMenu)里包含与当前请求路径一样的子导航,则展开这个导航
        if (children.find(childItem => childItem.path === currentPath)) {
          this.openKeys = path
        }
        pre.push(
          <SubMenu
            key={path}
            title={
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            {this.getmenuNodes_reduce(children)}
          </SubMenu>
        )
      }
      return pre
    }, [])

    //返回最终结果
    return menuNodes
  }

  render() {
    //用于刷新页面后,根据url 默认选中的菜单项selectedKeys
    //Menu不使用defaultSelectedKeys , 因为它只在第一次render时候配置,之后不变了(初始如果请求 / , 则default就一直是/了 , 自动跳转/home , 首页也不高亮)
    //而selectedKeys是动态的(解决初始请求/ 自动跳转/home并需要高亮首页的需求)
    let currentPath = this.props.location.pathname
    //处理/produce/detail
    if (currentPath.indexOf('/project') === 0) {
      currentPath = '/project'
    }
    //用于刷新页面后,根据url默认展开的子菜单defaultOpenKeys(仅为了优化视觉体验,实际右侧content组件已正确路由)
    const openKeys = this.openKeys
    return (
      <div id="LeftNav" className="LeftNav">
        <header className="LeftNav-header">
          <img src={logo} alt="logo" />
          <h1>Hao 项目管理系统</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[currentPath]}
          defaultOpenKeys={[openKeys]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
}

//包装非路由组件,传递三个props history,location,match
export default withRouter(LeftNav)
