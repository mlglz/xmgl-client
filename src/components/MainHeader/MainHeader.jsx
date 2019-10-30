import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import { reqWeather } from '../../api/index'
import menuConfig from '../../config/menuConfig' //左侧菜单数据
import memoryUtils from '../../utils/memoryUtils' //内存
import { removeUser } from '../../utils/localStorageUtils' //本地存储
import formatDateUtils from '../../utils/formatDateUtils'
import './MainHeader.css'

//自定义子组件
import LinkButton from '../LinkButton/LinkButton'

class MainHeader extends Component {
  state = {
    currentTime: '',
    dayPictureUrl: '',
    weather: ''
  }

  componentDidMount() {
    // this.getWeather('广州')   //接口失效了
    this.getTime()
  }

  //请求天气
  getWeather = async city => {
    const { dayPictureUrl, weather } = await reqWeather(city)
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  //当前时间
  getTime = () => {
    this.intervalID = setInterval(() => {
      const currentTime = formatDateUtils()
      this.setState({ currentTime })
    }, 1000)
  }

  //获取对应title
  getTitle = () => {
    //1 获取当前路径
    const path = this.props.history.location.pathname
    //2 查找数组对应title
    //2.1 没children的
    //2.2 有children的
    let title
    menuConfig.forEach(item => {
      if (item.path === path) {
        title = item.title
      } else if (item.children) {
        //2.2 有children的
        const targetCitem = item.children.find(cItem => cItem.path === path)
        if (targetCitem) {
          title = targetCitem.title
        }
      }
    })
    //项目详情不是子导航,在menuConfig内未配置
    if(path==='/project/detail'){
      title = '项目详情'
    }
    if(path==='/project/addedit'){
      title = '添加/更新项目'
    }
    return title
  }

  //用户登出
  logout = () => {
    Modal.confirm({
      content: '用户登出确认',
      onOk: () => {
        //1 清除内存和本地存储
        removeUser()
        memoryUtils.user = {}
        //2清除周期函数
        clearInterval(this.intervalID)
        //3 跳转
        this.props.history.replace('/login')
      },
      onCancel: () => {
        // console.log('cancel confirm')
      }
    })
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const title = this.getTitle()
    const { username } = memoryUtils.user
    return (
      <div id='MainHeader' className='MainHeader'>
        <div className='MainHeader-top'>
          <span>欢迎 , {username} </span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='MainHeader-bottom'>
          <div className='MainHeader-bottom-left'>{title}</div>
          <div className='MainHeader-bottom-right'>
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt='' />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MainHeader)
