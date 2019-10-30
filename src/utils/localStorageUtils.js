/**
 * localStorageUtils
 * 本地存储工具函数
 */

import store from 'store'

const KEY_USER = 'KEY_USER'

export const setUser = (user) => {
  store.set(KEY_USER, user)
}

export const getUser = () => {
  return store.get(KEY_USER)
}


export const removeUser = () => {
  store.remove(KEY_USER)
}