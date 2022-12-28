import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Icon, Loader, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import Popup from '../../Utils/Popup'
import NoDataScreen from '../../Utils/NoDataScreen'

export default class Purchaseorders extends Component {

  constructor(props) {
    super(props)
    const open = false
    const selectedrecord = {}
    this.state = {
      open,
      selectedrecord
    }
  }

  componentDidMount() {
    const { GetPurchaseorders } = this.props
    GetPurchaseorders()
  }

  render() {

    const Columns = [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Firma', accessor: 'company', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Satın alma numarası', accessor: 'purchasenumber', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Teslim Alan', accessor: 'personelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Teslim Eden', accessor: 'companypersonelname', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Siparişi açan', accessor: 'username', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Satın alma tarihi', accessor: 'purchasedate', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Durum', accessor: 'case.name', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]
    const initialConfig = { hiddenColumns: ['concurrencyStamp'] };

    const { Purchaseorders, DeletePurchaseorders, removePurchaseordernotification } = this.props
    const { notifications, list, isLoading, isDispatching } = Purchaseorders
    if (notifications && notifications.length > 0) {
      let msg = notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removePurchaseordernotification()
    }

    (list || []).map(item => {
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
                    <Link to={"Purchaseorders/Create"}>
                      <Button color='blue' floated='right' className='list-right-green-button'>
                        Oluştur
                      </Button>
                    </Link>
                  </GridColumn>
                </Grid>
              </Header>
            </div>
            <Divider className='w-full  h-[1px]' />
            {list.length > 0 ?
              <div className='w-full mx-auto '>
                <DataTable
                  Columns={Columns}
                  Data={list}
                  Config={initialConfig}
                  renderRowSubComponent={({ row }) => (<p>merhaba dünya</p>)}
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
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord.name} ` : null} </span>
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
        </React.Fragment >
    )
  }

  handleChangeModal = (value) => {
    this.setState({ modal: value })
  }

}