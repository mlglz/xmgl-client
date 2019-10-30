/**
 * 角色管理
 */
import React, { Component } from 'react'
import { Card, Form, Input, Icon, Cascader, Select } from 'antd'

// import './Role.css'
import LinkButton from '../../components/LinkButton/LinkButton'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select

export default class ProjectAddEdit extends Component {
  render() {
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
    // formItem配置
    const formItemLayout = {
      labelCol: { md: 3, lg: 2 },
      wrapperCol: { md: 21, lg: 22 }
    }

    const formItemLayout1 = {
      labelCol: { md: 3, lg: 2 },
      wrapperCol: { md: 21, lg: 22 }
    }
    const formItemLayout2 = {
      labelCol: { md: 8 },
      wrapperCol: { md: 8 }
    }

    //项目类型
    const options = [
      { value: '1', label: '项目安全测评' },
      {
        value: '2',
        label: 'CNAS项目',
        children: [
          {
            value: '2.1',
            label: '交换机性能测试'
          },
          {
            value: '2.2',
            label: '路由器性能测试'
          }
        ]
      }
    ]

    return (
      <Card className="ProjectAddEdit" title={title}>
        <Form {...formItemLayout} layout="horizontal">
          <span className="ProjectAddEdit-span">项目概况</span>
          <Item label="项目名称">
            <Input placeholder="项目安全测评填写被测项目全称" />
          </Item>
          <Item label="项目类型" layout="inline">
            <Cascader defaultValue="1"
              options={options}
              expandTrigger="hover"
              style={{ width: 300 }}
            />
          </Item>
          <Item label="项目状态">
            <Select defaultValue="0" style={{ width: 100 }}>
              <Option value="0">未完成</Option>
              <Option value="3">已完成</Option>
            </Select>
          </Item>
          <Item label="项目编号">
            <Input placeholder="XT19000" style={{ width: 100 }} />
          </Item>
          <Item label="项目经理" layout="inline">
            <Input placeholder="张三" style={{ width: 100 }} />
          </Item>
          <Item label="合作机构">
            <Input placeholder="很厉害的团队" style={{ width: 300 }} />
          </Item>
          <Item label="项目备注">
            <TextArea placeholder="" />
          </Item>
          <span className="ProjectAddEdit-span">项目单位</span>
          <Item label="单位名称">
            <Input placeholder="项目单位名称" />
          </Item>
          <Item label="地址">
            <Input placeholder="项目单位地址" />
          </Item>
          <Item label="联系人">
            <Input placeholder="项目单位联系人" style={{ width: 100 }} />
          </Item>
          <Item label="联系电话">
            <Input placeholder="13500000000" style={{ width: 100 }} />
          </Item>
          <Item label="邮箱">
            <Input placeholder="xxx@xxx.com" style={{ width: 100 }} />
          </Item>
          <span className="ProjectAddEdit-span">合同情况</span>
          <Item label="合同状态">
            <Select defaultValue="0" style={{ width: 100 }}>
              <Option value="0">未签</Option>
              <Option value="3">已签</Option>
            </Select>
          </Item>
          <Item label="甲方名称">
            <Input placeholder="合同签署方名称" style={{ width: 300 }} />
          </Item>
          <Item label="甲方地址">
            <Input placeholder="合同签署方地址" />
          </Item>
          <Item label="联系人">
            <Input placeholder="项目单位联系人" style={{ width: 100 }} />
          </Item>
          <Item label="联系方式">
            <Input placeholder="13500000000" style={{ width: 100 }} />
          </Item>
          <Item label="签署时间">
            <Input placeholder="2019/1/1" style={{ width: 100 }} />
          </Item>
          <Item label="合同编号">
            <Input placeholder="ht123456" style={{ width: 100 }} />
          </Item>
          <Item label="合同金额">
            <Input placeholder="10000" style={{ width: 100 }} />
          </Item>
          <Item label="支付方式">
            <Select defaultValue="2" style={{ width: 200 }}>
              <Option value="1">一笔支付</Option>
              <Option value="2">二笔支付</Option>
              <Option value="3">其他</Option>
            </Select>
          </Item>
          <Item label="项目备注">
            <TextArea placeholder="" />
          </Item>
          <span className="ProjectAddEdit-span">支付情况</span>

          <Item label="支付状态">
            <Select defaultValue="0" style={{ width: 200 }}>
              <Option value="0">未付</Option>
              <Option value="1">首款已付</Option>
              <Option value="2">二笔已付</Option>
              <Option value="3">完成支付</Option>
            </Select>
          </Item>
          <Item label="发票1">
            <Input placeholder="123456" style={{ width: 200 }} />
          </Item>
          <Item label="发票2">
            <Input placeholder="123456" style={{ width: 200 }} />
          </Item>
        </Form>
      </Card>
    )
  }
}
