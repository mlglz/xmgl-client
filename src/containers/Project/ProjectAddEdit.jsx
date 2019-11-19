/**
 * 角色管理
 */
//test
import React, { Component } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Icon,
  message,
  Cascader,
  Row,
  Select
} from 'antd'

// import './Role.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqLeaders } from '../../api/leader'
import { reqCompanys } from '../../api/company'
import { reqCategorys } from '../../api/index'
import { reqAddProject } from '../../api/project'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select

class ProjectAddEdit extends Component {
  state = {
    leaders: [],
    companys: [],
    categorys: [],
    options: []
  }

  componentDidMount() {
    this.getCategorys('0')
    this.getLeaders()
    this.getCompanys()
  }

  //配置测评类型Cascader标签的数据
  //options=[{value:string, label:string , children:[]} , {value , label , children}]
  //1 发请求
  //2 得到数据
  //3 构建标签数据
  setCategoryOptions = async () => {
    //1 发请求
    const response = await reqCategorys()
    //2 得到数据
    const { code, categorys } = response.data
    console.log(categorys)
    if (code === 0) {
      //3 构建标签数据
      let options = []
      categorys.forEach(item => {
        if (item.parentID === '0') {
          //3.1 一级类型(parentID为0的)
          options.push({
            value: item._id, //  project的categoryID的值为类型id而不是名字
            label: item.name,
            key: item._id,
            children: []
          })
        } else {
          //3.2 子类型 (parentID不为0的)
          const targetLv1Category = options.find(Lv1Item => {
            return Lv1Item.key === item.parentID
          })
          // targetLv1Category.children=[]
          targetLv1Category.children.push({
            value: item.name,
            label: item.name,
            key: item._id
          })
        }
      })
      this.categoryOptions = options
    }
  }

  //获取categorys
  //一级类型 或 二级类型
  //1 发请求
  //2 得到数据
  //3 配置options数据
  getCategorys = async parentID => {
    //1 发请求
    const response = await reqCategorys(parentID)
    //2 得到数据
    const { code, categorys } = response.data
    if (code === 0) {
      //3 配置options数据
      //3.1 如果请求1及类型 , 调用函数配置1及选项
      if (parentID === '0') {
        this.setInitOptions(categorys)
      } else {
        //3.2请求的是2及类型 , 返回数据
        return categorys //async函数,配置return则 , 成功 , 且返回该数据
      }
    }
  }

  //配置类型标签的options(一级)
  setInitOptions = categorys => {
    const options = categorys.map(item => ({
      value: item._id,
      label: item.name,
      isLeaf: false
    }))
    this.setState({ options })
  }

