import { connect } from 'react-redux'
import Purchaseorderstocks from '../../Pages/Purchaseorderstocks/Purchaseorderstocks'
import { GetPurchaseorders, removePurchaseordernotification, fillPurchaseordernotification, DeletePurchaseorders } from '../../Redux/Actions/PurchaseorderstockAction'



const mapStateToProps = (state) => ({
    Purchaseorderstocks: state.Purchaseorderstocks
})

const mapDispatchToProps = {
    GetPurchaseorders, removePurchaseordernotification, fillPurchaseordernotification, DeletePurchaseorders
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchaseorderstocks)