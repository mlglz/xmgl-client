/**
 * 项目管理
 */
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './Project.css'
import ProjectHome from './ProjectHome'
import ProjectAddEdit from './ProjectAddEdit'
import ProjectDetail from './ProjectDetail'

export default class Project extends Component {
  render() {
    return (
      <Switch className='Project'>
        <Route path='/project' component={ProjectHome} exact />
        <Route path='/project/addedit' component={ProjectAddEdit} />
        <Route path='/project/detail' component={ProjectDetail} />
        <Redirect to='/project' />
      </Switch>
    )
  }
}
