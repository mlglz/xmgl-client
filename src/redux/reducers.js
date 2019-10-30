import { combineReducers } from "redux";

import { BG_COLOR_CHANGE, FONT_COLOR_CHANGE, USERLIST_RECIEVE, USER_SUCCESS, USER_FAIL } from "./action-types";



/**
 * 用户
 */
const initUser = {}
function user(state = initUser, action) {
  switch (action.type) {
    case USER_SUCCESS:
      return action.data
    case USER_FAIL:
      return action.data
    default:
      return state
  }
}

/**
 * 用户列表
 */
const initUserlist = {}
function userlist(state = initUserlist, action) {
  switch (action.type) {
    case USERLIST_RECIEVE:
      return action.data
    default:
      return state
  }
}




/**
 * 背景器
 */
const initBg = 'white'
function bg(state = initBg, action) {
  switch (action.type) {
    case BG_COLOR_CHANGE:
      return action.data

    default:
      return state
  }
}

/**
 * 字体器
 */
const initFont = 'black'
function font(state = initFont, action) {
  switch (action.type) {
    case FONT_COLOR_CHANGE:

      return action.data

    default:
      return state
  }
}




//输出
export default combineReducers({
  user, userlist, bg, font
})