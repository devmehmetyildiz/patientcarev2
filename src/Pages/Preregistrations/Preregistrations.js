import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Modal, Popup } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import { ROUTES } from '../../Utils/Constants'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import PreregistrationsComplete from './PreregistrationsComplete'
import Notification from '../../Utils/Notification'

export default class Preregistrations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedrecord: {},
      stocksStatus: [],
      filesStatus: [],
    }
  }

  componentDidMount() {
    document.title = 'Ön Kayıtlar'
    const { Getpreregistrations, GetWarehouses } = this.props
    Getpreregistrations()
    GetWarehouses()
  }

  render() {

    const Columns = [
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'İsim', accessor: 'name', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.nameCellhandler(col) },
      { Header: 'TC Kimlik No', accessor: 'patientdefine.countryID', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Kayıt Tarihi', accessor: 'registerdate', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.dateCellhandler(col) },
      { Header: 'Kuruma Giriş Tarihi', accessor: 'approvaldate', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.dateCellhandler(col) },
      { Header: 'Durum', accessor: 'case.name', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Stoklar', accessor: 'stockstxt', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.stockCellhandler(col) },
      { Header: 'Dosyalar', accessor: 'filestxt', sortable: true, canGroupBy: true, canFilter: true, Cell: col => this.filesCellhandler(col) },
      { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'enter', Header: "Kuruma Al", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'actions', Header: "Eylemler", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }
    ]

    const { Patients, Warehouses, removeWarehousenotification, DeletePatients, removePatientnotification, Profile, history, fillPatientnotification, CompletePrepatients } = this.props
    const { notifications, list, isLoading, isDispatching } = Patients
    Notification(notifications, removePatientnotification)
    Notification(Warehouses.notifications, removeWarehousenotification)

    const metaKey = "Preregistrations"
    let tableMeta = (Profile.tablemeta || []).find(u => u.meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : ["concurrencyStamp", "createdUser", "updatedUser", "createTime", "updateTime"],
      columnOrder: tableMeta ? JSON.parse(tableMeta.config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : []
    };

    (list || []).forEach(item => {
      var filestext = item.files.map((file) => {
        return file.name;
      }).join(", ")
      item.filestxt = filestext;
      var stockstext = item.stocks.map((stock) => {
        return stock.stockdefine?.name;
      }).join(", ")
      item.stockstxt = stockstext;
      item.actions = <React.Fragment>
        <Popup
          trigger={<Icon className='cursor-pointer' name='ellipsis vertical' />}
          content={<div className='flex flex-col justify-start items-start w-full gap-2'>
            <Link to={`/Preregistrations/${item.concurrencyStamp}/edit`} ><Icon className='row-edit' name='edit' /> Güncelle </Link>
            <Link to={`/Patientdefines/${item.patientdefine?.concurrencyStamp}/edit`} ><Icon color='black' className='row-edit' name='clipboard' /> Tanım Düzenle</Link>
            <Link to={`/Preregistrations/${item.concurrencyStamp}/Editfile`} ><Icon color='black' className='row-edit' name='folder open' /> Dosya Düzenle</Link>
            <Link to={`/Preregistrations/${item.concurrencyStamp}/Editstock`} ><Icon color='black' className='row-edit' name='cart' /> Stok Düzenle</Link>
            <span><Icon link color='red' name='alternate trash' onClick={() => { this.setState({ selectedrecord: item, open: true }) }} /> Sil</span>
          </div>}
          on='click'
          hideOnScroll
          position='left center'
        />
      </React.Fragment>
      item.enter = <React.Fragment>
        <PreregistrationsComplete Warehouseslist={Warehouses.list} data={item} history={history} CompletePrepatients={CompletePrepatients} fillPatientnotification={fillPatientnotification} removePatientnotification={removePatientnotification} />
      </React.Fragment>
    })
    return (
      isLoading || isDispatching ? <LoadingPage /> :
        <React.Fragment>
          <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
            <div className='w-full mx-auto align-middle'>
              <Header style={{ backgroundColor: 'transparent', border: 'none' }} as='h1' attached='top' >
                <Grid columns='2' >
                  <GridColumn width={8} className="">
                    <Breadcrumb size='big'>
                      <Link to={"/Preregistrations"}>
                        <Breadcrumb.Section>Ön Kayıtlar</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                  <GridColumn width={8} >
                    <Link to={"/Preregistrations/Create"}>
                      <Button color='blue' floated='right' className='list-right-green-button'>
                        Oluştur
                      </Button>
                    </Link>
                    <ColumnChooser meta={Profile.tablemeta} columns={Columns} metaKey={metaKey} />
                  </GridColumn>
                </Grid>
              </Header>
            </div>
            <Divider className='w-full  h-[1px]' />
            {list.length > 0 ?
              <div className='w-full mx-auto '>
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message="Ön Kayıtlı Hasta Yok" />
            }
          </div>
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}
          >
            <Modal.Header>Ön Kayıtlı Hasta Silme</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord?.patientdefine?.firstname} ${this.state.selectedrecord?.patientdefine?.lastname}` : null} </span>
                  Ön kayıtlı Hastasını istediğinize emin misiniz?
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.setState({ open: false, selectedrecord: {} })}>
                Vazgeç
              </Button>
              <Button
                content="Sil"
                labelPosition='right'
                icon='checkmark'
                onClick={() => {
                  let data = this.state.selectedrecord
                  delete data.filestxt
                  delete data.stockstxt
                  delete data.actions
                  DeletePatients(this.state.selectedrecord)
                  this.setState({ open: false, selectedrecord: {} })
                }}
                positive
              />
            </Modal.Actions>
          </Modal>
        </React.Fragment >
    )
  }

  handleChangeModal = (value) => {
    this.setState({ modal: value })
  }

  expandStocks = (rowid) => {
    const prevData = this.state.stocksStatus
    prevData.push(rowid)
    this.setState({ stocksStatus: [...prevData] })
  }

  shrinkStocks = (rowid) => {
    const index = this.state.stocksStatus.indexOf(rowid)
    const prevData = this.state.stocksStatus
    if (index > -1) {
      prevData.splice(index, 1)
      this.setState({ stocksStatus: [...prevData] })
    }
  }
  expandFiles = (rowid) => {
    const prevData = this.state.filesStatus
    prevData.push(rowid)
    this.setState({ filesStatus: [...prevData] })
  }

  shrinkFiles = (rowid) => {
    const index = this.state.filesStatus.indexOf(rowid)
    const prevData = this.state.filesStatus
    if (index > -1) {
      prevData.splice(index, 1)
      this.setState({ filesStatus: [...prevData] })
    }
  }

  nameCellhandler = (col) => {
    const patient = col.row.original
    return <div className='flex justify-center items-center flex-row flex-nowrap whitespace-nowrap'>{patient.files.filter(u => u.usagetype === 'PP').length > 0 ? <img alt='pp' src={`${process.env.REACT_APP_BACKEND_URL}/${ROUTES.FILE}/GetImage?guid=${patient.concurrencyStamp}`} className="rounded-full" style={{ width: '40px', height: '40px' }} />
      : null}{`${patient?.patientdefine?.firstname} ${patient?.patientdefine?.lastname}`}</div>
  }

  dateCellhandler = (col) => {
    if (col.value) {
      return col.value.split('T')[0]
    }
    return null
  }

  stockCellhandler = (col) => {
    if (col.value) {
      if (!col.cell.isGrouped) {
        const itemId = col.row.original.id
        const itemStocks = col.row.original.stocks
        return col.value.length - 35 > 20 ?
          (
            !this.state.stocksStatus.includes(itemId) ?
              [col.value.slice(0, 35) + ' ...(' + itemStocks.length + ')', <Link to='#' className='showMoreOrLess' onClick={() => this.expandStocks(itemId)}> ...Daha Fazla Göster</Link>] :
              [col.value, <Link to='#' className='showMoreOrLess' onClick={() => this.shrinkStocks(itemId)}> ...Daha Az Göster</Link>]
          ) : col.value
      }
      return col.value
    }
    return null
  }

  filesCellhandler = (col) => {
    if (col.value) {
      if (!col.cell.isGrouped) {
        const itemId = col.row.original.id
        const itemFiles = col.row.original.files
        return col.value.length - 35 > 20 ?
          (
            !this.state.filesStatus.includes(itemId) ?
              [col.value.slice(0, 35) + ' ...(' + itemFiles.length + ')', <Link to='#' className='showMoreOrLess' onClick={() => this.expandFiles(itemId)}> ...Daha Fazla Göster</Link>] :
              [col.value, <Link to='#' className='showMoreOrLess' onClick={() => this.shrinkFiles(itemId)}> ...Daha Az Göster</Link>]
          ) : col.value
      }
      return col.value
    }
    return null
  }
}