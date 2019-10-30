/**
 * formatDateUtils.js
 * 格式化时间
 */

export default () => {
  const DateObj = new Date()
  const DateString = DateObj.getFullYear() + '-' + (DateObj.getMonth()+1) + '-' + DateObj.getDate() + ' '
  const TimeString = DateObj.getHours() + ':' + DateObj.getMinutes()+ ':' + DateObj.getSeconds()
  return DateString + TimeString
}