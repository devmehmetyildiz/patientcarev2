import { connect } from 'react-redux'
import PurchaseorderstockmovementsCreate from '../../Pages/Purchaseorderstockmovements/PurchaseorderstockmovementsCreate'
import { GetPurchaseorders, removePurchaseordernotification } from '../../Redux/Actions/PurchaseorderstockAction'
import { AddPurchaseorderstockmovements, removePurchaseorderstockmovementnotification, fillPurchaseorderstockmovementnotification } from '../../Redux/Actions/PurchaseorderstockmovementAction'


const mapStateToProps = (state) => ({
    Purchaseorderstocks: state.Purchaseorderstocks,
    Purchaseorderstockmovements: state.Purchaseorderstockmovements
})

const mapDispatchToProps = {
    GetPurchaseorders, removePurchaseordernotification, AddPurchaseorderstockmovements,
    removePurchaseorderstockmovementnotification, fillPurchaseorderstockmovementnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseorderstockmovementsCreate)