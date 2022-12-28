import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Icon, Loader, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import Popup from '../../Utils/Popup'
import DeleteModal from "../../Utils/DeleteModal"
import NoDataScreen from '../../Utils/NoDataScreen'

export class Files extends Component {

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
    const { GetFiles } = this.props
    GetFiles()
  }

  render() {

    const Columns = [
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Üst ID', accessor: 'parentid', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Dosya Adı', accessor: 'name', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Temel Ad', accessor: 'filename', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Dosya Klasör', accessor: 'filefolder', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Dosya Dizin', accessor: 'filepath', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Dosya türü', accessor: 'filetype', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Kullanım türü', accessor: 'usagetype', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]
    const initialConfig = { hiddenColumns: ['concurrencyStamp'] };

    const { Files, DeleteFiles, removeFilenotification } = this.props
    const { notifications, list, isLoading, isDispatching } = Files
    if (notifications && notifications.length > 0) {
      let msg = notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeFilenotification()
    }

    (list || []).map(item => {
      item.edit = <Link to={`/Files/${item.concurrencyStamp}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>
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
                      <Link to={"/Files"}>
                        <Breadcrumb.Section>Dosyalar</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                  <GridColumn width={8} >
                    <Link to={"Files/Create"}>
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
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message="Tanımlı Dosya Yok" />
            }
          </div>
          <Modal
            onClose={() => this.setState({ open: false })}
            onOpen={() => this.setState({ open: true })}
            open={this.state.open}
          >
            <Modal.Header>Dosya Silme</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <p>
                  <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord.name} ` : null} </span>
                  Dosyasını silmek istediğinize emin misiniz?
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
                  DeleteFiles(this.state.selectedrecord)
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
export default Files