  //监听点击
  //获取子categorys
  //1 获取当前选中
  //2 按id请求categorys
  //3 配置子菜单
  loadData = async selectedOptions => {
    //1 获取当前选中
    const targetOption = selectedOptions[0]
    targetOption.loading = true //loading视觉效果
    const targetID = targetOption.value

    //2 按id请求categorys
    const childCategorys = await this.getCategorys(targetID)
    targetOption.loading = false

    //3 配置子菜单
    if (childCategorys && childCategorys.length > 0) {
      //3.1有子options
      const childOptions = childCategorys.map(item => ({
        value: item._id,
        label: item.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else {
      //3.2 没有子options
      targetOption.isLeaf = true //leaf才能被选中
    }
    //4 更新状态
    this.setState({
      options: [...this.state.options]
    })
  }

  //获取项目经理列表
  //1 发请求
  //2 得到数据
  //3 更新状态
  getLeaders = async () => {
    const response = await reqLeaders()
    const { code, leaders } = response.data
    if (code === 0) {
      this.setState({ leaders })
    }
  }

  //获取合作机构列表
  //1 发请求
  //2 得到数据
  //2.1 处理公司可用状态
  //3 更新状态
  getCompanys = async () => {
    //1 发请求
    const response = await reqCompanys()
    //2 得到数据
    const { code, companys } = response.data
    if (code === 0) {
      //2.1 处理公司可用状态
      let availableCompanys = []
      companys.forEach(item => {
        if (item.companyStatus === '1') {
          availableCompanys.push(item)
        }
      })
      //3 更新状态
      this.setState({ companys: availableCompanys })
    }
  }

  /**
   * 提交表单
   */
  submit = () => {
    const { validateFields } = this.props.form
    validateFields(async (err, values) => {
      if (err) {
        return console.log('form error')
      }

      //除了项目类型id
      const { category } = values
      if (category.length > 1) {
        //二级类型
        values.categoryID = category[1]
        values.categoryPID = category[0]
      } else {
        //一级类型
        values.categoryID = category[0]
      }
      // console.log(values)
      //2 提交
      const response = await reqAddProject(values)
      //3 处理响应
      // console.log(response)
      const { code, msg } = response.data
      if (code !== 0) {
        return message.error(msg, 0.5)
      }
      message.success(msg, 0.5)
      this.props.history.push('/project')
    })
  }

  render() {
    const { leaders, companys, options } = this.state
    const title = (
      <LinkButton
        onClick={() => {
          this.props.history.goBack()
        }}
      >
        <Icon type="arrow-left" style={{ marginRight: 5 }} />
        返回
      </LinkButton>
    )
    // formItem布局配置
    const formItemLayout = {
      labelCol: { md: 3, lg: 2 },
      wrapperCol: { md: 21, lg: 22 }
    }

    // const formItemLayout1 = {
    //   labelCol: { md: 3, lg: 2 },
    //   wrapperCol: { md: 21, lg: 22 }
    // }

    const formItemLayout3_21 = {
      labelCol: { lg: 3 },
      wrapperCol: { lg: 21 }
    }
    const formItemLayout4_20 = {
      labelCol: { lg: 4 },
      wrapperCol: { lg: 20 }
    }

    const formItemLayout6_18 = {
      labelCol: { lg: 6 },
      wrapperCol: { lg: 18 }
    }

    const formItemLayout12_12 = {
      labelCol: { lg: 12 },
      wrapperCol: { lg: 12 }
    }

    //用于封装标签
    const { getFieldDecorator } = this.props.form

    return (
      <Card className="ProjectAddEdit" title={title}>
        <Form {...formItemLayout} layout="horizontal">
          <span className="ProjectAddEdit-title">项目概况</span>
          <Row gutter={16}>
            <Col span={16}>
              <Item label="项目名称" {...formItemLayout3_21}>
                {getFieldDecorator('name', {
                  rules: [
                    { required: true },
                    { min: 4, message: 'at least 4 characters' }
                  ],
                  initialValue: '1234'
                })(<Input placeholder="项目安全测评填写被测项目全称" />)}
              </Item>
            </Col>
            <Col span={8}>
              <Item label="项目编号" {...formItemLayout12_12}>
                {getFieldDecorator('number', {
                  rules: []
                })(<Input placeholder="XT19000" />)}
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item label="项目状态" {...formItemLayout4_20}>
                {getFieldDecorator('status', {
                  initialValue: '0'
                })(
                  <Select>
                    <Option value="0">未完成</Option>
                    <Option value="3">已完成</Option>
                  </Select>
                )}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="项目类型" {...formItemLayout4_20}>
                {getFieldDecorator('category', {
                  initialValue: ['5d831ed50a0211195855f7e2']
                })(<Cascader options={options} loadData={this.loadData} />)}
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item label="项目经理" {...formItemLayout4_20}>
                {getFieldDecorator('exeLeader', {
                  rules: [{ required: true }]
                })(
                  <Select>
                    {leaders.map(item => (
                      <Option value={item.leaderName} key={item._id}>
                        {item.leaderName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="合作机构" {...formItemLayout4_20}>
                {getFieldDecorator('exeCompany', {
                  rules: []
                })(
                  <Select>
                    {companys.map(item => (
                      <Option value={item.companyName} key={item._id}>
                        {item.companyName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>
            </Col>
          </Row>

          <Item label="项目备注">
            {getFieldDecorator('remark', {
              rules: []
            })(<TextArea placeholder="" rows={1} />)}
          </Item>
          <span className="ProjectAddEdit-title">项目单位</span>
          <Item label="单位名称">
            {getFieldDecorator('unit', { rules: [{ required: true }] })(
              <Input placeholder="项目单位名称" />
            )}
          </Item>
          <Item label="单位地址">
            {getFieldDecorator(
              'address',
              {}
            )(<Input placeholder="项目单位地址" />)}
          </Item>
          <Row gutter={16}>
            <Col span={8}>
              <Item label="联系人" {...formItemLayout6_18}>
                {getFieldDecorator(
                  'contact',
                  {}
                )(<Input placeholder="项目单位联系人" />)}
              </Item>
            </Col>
            <Col span={8}>
              <Item label="电话" {...formItemLayout4_20}>
                {getFieldDecorator(
                  'contactPhone',
                  {}
                )(<Input placeholder="13500000000" />)}
              </Item>
            </Col>
            <Col span={8}>
              <Item label="邮箱" {...formItemLayout4_20}>
                {getFieldDecorator(
                  'contactMail',
                  {}
                )(<Input placeholder="xxx@xxx.com" />)}
              </Item>
            </Col>
          </Row>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProjectAddEdit)
