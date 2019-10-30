//核心依赖包
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';



//自定义模块,组件
import './index.css'
import store from "./redux/store";    //redux
import Login from "./containers/Login/Login";              //登录组件
import Main from "./containers/Main/Main";              //主容器组件

//utils
import { getUser } from "./utils/localStorageUtils";
import memoryUtils from "./utils/memoryUtils";

/**
 * 自动登录
 * 如果localStorage里有user ,赋值给内存
 */
memoryUtils.user = getUser() || {}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)