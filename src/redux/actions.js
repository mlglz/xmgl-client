import { BG_COLOR_CHANGE , FONT_COLOR_CHANGE } from "./action-types";


/**
 * 修改背景色
 * @param {*} color 
 */
export const bgChange = (color)=>{
  return {type:BG_COLOR_CHANGE , data:color}
}

/**
 * 修改字体颜色
 * @param {]} color 
 */
export const fontChange = (color)=>{
  return {type:FONT_COLOR_CHANGE , data:color}
}