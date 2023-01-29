import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Dropdown, Form } from 'semantic-ui-react'
import { Breadcrumb, Button, Header } from 'semantic-ui-react'
import formToObject from 'form-to-object'
import Popuputil from '../../Utils/Popup'
import LoadingPage from '../../Utils/LoadingPage'

export default class PurchaseorderstocksEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selecteddepartments: "",
      selectedstockdefine: "",
      selectedpurchaseorder: "",
      open: false
    }
  }


  componentDidMount() {
    const { GetPurchaseorderstock, GetPurchaseorders, match, history, GetDepartments, GetStockdefines } = this.props
    if (match.params.PurchaseorderstockID) {
      GetPurchaseorderstock(match.params.PurchaseorderstockID)
      GetDepartments()
      GetStockdefines()
      GetPurchaseorders()
    } else {
      history.push("/Purchaseorderstocks")
    }
  }

  componentDidUpdate() {
    const { Departments, Stockdefines, Purchaseorderstocks, Purchaseorders } = this.props
    const { selected_record, isLoading } = Purchaseorderstocks
    if (selected_record && Object.keys(selected_record).length > 0 && selected_record.id !== 0
      && Departments.list.length > 0 && !Departments.isLoading
      && Purchaseorders.list.length > 0 && !Purchaseorders.isLoading
      && Purchaseorderstocks.list.length > 0 && !Purchaseorderstocks.isLoading
      && Stockdefines.list.length > 0 && !Stockdefines.isLoading && !isLoading && !this.state.isDatafetched) {
      this.setState({
        selecteddepartments: selected_record.departmentid,
        selectedstockdefine: selected_record.stockdefineID,
        selectedpurchaseorder: selected_record.purchaseorderID,
        isDatafetched: true
      })
    }
  }

  render() {
    const { Purchaseorderstocks, Purchaseorders, removePurchaseordernotification, removePurchaseorderstocknotification, Departments, Stockdefines, removeStockdefinenotification, removeDepartmentnotification } = this.props
    const { selected_record } = Purchaseorderstocks
    if (Purchaseorderstocks.notifications && Purchaseorderstocks.notifications.length > 0) {
      let msg = Purchaseorderstocks.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removePurchaseorderstocknotification()
    }
    if (Purchaseorders.notifications && Purchaseorders.notifications.length > 0) {
      let msg = Purchaseorders.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removePurchaseordernotification()
    }
    if (Departments.notifications && Departments.notifications.length > 0) {
      let msg = Departments.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removeDepartmentnotification()
    }
    if (Stockdefines.notifications && Stockdefines.notifications.length > 0) {
      let msg = Stockdefines.notifications[0]
      Popuputil(msg.type, msg.code, msg.description)
      removeStockdefinenotification()
    }

    const Departmentoptions = Departments.list.map(department => {
      return { key: department.concurrencyStamp, text: department.name, value: department.concurrencyStamp }
    })
    const Stockdefineoptions = Stockdefines.list.map(define => {
      return { key: define.concurrencyStamp, text: define.name, value: define.concurrencyStamp }
    })
    const Purchaseorderoptions = Purchaseorders.list.map(order => {
      return { key: order.concurrencyStamp, text: order.purchasenumber, value: order.concurrencyStamp }
    })




    return (
      Stockdefines.isLoading || Stockdefines.isDispatching || Purchaseorderstocks.isLoading || Purchaseorderstocks.isDispatching || Departments.isLoading || Departments.isDispatching ? <LoadingPage /> :
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
          <div className='w-full mx-auto align-middle'>
            <Header style={{ backgroundColor: 'transparent', border: 'none', color: '#3d3d3d' }} as='h1' attached='top' >
              <Breadcrumb size='big'>
                <Link to={"/Purchaseorderstocks"}>
                  <Breadcrumb.Section >Ürünler</Breadcrumb.Section>
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
                <Form.Field>
                  <label className='text-[#000000de]'>Sipariş</label>
                  <Dropdown placeholder='Sipariş' fluid selection options={Purchaseorderoptions} onChange={this.handleChangePurchase} value={this.state.selectedpurchaseorder} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Ürün</label>
                  <Dropdown placeholder='Ürün' fluid selection options={Stockdefineoptions} onChange={this.handleChangeStockdefine} value={this.state.selectedstockdefine} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label="Barkod No" placeholder="Barkod No" name="barcodeno" fluid defaultValue={selected_record.barcodeno} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input label="Skt" placeholder="Skt" name="skt" fluid type='date' defaultValue={this.getLocalDate(selected_record.skt)} />
                </Form.Field>
                <Form.Field>
                  <label className='text-[#000000de]'>Departmanlar</label>
                  <Dropdown placeholder='Departmanlar' fluid selection options={Departmentoptions} onChange={this.handleChangeDepartment} value={this.state.selecteddepartments} />
                </Form.Field>
              </Form.Group>
              <div className='flex flex-row w-full justify-between py-4  items-center'>
                <Link to="/Purchaseorderstocks">
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
    const { EditPurchaseorderstocks, history, fillPurchaseorderstocknotification, Purchaseorderstocks } = this.props
    const data = formToObject(e.target)
    data.departmentid = this.state.selecteddepartments
    data.stockdefineID = this.state.selectedstockdefine
    data.purchaseorderID = this.state.selectedpurchaseorder

    let errors = []
    if (!data.departmentid || data.departmentid === '') {
      errors.push({ type: 'Error', code: 'Ürünler', description: 'Departman Seçili Değil' })
    }
    if (!data.purchaseorderID || data.purchaseorderID === '') {
      errors.push({ type: 'Error', code: 'Ürünler', description: 'Sipariş Seçili Değil' })
    }
    if (!data.stockdefineID || data.stockdefineID === '') {
      errors.push({ type: 'Error', code: 'Ürünler', description: 'Ürün Seçili Değil' })
    }
    if (errors.length > 0) {
      errors.forEach(error => {
        fillPurchaseorderstocknotification(error)
      })
    } else {
      const response = { ...Purchaseorderstocks.selected_record, ...data }
      EditPurchaseorderstocks(response, history)
    }
  }

  handleChangeDepartment = (e, { value }) => {
    this.setState({ selecteddepartments: value })
  }

  handleChangeStockdefine = (e, { value }) => {
    this.setState({ selectedstockdefine: value })
  }
  handleChangePurchase = (e, { value }) => {
    this.setState({ selectedpurchaseorder: value })
  }

  getLocalDate = (inputdate) => {
    if (inputdate) {
      let res = inputdate.split('T')
      return res[0]
    }
  }
}