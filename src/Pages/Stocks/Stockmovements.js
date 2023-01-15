import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Loader, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import Popup from '../../Utils/Popup'
import DeleteModal from "../../Utils/DeleteModal"
import NoDataScreen from '../../Utils/NoDataScreen'
import { MOVEMENTTYPES } from '../../Utils/Constants'

export default class Stockmovements extends Component {


  componentDidMount() {
    const { GetStockmovements } = this.props
    GetStockmovements()
  }

  render() {

    const Columns = [
      { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Ürün', accessor: 'stock.stockdefine.name', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Departman', accessor: 'stock.department.name', sortable: true, canGroupBy: true, canFilter: true, },
      { Header: 'Kullanıcı', accessor: 'username', sortable: true, canGroupBy: true, canFilter: true },
      { Header: 'Hareket Zamanı', accessor: 'movementdate', sortable: true, canGroupBy: true, canFilter: true },
      {
        Header: 'Hareket Türü', accessor: 'movementtype', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return MOVEMENTTYPES.find(u => u.value === col.value) ? MOVEMENTTYPES.find(u => u.value === col.value).Name : col.value
        },
      },
      {
        Header: 'Hareket Miktarı', accessor: 'amount', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return <p>{`${col.value}  ${col.row.original.stock.stockdefine.unit.name}`}</p>
        },
      },
      {
        Header: 'Önceki Değer', accessor: 'prevvalue', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return <p>{`${col.value}  ${col.row.original.stock.stockdefine.unit.name}`}</p>
        },
      },
      {
        Header: 'Yeni Değer', accessor: 'newvalue', sortable: true, canGroupBy: true, canFilter: true,
        Cell: col => {
          return <p>{`${col.value}  ${col.row.original.stock.stockdefine.unit.name}`}</p>
        },
      },
      { accessor: 'watch', Header: "Hareket İzle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
    ]

   

    const initialConfig = {};

    const { Stockmovements, removeStockmovementnotification } = this.props
    const { notifications, list, isLoading, isDispatching } = Stockmovements
    if (notifications && notifications.length > 0) {
      let msg = notifications[0]
      Popup(msg.type, msg.code, msg.description)
      removeStockmovementnotification()
    }

    (list || []).map(item => {
      console.log('item: ', item);
      item.watch = <Link to={`/Stockmovement/${item.stock.concurrencyStamp}`} ><Icon link size='large' className='text-[#7ec5bf] hover:text-[#5bbdb5]' name='sitemap' /></Link>
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
                      <Link to={"/Stockmovements"}>
                        <Breadcrumb.Section>Stok Hareketleri</Breadcrumb.Section>
                      </Link>
                    </Breadcrumb>
                  </GridColumn>
                </Grid>
              </Header>
            </div>
            <Divider className='w-full  h-[1px]' />
            {list.length > 0 ?
              <div className='w-full mx-auto '>
                <DataTable Columns={Columns} Data={list} Config={initialConfig} />
              </div> : <NoDataScreen message="Stok Hareketi Yok" />
            }
          </div>
        </React.Fragment >
    )
  }
}
