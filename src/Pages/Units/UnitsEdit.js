import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Checkbox, Divider, Dropdown, Form, Header } from 'semantic-ui-react'
import Popup from '../../Utils/Popup'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
export default class UnitsEdit extends Component {

  constructor(props) {
    super(props)
    const selecteddepartments = []
    const record = {}
    const selectedstatusOption = {}
    const isDatafetched = false
    this.state = {
      selecteddepartments,
      isDatafetched,
      selectedstatusOption
    }
  }

  componentDidMount() {
    const { GetUnit, match, history, GetDepartments } = this.props
    if (match.params.UnitID) {
      GetUnit(match.params.UnitID)
      GetDepartments()
    } else {
      history.push("/Units")
    }
  }

  componentDidUpdate() {
    const { Departments, Units } = this.props
    const { selected_record, isLoading } = Units
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.id != 0 && Departments.list.length > 0 && !Departments.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selecteddepartments: selected_record.departments.map(department => {
          return department.concurrencyStamp
        }), isDatafetched: true, selectedstatusOption: selected_record.unittype
      })
    }
  }

  render() {

    const { Units, Departments, removeDepartmentnotification, removeUnitnotification } = this.props
    if (Units.notifications && Units.notifications.length > 0) {
      let msg = Units.notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeUnitnotification()
    }
    if (Departments.notifications && Departments.notifications.length > 0) {
      let msg = Departments.notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeDepartmentnotification()
    }

    const Departmentoptions = Departments.list.map(department => {
      return { key: department.concurrencyStamp, text: department.name, value: department.concurrencyStamp }
    })

    const unitstatusOption = [
      {
        key: '0',
        text: 'Number',
        value: 0,
      },
      {
        key: '1',
        text: 'String',
        value: 1,
      }
    ]

    return (
      Departments.isLoading || Departments.isDispatching || Units.isLoading || Units.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Units"}>
                  <Breadcrumb.Section >Birimler</Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section>Güncelle</Breadcrumb.Section>
              </Breadcrumb>
            </Header>
          </div>
          <Divider className='w-full  h-[1px]' />
          <div className='w-full bg-white p-4 rounded-lg shadow-md outline outline-[1px] outline-gray-200 '>
            <Form className='' onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input label="Birim Adı" placeholder="Birim Adı" name="name" fluid defaultValue={Units.selected_record.name} />
                <Form.Field>
                  <label className='text-[#000000de]'>Birim Türü</label>
                  <Dropdown placeholder='Birim Türü' fluid selection options={unitstatusOption} onChange={this.handleChangeOption} value={this.state.selectedstatusOption} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label className='text-[#000000de]'>Departmanlar</label>
                  <Dropdown
                    placeholder='Departmanlar'
                    clearable
                    search
                    fluid
                    multiple
                    value={this.state.selecteddepartments}
                    selection
                    options={Departmentoptions} onChange={this.handleChange} />
                </Form.Field>
              </Form.Group>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Units">
                  <Button floated="left" color='grey'>Geri Dön</Button>
                </Link>
                <Button floated="right" type='submit' color='blue'>Güncelle</Button>
              </div>
            </Form>
          </div>
        </div>
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { EditUnits, history, fillUnitnotification, Departments, Units } = this.props
    const { list } = Departments
    const pushData = { ...Units.selected_record }
    const data = formToObject(e.target)
    data.unittype = this.state.selectedstatusOption
    data.departments = this.state.selecteddepartments.map(department => {
      return list.find(u => u.concurrencyStamp === department)
    })

    let errors = []
    if (!data.name || data.name == '') {
      errors.push({ type: 'Error', code: 'Birimler', description: 'İsim Boş Olamaz' })
    }
    if ((Number.isNaN(data.unittype))) {
      errors.push({ type: 'Error', code: 'Birimler', description: 'Tür Seçili Değil' })
    }
    if (!data.departments || data.departments.length <= 0) {
      errors.push({ type: 'Error', code: 'Birimler', description: 'Hiç Bir Departman seçili değil' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillUnitnotification(error)
      })
    } else {
      pushData.name = data.name
      pushData.departments = data.departments
      pushData.unittype = data.unittype
      EditUnits(pushData, history)
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }

  handleChangeOption = (e, { value }) => {
    console.log('value: ', value);
    this.setState({ selectedstatusOption: value })
  }
}
