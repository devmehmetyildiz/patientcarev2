import { connect } from 'react-redux'
import Purchaseorders from '../../Pages/Purchaseorders/Purchaseorders'
import { GetPurchaseorders, removePurchaseordernotification, DeletePurchaseorders } from "../../Redux/Actions/PurchaseorderAction"
import {GetStocks,removeStocknotification } from "../../Redux/Actions/StockAction"

const mapStateToProps = (state) => ({
    Purchaseorders: state.Purchaseorders,
    Stocks:state.Stocks
})

const mapDispatchToProps = {
    GetPurchaseorders, removePurchaseordernotification, DeletePurchaseorders,
    GetStocks,removeStocknotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchaseorders)