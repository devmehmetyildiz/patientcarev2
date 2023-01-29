import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import PurchaseordersList from './PurchaseordersList'
import Notification from '../../Utils/Notification'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'

export default class Purchaseorders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openComplete: false,
      selectedrecord: {},
      expandedRow: []
    }
  }

  componentDidMount() {
    const { GetPurchaseorders, GetPurchaseorderstocks } = this.props
    GetPurchaseorders()
    GetPurchaseorderstocks()
  }

  render() {

    const Columns = [
      {
        Header: () => null,
        id: 'expander', accessor: 'expander', sortable: false, canGroupBy: false, canFilter: false, filterDisable: true,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <Icon name='triangle down' /> : <Icon name='triangle right' />}
          </span>
        ),

      },
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Firma', accessor: 'company', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Satın alma numarası', accessor: 'purchasenumber', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Teslim Alan', accessor: 'personelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Teslim Eden', accessor: 'companypersonelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Siparişi açan', accessor: 'username', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Satın alma tarihi', accessor: 'purchasedate', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Durum', accessor: 'case.name', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'complete', Header: "Tamamla", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const { Purchaseorders, DeletePurchaseorders, removePurchaseordernotification, Purchaseorderstocks, removePurchaseorderstocknotification, Profile,CompletePurchaseorders } = this.props
    const { list, isLoading, isDispatching } = Purchaseorders

    Notification(Purchaseorders.notifications, removePurchaseordernotification)
    Notification(Purchaseorderstocks.notifications, removePurchaseorderstocknotification)

    const metaKey = "Purchaseorders"
    let tableMeta = (Profile.tablemeta || []).find(u => u.meta === metaKey)
    const initialConfig = {
      hiddenColumns: tableMeta ? JSON.parse(tableMeta.config).filter(u => u.isVisible === false).map(item => {
        return item.key
      }) : [],
      columnOrder: tableMeta ? JSON.parse(tableMeta.config).sort((a, b) => a.order - b.order).map(item => {
        return item.key
      }) : []
    };

    (list || []).forEach(item => {
      item.complete = <Icon link size='large' color='red' name='check square' onClick={() => { this.setState({ selectedrecord: item, openComplete: true }) }} />
      item.edit = <Link to={`/Purchaseorders/${item.concurrencyStamp}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>
      item.delete = <Icon link size='large' color='red' name='alternate trash' onClick={() => { this.setState({ selectedrecord: item, open: true }) }} />
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
                      <Link to={"/Purchaseorders"}>
                        <Breadcrumb.Section>Satın Alma Siparişleri</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                  <GridColumn width={8} >
                    <Link to={"/Purchaseorders/Create"}>
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
                <PurchaseordersList
                  Data={list}
                  Columns={Columns}
                  initialConfig={initialConfig}
                />
              </div> : <NoDataScreen message="Açık sipariş bulunamadı" />
            }
          </div>
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}
          >
            <Modal.Header>Satın Alma Siparişi Silme</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord.purchasenumber} ` : null} </span>
                  siparişini silmek istediğinize emin misiniz?
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
                  DeletePurchaseorders(this.state.selectedrecord)
                  this.setState({ open: false, selectedrecord: {} })
                }}
                positive
              />
            </Modal.Actions>
          </Modal>
          <Modal
            onClose={() => this.setState({ openComplete: false })}
            onOpen={() => this.setState({ openComplete: true })}
            open={this.state.openComplete}
          >
            <Modal.Header>Satın Alma Siparişi Tamamlama</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord.purchasenumber} ` : null} </span>
                  siparişini tamamlamak istediğinize emin misiniz?
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='black' onClick={() => this.setState({ open: false, selectedrecord: {} })}>
                Vazgeç
              </Button>
              <Button
                content="Tamamla"
                labelPosition='right'
                icon='checkmark'
                onClick={() => {
                  CompletePurchaseorders(this.state.selectedrecord)
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

  handleRowExpender = (newvalue) => {
    this.setState({ expandedRow: newvalue })
  }

}