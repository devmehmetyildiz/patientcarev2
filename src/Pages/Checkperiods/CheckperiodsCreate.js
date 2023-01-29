import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Dropdown, Form } from 'semantic-ui-react'
import { Breadcrumb, Button, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import LoadingPage from '../../Utils/LoadingPage'
import Notification from '../../Utils/Notification'

export default class CheckperiodsCreate extends Component {

  constructor(props) {
    super(props)
    const selectedstations = []
    const record = {}
    this.state = {
      selectedstations
    }
  }


  componentDidMount() {
    const { GetPeriods } = this.props
    GetPeriods()
  }

  componentDidUpdate() {
    const { Periods, Checkperiods, removeCheckperiodnotification, removePeriodnotification } = this.props
    Notification(Periods.notifications, removePeriodnotification)
    Notification(Checkperiods.notifications, removeCheckperiodnotification)
  }

  render() {
    const { Checkperiods, Periods } = this.props

    const Periodoptions = Periods.list.map(period => {
      return { key: period.concurrencyStamp, text: period.name, value: period.concurrencyStamp }
    })

    const Days = [
      "PAZARTESİ",
      "SALI",
      "ÇARŞAMBA",
      "PERŞEMBE",
      "CUMA",
      "CUMARTESİ",
      "PAZAR"
    ]
    const Dayoptions = Days.map(day => {
      return { key: day, text: day, value: day }
    })

    const Periodtypeoption = [
      { key: 0, text: "", value: 0 },

    ]

    return (
      Checkperiods.isLoading || Checkperiods.isDispatching || Periods.isLoading || Periods.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Checkperiods"}>
                  <Breadcrumb.Section >Kontrol Grupları</Breadcrumb.Section>
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
                <Form.Input label="Departman Adı" placeholder="Departman Adı" name="name" fluid />
              </Form.Field>
              <Form.Field>
                <label className='text-[#000000de]'>Tanımlı İstasyonlar</label>
                <Dropdown label="İstasyonlar" placeholder='İstasyonlar' clearable search fluid multiple selection options={Stationoptions} onChange={this.handleChange} />
              </Form.Field>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Departments">
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

    const { AddDepartments, history, fillDepartmentnotification, Stations } = this.props
    const { list } = Stations
    const data = formToObject(e.target)
    data.stations = this.state.selectedstations.map(station => {
      return list.find(u => u.concurrencyStamp === station)
    })
    data.stationstxt = null
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
      errors.push({ type: 'Error', code: 'Departmanlar', description: 'İsim Boş Olamaz' })
    }
    if (!data.stations || data.stations.length <= 0) {
      errors.push({ type: 'Error', code: 'Departmanlar', description: 'Hiç Bir İstasyon seçili değil' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillDepartmentnotification(error)
      })
    } else {
      AddDepartments(data, history)
    }
  }

  handleChange = (e, { value }) => {
    this.setState({ selectedstations: value })
  }
}