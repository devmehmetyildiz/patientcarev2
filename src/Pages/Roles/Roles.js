import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Divider, Icon } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import Popup from '../../Utils/Popup'

export class Roles extends Component {

  constructor(props) {
    super(props)
    const authoriesStatus = []
    this.state = {
      authoriesStatus
    }
  }

  componentDidMount() {
    const { GetRoles } = this.props
    GetRoles()
  }

  render() {

    const Columns = [
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'İsim', accessor: 'name', sortable: true, canGroupBy: true, canFilter: true },
      {
        Header: 'Yetkiler', accessor: 'authoriestxt', sortable: true, canGroupBy: true, canFilter: true, isOpen: false,
        Cell: col => {
          if (col.value) {
            if (!col.cell.isGrouped) {
              console.log('col.row: ', col.row);
              const itemId = col.row.original.id
              const itemPrivileges = col.row.original.authories
              return col.value.length - 35 > 20 ?
                (
                  !this.state.authoriesStatus.includes(itemId) ?
                    [col.value.slice(0, 35) + ' ...(' + itemPrivileges.length + ')', <Link to='#' className='showMoreOrLess' onClick={() => this.expandAuthory(itemId)}> ...Daha Fazla Göster</Link>] :
                    [col.value, <Link to='#' className='showMoreOrLess' onClick={() => this.shrinkAuthory(itemId)}> ...Daha Az Göster</Link>]
                ) : col.value
            }
            return col.value
          }
          return null
        },
      },
      { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
      { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
      { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]

    const initialConfig = { hiddenColumns: ['concurrencyStamp'] };

    const { Roles } = this.props
    const { notifications, list, removenotification } = Roles
    if (notifications && notifications.length > 0) {
      let msg = notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removenotification()
    }

    (list || []).map(item => {
      var text = item.authories.map((authory) => {
        return authory.name;
      }).join(", ")
      item.authoriestxt = text;
      item.edit = <Link to={`/roles/${item.concurrencyStamp}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>
      item.delete = <Icon link size='large' color='red' name='alternate trash' />
    })

    return (
      <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
        <div className='w-full mx-auto align-middle'>
          <Header style={{ backgroundColor: 'transparent', border: 'none' }} as='h1' attached='top' >
            <Grid columns='2' >
              <GridColumn width={8} className="">
                <Breadcrumb size='big'>
                  <Link to={"/Roles"}>
                    <Breadcrumb.Section>Roller</Breadcrumb.Section>
                  </Link>
                </Breadcrumb>
              </GridColumn>
              <GridColumn width={8} >
                <Link to={"Roles/Create"}>
                  <Button color='blue' floated='right' className='list-right-green-button'>
                    Oluştur
                  </Button>
                </Link>
              </GridColumn>
            </Grid>
          </Header>
        </div>
        <Divider className='w-full  h-[1px]' />
        <div className='w-full mx-auto '>
          <DataTable Columns={Columns} Data={Roles.list} Config={initialConfig} />
        </div>
      </div>
    )
  }

  expandAuthory = (rowid) => {
    const prevData = this.state.authoriesStatus
    prevData.push(rowid)
    this.setState({ authoriesStatus: [...prevData] })
  }

  shrinkAuthory = (rowid) => {
    const index = this.state.authoriesStatus.indexOf(rowid)
    const prevData = this.state.authoriesStatus
    if (index > -1) {
      prevData.splice(index, 1)
      this.setState({ authoriesStatus: [...prevData] })
    }
  }

}
export default withRouter(Roles)