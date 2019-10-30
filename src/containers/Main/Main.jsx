/*----引核心包----*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

/*----引自定义组件,函数----*/
import './Main.css'
//action
import {} from '../../redux/actions'
//自定义组件
import LeftNav from '../../components/LeftNav/LeftNav'
import MainHeader from '../../components/MainHeader/MainHeader'

import Home from '../Home/Home'
import Project from '../Project/Project' //项目管理
import Org from '../Org/Org'
import Category from '../Category/Category'
import Leader from '../Leader/Leader'
import Company from '../Company/Company'
// import Engineer from '../Engineer/Engineer'
import Bar from '../Charts/Bar/Bar' //图表们
import Line from '../Charts/Line/Line'
import Pie from '../Charts/Pie/Pie'
import User from '../User/User'
import Role from '../Role/Role'
//工具函数
import memoryUtils from '../../utils/memoryUtils'

//UI
const { Sider, Content, Footer } = Layout

class Main extends Component {
  render() {
    //强制登录
    //如果内存中无user
    const { user } = memoryUtils
    if (!user._id) {
      return <Redirect to='/login' />
    }

    return (
      <Layout id='Main' style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <MainHeader />
          <Content style={{ background: 'white', margin: 20, height: '100%' }}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/project' component={Project} />
              <Route path='/business/org' component={Org} />
              <Route path='/business/category' component={Category} />
              <Route path='/business/leader' component={Leader} />
              <Route path='/business/company' component={Company} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', background: 'white' }}>
            求求你用chrome吧
            <p>Hao Dahai Copyright &#169; 2019.</p>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

//属性声明检查
Main.propTypes = {
  bg: PropTypes.string,
  font: PropTypes.string
}

//包装
export default connect(
  state => ({ bg: state.bg, font: state.font }),
  {}
)(Main)
