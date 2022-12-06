import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Checkbox, Divider, Dropdown, Form, Header } from 'semantic-ui-react'
import Popup from '../../Utils/Popup'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'

export default class CasesEdit extends Component {
  constructor(props) {
    super(props)
    const selecteddepartments = []
    const record = {}
    const isDatafetched = false
    this.state = {
      selecteddepartments,
      isDatafetched
    }
  }

  componentDidMount() {
    const { GetCase, match, history, GetDepartments } = this.props
    if (match.params.CaseID) {
      GetCase(match.params.CaseID)
      GetDepartments()
    } else {
      history.push("/Departments")
    }
  }

  componentDidUpdate() {
    const { Departments, Cases } = this.props
    const { selected_record, isLoading } = Cases
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.id != 0 && Departments.list.length > 0 && !Departments.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selecteddepartments: selected_record.departments.map(department => {
          return department.concurrencyStamp
        }), isDatafetched: true
      })
    }
  }

  render() {

    const { Cases, Departments, removeDepartmentnotification, removeCasenotification } = this.props
    if (Cases.notifications && Cases.notifications.length > 0) {
      let msg = Cases.notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeCasenotification()
    }
    if (Departments.notifications && Departments.notifications.length > 0) {
      let msg = Departments.notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeDepartmentnotification()
    }

    const Departmentoptions = Departments.list.map(department => {
      return { key: department.concurrencyStamp, text: department.name, value: department.concurrencyStamp }
    })

    return (
      Departments.isLoading || Departments.isDispatching || Cases.isLoading || Cases.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Cases"}>
                  <Breadcrumb.Section >Durumlar</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Oluştur</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form className='' onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input label="Durum Adı" placeholder="Durum Adı" name="name" fluid defaultValue={Departments.selected_record.name} />
              </Form.Field>
              <Form.Field>
                <label className='text-[#000000de]'>Departmanlar</label>
                <Dropdown
                  placeholder='Departmanlar'
                  clearable
                  search
                  fluid
                  multiple
                  selection
                  value={this.state.selecteddepartments}
                  options={Departmentoptions}
                  onChange={this.handleChange} />
              </Form.Field>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Cases">
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

    const { EditCases, history, fillCasenotification, Departments, Cases } = this.props
    const { list } = Departments
    const pushData = { ...Cases.selected_record }
    const data = formToObject(e.target)
    data.departments = this.state.selecteddepartments.map(department => {
      return list.find(u => u.concurrencyStamp === department)
    })

    let errors = []
    if (!data.name || data.name == '') {
      errors.push({ type: 'Error', code: 'Durumlar', description: 'İsim Boş Olamaz' })
    }
    if (!data.departments || data.departments.length <= 0) {
      errors.push({ type: 'Error', code: 'Durumlar', description: 'Hiç Bir Departman seçili değil' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillCasenotification(error)
      })
    } else {
      pushData.name = data.name
      pushData.departments = data.departments
      EditCases(pushData, history)
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }
}
