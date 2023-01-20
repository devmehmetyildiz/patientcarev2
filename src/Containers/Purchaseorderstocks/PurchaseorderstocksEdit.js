import { connect } from 'react-redux'
import PurchaseorderstocksEdit from '../Purchaseorderstocks/PurchaseorderstocksEdit'
import { EditPurchaseorderstocks, GetPurchaseorderstock, RemoveSelectedPurchaseorderstock, removePurchaseorderstocknotification, fillPurchaseorderstocknotification } from '../../Redux/Actions/PurchaseorderstockAction'


const mapStateToProps = (state) => ({
    Purchaseorderstocks: state.Purchaseorderstocks
})

const mapDispatchToProps = {
    EditPurchaseorderstocks, GetPurchaseorderstock, RemoveSelectedPurchaseorderstock, removePurchaseorderstocknotification, fillPurchaseorderstocknotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseorderstocksEdit)