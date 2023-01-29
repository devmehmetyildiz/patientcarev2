import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Icon, Modal } from 'semantic-ui-react'
import { Breadcrumb, Button, Grid, GridColumn, Header } from 'semantic-ui-react'
import ColumnChooser from '../../Containers/Utils/ColumnChooser'
import DataTable from '../../Utils/DataTable'
import LoadingPage from '../../Utils/LoadingPage'
import NoDataScreen from '../../Utils/NoDataScreen'
import Popup from '../../Utils/Popup'

export default class Todogroupdefines extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedrecord: {},
            tododefineStatus: []
        }
    }


    componentDidMount() {
        const { GetTodogroupdefines, } = this.props
        GetTodogroupdefines()
    }

    render() {



        const Columns = [
            { Header: 'Id', accessor: 'id', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'Tekil ID', accessor: 'concurrencyStamp', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'İsim', accessor: 'name', sortable: true, canGroupBy: true, canFilter: true },
            {
                Header: 'Yapılacaklar', accessor: 'tododefinestxt', sortable: true, canGroupBy: true, canFilter: true, isOpen: false,
                Cell: col => {
                    if (col.value) {
                        if (!col.cell.isGrouped) {
                            const itemId = col.row.original.id
                            const itemTodos = col.row.original.todos
                            return col.value.length - 35 > 20 ?
                                (
                                    !this.state.tododefineStatus.includes(itemId) ?
                                        [col.value.slice(0, 35) + ' ...(' + itemTodos.length + ')', <Link to='#' className='showMoreOrLess' onClick={() => this.expandTodos(itemId)}> ...Daha Fazla Göster</Link>] :
                                        [col.value, <Link to='#' className='showMoreOrLess' onClick={() => this.shrinkTodos(itemId)}> ...Daha Az Göster</Link>]
                                ) : col.value
                        }
                        return col.value
                    }
                    return null
                },
            },
            { Header: 'Geçerli Departman', accessor: 'department.name', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'Oluşturan Kullanıcı', accessor: 'createdUser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'Güncelleyen Kullanıcı', accessor: 'updatedUser', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'Oluşturma Zamanı', accessor: 'createTime', sortable: true, canGroupBy: true, canFilter: true, },
            { Header: 'Güncelleme Zamanı', accessor: 'updateTime', sortable: true, canGroupBy: true, canFilter: true, },
            { accessor: 'edit', Header: "Güncelle", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' },
            { accessor: 'delete', Header: "Sil", canGroupBy: false, canFilter: false, disableFilters: true, sortable: false, className: 'text-center action-column' }]


        const { Todogroupdefines, removeTodogroupdefinenotification, DeleteTodogroupdefines, Profile } = this.props
        const { notifications, list, isLoading, isDispatching } = Todogroupdefines

        if (notifications && notifications.length > 0) {
            let msg = notifications[0]
            Popup(msg.type, msg.code, msg.description)
            removeTodogroupdefinenotification()
        }
        const metaKey = "Todogroupdefines"
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
            var text = item.todos.map((todo) => {
                return todo.name;
            }).join(", ")
            item.tododefinestxt = text;
            item.edit = <Link to={`/Todogroupdefines/${item.concurrencyStamp}/edit`} ><Icon size='large' className='row-edit' name='edit' /></Link>
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
                                            <Link to={"/Todogroupdefines"}>
                                                <Breadcrumb.Section>Yapılacaklar Grupları</Breadcrumb.Section>
                                            </Link>
                                        </Breadcrumb>
                                    </GridColumn>
                                    <GridColumn width={8} >
                                        <Link to={"/Todogroupdefines/Create"}>
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
                            </div> : <NoDataScreen message="Tanımlı Yapılacaklar Grubu Yok" />
                        }
                    </div>
                    <Modal
                        onClose={() => this.setState({ open: false })}
                        onOpen={() => this.setState({ open: true })}
                        open={this.state.open}
                    >
                        <Modal.Header>Yapılacaklar Grubu Silme</Modal.Header>
                        <Modal.Content image>
                            <Modal.Description>
                                <p>
                                    <span className='font-bold'>{Object.keys(this.state.selectedrecord).length > 0 ? `${this.state.selectedrecord.name} ` : null} </span>
                                    yapılacaklar grubunu silmek istediğinize emin misiniz?
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
                                    DeleteTodogroupdefines(this.state.selectedrecord)
                                    this.setState({ open: false, selectedrecord: {} })
                                }}
                                positive
                            />
                        </Modal.Actions>
                    </Modal>
                </React.Fragment>
        )
    }

    expandTodos = (rowid) => {
        const prevData = this.state.tododefineStatus
        prevData.push(rowid)
        this.setState({ tododefineStatus: [...prevData] })
    }

    shrinkTodos = (rowid) => {
        const index = this.state.tododefineStatus.indexOf(rowid)
        const prevData = this.state.tododefineStatus
        if (index > -1) {
            prevData.splice(index, 1)
            this.setState({ tododefineStatus: [...prevData] })
        }
    }

}