/**
 * 角色管理
 */
import React, { Component } from 'react'
import { Card, Icon, List, message } from 'antd'

// import './ProjectDetail.css'
import LinkButton from '../../components/LinkButton/LinkButton'
import { reqCategory } from '../../api/index'


const Item = List.Item

export default class ProjectDetail extends Component {
  state = {
    categoryName: '',
    categoryPName: ''
  }

  componentDidMount() {
    this.getCategory()
  }

  //获取该项目的项目类型(及父类型if has)
  getCategory = async () => {
    //1 ID
    const project = this.props.location.state
    const { categoryID, categoryPID } = project
    //1.1 处理测试数据,暂时没填类型ID
    if (!categoryID) {
      return
    }
    //2 请求
    //2.1 一级类型(即categoryPID==='0')
    if (categoryPID === '0') {
      const response = await reqCategory(categoryID)
      const { code, msg, category } = response.data
      if (code !== 0) {
        return message.info(msg)
      }
      this.setState({ categoryName: category.name })
    } else {
      //2.2 二级类型 , 请求两个类型名
      const responses = await Promise.all([
        reqCategory(categoryID),
        reqCategory(categoryPID)
      ])
      //data:{code , msg , category}
      const data = responses[0].data
      const dataP = responses[1].data
      //1)处理错误
      if (data.code !== 0) {
        return message.info(data.msg)
      }
      if (dataP.code !== 0) {
        return message.info(dataP.msg)
      }
      //3 更新状态
      const category = responses[0].data.category
      const categoryP = responses[1].data.category
      this.setState({
        categoryName: category.name,
        categoryPName: categoryP.name
      })
    }
  }

  render() {
    const { categoryName, categoryPName } = this.state
    const project = this.props.location.state
    const { name, number, status, remark } = project

    //项目概况
    const { unit, address, contact, contactPhone, contactMail, tax } = project
    //实施
    const { exeLeader, exeCompany } = project
    //合同
    const {
      contractStatus,
      contractNumber,
      party,
      partyAddr,
      partyContact,
      partyContactInfo,
      contractDate,
      contractPrice,
      contractRemark
    } = project
    //支付
    const {
      payWays,
      payStatus,
      invoiceNumber,
      invoiceNumber2,
      invoiceNumber3,
      payRemark
    } = project

    //left-top corner
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{ marginRight: 5 }} />
          <span>返回</span>
        </LinkButton>
      </span>
    )

    return (
      <Card className="ProjectDetail" title={title}>
        {/*项目概况*/}
        <List
          size="small"
          header={<div className="list-header">项目概况</div>}
          bordered
        >
          <Item>
            <span className="span-left">项目名称</span>
            <span className="span-right">{name}</span>
            <span className="span-left">项目类型</span>
            <span className="span-right">
              {categoryPName ? categoryPName + ' / ' : ''}
              {categoryName}
            </span>
          </Item>
          <Item>
            <span className="span-left">项目状态</span>
            <span className="span-right">
              {status === '0' ? '未完成' : '完成'}
            </span>
            <span className="span-left">项目编号</span>
            <span className="span-right">{number}</span>
          </Item>
          <Item>
            <span className="span-left">项目经理</span>
            <span className="span-right">{exeLeader}</span>
            <span className="span-left">合作机构</span>
            <span className="span-right">{exeCompany}</span>
          </Item>
          <Item>
            <span className="span-left">项目备注</span>
            <span>{remark}</span>
          </Item>
        </List>

        {/*项目单位 */}
        <List
          size="small"
          header={<div className="list-header">项目单位</div>}
          bordered
        >
          <Item>
            <span className="span-left">项目单位</span>
            <span className="span-right">{unit}</span>
          </Item>
          <Item>
            <span className="span-left">单位地址</span>
            <span className="span-right">{address}</span>
          </Item>
          <Item>
            <span className="span-left">联系人&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="span-right">{contact}</span>
            <span className="span-left">联系电话</span>
            <span className="span-right">{contactPhone}</span>
            <span className="span-left">邮箱</span>
            <span className="span-right">{contactMail}</span>
          </Item>
        </List>

        {/*合同情况 */}
        <List
          size="small"
          header={<div className="list-header">合同情况</div>}
          bordered
        >
          <Item>
            <span className="span-left">合同状态</span>
            <span className="span-right">
              {contractStatus === '0' ? '未签' : '已签'}
            </span>
          </Item>
          <Item>
            <span className="span-left">甲方名称</span>
            <span className="span-right">{party}</span>
            <span className="span-left">纳税编号</span>
            <span className="span-right">{tax}</span>
          </Item>
          <Item>
            <span className="span-left">甲方地址</span>
            <span className="span-right">{partyAddr}</span>
          </Item>
          <Item>
            <span className="span-left">联系人&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span className="span-right">{partyContact}</span>
            <span className="span-left">联系方式</span>
            <span className="span-right">{partyContactInfo}</span>
          </Item>
          <Item>
            <span className="span-left">签署日期</span>
            <span className="span-right">{contractDate}</span>
            <span className="span-left">合同编号</span>
            <span className="span-right">{contractNumber}</span>
          </Item>
          <Item>
            <span className="span-left">合同金额</span>
            <span className="span-right">{contractPrice}</span>
          </Item>
          <Item>
            <span className="span-left">合同备注</span>
            <span>{contractRemark}</span>
          </Item>
        </List>
        {/*支付情况 */}
        <List
          size="small"
          header={<div className="list-header">支付情况</div>}
          bordered
        >
          <Item>
            <span className="span-left">支付状态</span>
            <span className="span-right">
              {payStatus === '0' ? '未付' : payStatus}
            </span>
          </Item>
          <Item>
            <span className="span-left">支付方式</span>
            <span className="span-right">{`${payWays}笔支付`}</span>
          </Item>
          <Item>
            <span className="span-left">发票1</span>
            <span className="span-right">{invoiceNumber}</span>
            <span className="span-left">发票2</span>
            <span className="span-right">{invoiceNumber2}</span>
            <span className="span-left">发票3</span>
            <span className="span-right">{invoiceNumber3}</span>
          </Item>
          <Item>
            <span className="span-left">支付备注</span>
            <span>{payRemark}</span>
          </Item>
        </List>
      </Card>
    )
  }
}
