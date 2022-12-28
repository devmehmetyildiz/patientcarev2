import { connect } from 'react-redux'
import Stockdefines from "../../Pages/Stockdefines/Stockdefines"
import { GetStockdefines, removeStockdefinenotification, fillStockdefinenotification, DeleteStockdefines } from "../../Redux/Actions/StockdefineAction"

const mapStateToProps = (state) => ({
    Stockdefines: state.Stockdefines,
})

const mapDispatchToProps = { GetStockdefines, removeStockdefinenotification, fillStockdefinenotification, DeleteStockdefines }

export default connect(mapStateToProps, mapDispatchToProps)(Stockdefines)