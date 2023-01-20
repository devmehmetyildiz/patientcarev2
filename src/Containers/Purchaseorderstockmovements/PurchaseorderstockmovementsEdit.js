import { connect } from 'react-redux'
import PurchaseorderstockmovementsEdit from '../../Pages/Purchaseorderstockmovements/PurchaseorderstockmovementsEdit'
import { EditPurchaseorderstockmovements, GetPurchaseorderstockmovement, RemoveSelectedPurchaseorderstockmovement, removePurchaseorderstockmovementnotification, fillPurchaseorderstockmovementnotification } from '../../Redux/Actions/PurchaseorderstockmovementAction'


const mapStateToProps = (state) => ({
    Purchaseorderstockmovements: state.Purchaseorderstockmovements
})

const mapDispatchToProps = {
    EditPurchaseorderstockmovements, GetPurchaseorderstockmovement, RemoveSelectedPurchaseorderstockmovement,
    removePurchaseorderstockmovementnotification, fillPurchaseorderstockmovementnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseorderstockmovementsEdit)