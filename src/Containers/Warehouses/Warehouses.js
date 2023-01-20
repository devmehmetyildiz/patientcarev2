import { connect } from 'react-redux'
import Warehouses from '../../Pages/Warehouses/Warehouses'
import { GetWarehouses, removeWarehousenotification, fillWarehousenotification, DeleteWarehouses } from '../../Redux/Actions/WarehouseAction'


const mapStateToProps = (state) => ({
    Warehouses: state.Warehouses
})

const mapDispatchToProps = {
    GetWarehouses, removeWarehousenotification, fillWarehousenotification, DeleteWarehouses
}

export default connect(mapStateToProps, mapDispatchToProps)(Warehouses)