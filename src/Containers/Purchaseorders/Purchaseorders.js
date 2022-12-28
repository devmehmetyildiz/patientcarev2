import { connect } from 'react-redux'
import Purchaseorders from '../../Pages/Purchaseorders/Purchaseorders'
import { GetPurchaseorders, removePurchaseordernotification,DeletePurchaseorders } from "../../Redux/Actions/PurchaseorderAction"

const mapStateToProps = (state) => ({
    Purchaseorders: state.Purchaseorders
})

const mapDispatchToProps = {
    GetPurchaseorders, removePurchaseordernotification,DeletePurchaseorders
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchaseorders)