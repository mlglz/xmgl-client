/**
 * pictureWall.jsx
 * 照片墙
 */

import React, { Component } from 'react'
import { Upload, Button, Icon } from 'antd'

class PictureWall extends Component {
  state = {
    previewVisible: false, // 标识是否显示大图预览Modal
    previewImage: '', // 大图的url
    fileList: [
      /*{
            uid: '-1', // 每个file都有自己唯一的id
            name: 'xxx.png', // 图片文件名
            status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
          },*/
    ]
  }

  render() {
    const props = {
      action: '/project/upload',
      name: 'file',
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList)
        }
      },
      defaultFileList: [

      ]
    }
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    )
  }
}

export default PictureWall
