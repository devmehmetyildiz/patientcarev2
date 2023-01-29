import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import { MOVEMENTTYPES, PATIENTMOVEMENTTYPE } from '../../Utils/Constants'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Notification from '../../Utils/Notification'

export default class Patientmovements extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedrecord: {}
    }
  }

  componentDidMount() {
    const { GetPatientmovements } = this.props
    GetPatientmovements()
  }


  componentDidUpdate() {
    const { Patientmovements, removePatientmovementnotification } = this.props
    Notification(Patientmovements.notifications, removePatientmovementnotification)
  }

  render() {

    const Columns = [
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
      {
        Header: 'Hasta Adı', accessor: 'patientname', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          console.log('col: ', col);
          return  col.value
        },
      },
      {
        Header: 'Hareket Türü', accessor: 'patientmovementtype', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return PATIENTMOVEMENTTYPE.find(u => u.value === col.value) ? MOVEMENTTYPES.find(u => u.value === col.value).Name : col.value
        },
      },
      { Header: 'İptal mi?', accessor: 'isDeactive', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? "EVET" : "HAYIR" } },
      {
        Header: 'Önceki Hareket', accessor: 'oldPatientmovementtype', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return PATIENTMOVEMENTTYPE.find(u => u.value === col.value) ? MOVEMENTTYPES.find(u => u.value === col.value).Name : col.value
        },
      },
      {
        Header: 'Yeni Hareket', accessor: 'newPatientmovementtype', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return PATIENTMOVEMENTTYPE.find(u => u.value === col.value) ? MOVEMENTTYPES.find(u => u.value === col.value).Name : col.value
        },
      },
      { Header: 'Yapılacaklar Aktif mi?', accessor: 'isTodoneed', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? "EVET" : "HAYIR" } },
      { Header: 'Yapılacaklar Tamamlandı mı?', accessor: 'isTodocompleted', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? "EVET" : "HAYIR" } },
      { Header: 'Tamamlandı mı?', accessor: 'isComplated', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? "EVET" : "HAYIR" } },
      { Header: 'Aktivasyon mu bekleniyor?', accessor: 'iswaitingactivation', sortable: true, canGroupBy: true, canFilter: true, Cell: col => { return col.value ? "EVET" : "HAYIR" } },
      { Header: 'Hareket Tarihi', accessor: 'movementdate', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const { Patientmovements, DeletePatientmovements, Profile } = this.props
    const { list, isLoading, isDispatching } = Patientmovements

    const metaKey = "Patientmovements"
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
      item.edit = <Link to={`/Patientmovements/${item.concurrencyStamp}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>
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
                      <Link to={"/Patientmovements"}>
                        <Breadcrumb.Section>Hasta Hareketleri</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                  <GridColumn width={8} >
                    <Link to={"/Patientmovements/Create"}>
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
              </div> : <NoDataScreen message="Tanımlı Hasta Hareketi Yok" />
            }
          </div>
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}
          >
            <Modal.Header>Ürün Silme</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord?.patientdefine?.firstname}
                   ${this.state.selectedrecord?.patientdefine?.lastname} ` : null} </span>
                  hasta hareketini silmek istediğinize emin misiniz?
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
                  DeletePatientmovements(this.state.selectedrecord.concurrencyStamp)
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