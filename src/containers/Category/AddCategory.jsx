//子组件
//项目类型管理 \ 添加项目的Form
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const Item = Form.Item
const create = Form.create
const Option = Select.Option

class AddCategory extends Component {
  componentWillMount() {
    //向父组件传递form对象
    this.props.sendForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { parentID, categorys } = this.props //父组件传属性
    return (
      <Form>
        所属类型
        <Item>
          {getFieldDecorator('parentID', { initialValue: parentID })(
            <Select>
              <Option value="0">一级类型</Option>
              {categorys.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>
        类型名
        <Item>
          {getFieldDecorator('name', {
            rules: [{ required: true ,message:'类型名必须输入' }, { min: 2 }]
          })(<Input placeholder="Input name of new category" />)}
        </Item>
      </Form>
    )
  }
}

AddCategory.propTypes = {
  sendForm: PropTypes.func, //将Form对象传给父组件 , 父组件需要Form的方法拿到输入值
  categorys: PropTypes.array,
  parentID: PropTypes.string
}

//包装 , 获得form属性
export default create()(AddCategory)
