import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Checkbox, Container, Divider, Dropdown, Form, FormGroup, Icon, Popup } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Popuputil from '../../Utils/Popup'
import LoadingPage from '../../Utils/LoadingPage'

export default class CostumertypesCreate extends Component {

  constructor(props) {
    super(props)
    const selecteddepartments = []
    const record = {}
    this.state = {
      selecteddepartments,
    }
  }


  componentDidMount() {
    const { GetDepartments } = this.props
    GetDepartments()
  }

  render() {
    const { Costumertypes, Departments, removeCostumertypenotification, removeDepartmentnotification } = this.props
    if (Costumertypes.notifications && Costumertypes.notifications.length > 0) {
      let msg = Costumertypes.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removeCostumertypenotification()
    }
    if (Departments.notifications && Departments.notifications.length > 0) {
      let msg = Departments.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removeDepartmentnotification()
    }

    const Departmentoptions = Departments.list.map(department => {
      return { key: department.concurrencyStamp, text: department.name, value: department.concurrencyStamp }
    })


    return (
      Costumertypes.isLoading || Costumertypes.isDispatching || Departments.isLoading || Departments.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Costumertypes"}>
                  <Breadcrumb.Section >Müşteri Türleri</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Oluştur</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form className='' onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input label="Müşteri Tür Adı" placeholder="Müşteri Tür Adı" name="name" fluid />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label className='text-[#000000de]'>Departmanlar</label>
                  <Dropdown placeholder='Departmanlar' clearable search fluid multiple selection options={Departmentoptions} onChange={this.handleChange} />
                </Form.Field>
              </Form.Group>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Costumertypes">
                  <Button floated="left" color='grey'>Geri Dön</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>Oluştur</Button>
              </div>
            </Form>
          </div>
        </div>
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const { AddCostumertypes, history, fillCostumertypenotification, Departments } = this.props
    const { list } = Departments
    const data = formToObject(e.target)
    data.departments = this.state.selecteddepartments.map(department => {
      return list.find(u => u.concurrencyStamp === department)
    })
    data.departmentstxt = null
    data.id = 0
    data.concurrencyStamp = null
    data.createdUser = null
    data.updatedUser = null
    data.deleteUser = null
    data.createTime = null
    data.updateTime = null
    data.deleteTime = null
    data.isActive = true

    let errors = []
    if (!data.name || data.name == '') {
      errors.push({ type: 'Error', code: 'Müşteri Türleri', description: 'İsim Boş Olamaz' })
    }
    if (!data.departments || data.departments.length <= 0) {
      errors.push({ type: 'Error', code: 'Müşteri Türleri', description: 'Hiç Bir Departman seçili değil' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillCostumertypenotification(error)
      })
    } else {
      AddCostumertypes(data, history)
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }

  handleChangeOption = (e, { value }) => {
    this.setState({ selectedstatusOption: value })
  }
}