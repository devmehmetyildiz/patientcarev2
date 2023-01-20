import { connect } from 'react-redux'
import Purchaseorderstockmovements from '../../Pages/Purchaseorderstockmovements/Purchaseorderstockmovements'
import {
    GetPurchaseorderstockmovements, removePurchaseorderstockmovementnotification,
    fillPurchaseorderstockmovementnotification, DeletePurchaseorderstockmovements
} from '../../Redux/Actions/PurchaseorderstockmovementAction'


const mapStateToProps = (state) => ({
    Purchaseorderstockmovements: state.Purchaseorderstockmovements,
})

const mapDispatchToProps = {
    GetPurchaseorderstockmovements, removePurchaseorderstockmovementnotification, fillPurchaseorderstockmovementnotification, DeletePurchaseorderstockmovements,
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchaseorderstockmovements)