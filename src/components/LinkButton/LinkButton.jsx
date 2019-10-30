//长得像链接的button组件
import React, { Component } from 'react'
import './LinkButton.css'

export default class LinkButton extends Component {
  render() {
    return <button {...this.props} className='LinkButton'/>
  }
}
