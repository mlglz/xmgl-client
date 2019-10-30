import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import { Form, Icon, Input, Button, message } from 'antd'

//自定义css
import './Login.css'
//api函数
import { reqLogin } from '../../api'
//工具函数
import memoryUtils from '../../utils/memoryUtils'
import { setUser } from '../../utils/localStorageUtils'

//引自定义组件,模块
import {} from '../../redux/actions' //action

const Item = Form.Item

class Login extends Component {
  /**
   * 用户 提交
   * 1 拿到输入
   * 2 提交请求
   * 3 处理响应
   */
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return console.log('校验失败', err)
      }
      const { username, password } = values
      //2 提交请求
      const response = await reqLogin(username, password) //response.data 即后台响应数据 {code , msg , user:object}
      //3 处理响应
      const { code, msg, user } = response.data
      console.log(code, msg)
      if (code !== 0) {
        return message.error(msg)
      }
      //1) 存储memory localStorage
      memoryUtils.user = user
      setUser(user)
      //2) 跳转
      this.props.history.replace('/')
    })
  }

  render() {
    //自动登录
    //如果内存中有user
    const { user } = memoryUtils
    if (user && user._id) {
      return <Redirect to='/' />
    }

    const { getFieldDecorator } = this.props.form //用于封装Input
    return (
      <div id='Login'>
        <header className='login-header'>
          <img src={require('../../assets/images/logo.jpg')} alt='' />
          <h1>Hao Projects Management</h1>
        </header>
        <section className='login-cotent'>
          <h2>User Login</h2>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '必须输入用户名' },
                  { min: 2, message: 'Username with at least 3 characters' },
                  { max: 10, message: '用户名最长10位' },
                  { pattern: /^[a-z]/, message: '用户名必须以小写字母开头' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Username'
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Enter a password with at least 6 characters'
                  },
                  { min: 3, message: '' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='Password'
                />
              )}
            </Item>
            <Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                onClick={this.handleSubmit}
              >
                Log in
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

//属性声明检查
Login.propTypes = {
  bgChange: PropTypes.func,
  fontChange: PropTypes.func
}

//包装form
const WrapLogin = Form.create()(Login)

//包装redux
export default connect(
  state => ({ user: state.user }),
  {}
)(WrapLogin)
