import { connect } from 'react-redux'
import StocksEdit from '../../Pages/Stocks/StocksEdit'
import { GetStock, EditStocks, removeStocknotification, fillStocknotification } from '../../Redux/Actions/StockAction'
import { GetStockdefines, removeStockdefinenotification } from '../../Redux/Actions/StockdefineAction'
import { GetDepartments, removeDepartmentnotification } from '../../Redux/Actions/DepartmentAction'

const mapStateToProps = (state) => ({
  Stockdefines: state.Stockdefines,
  Departments: state.Departments,
  Stocks: state.Stocks
})

const mapDispatchToProps = {
  GetStock, EditStocks, removeStocknotification, fillStocknotification, GetStockdefines, removeStockdefinenotification,
  GetDepartments, removeDepartmentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksEdit)