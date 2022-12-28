import { connect } from 'react-redux'
import StocksCreate from '../../Pages/Stocks/StocksCreate'
import { AddStocks, removeStocknotification, fillStocknotification } from '../../Redux/Actions/StockAction'
import { GetStockdefines, removeStockdefinenotification } from '../../Redux/Actions/StockdefineAction'
import { GetDepartments, removeDepartmentnotification } from '../../Redux/Actions/DepartmentAction'

const mapStateToProps = (state) => ({
  Stockdefines: state.Stockdefines,
  Departments: state.Departments,
  Stocks: state.Stocks
})

const mapDispatchToProps = {
  AddStocks, removeStocknotification, fillStocknotification, GetStockdefines, removeStockdefinenotification,
  GetDepartments, removeDepartmentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(StocksCreate)