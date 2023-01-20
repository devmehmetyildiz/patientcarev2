import { connect } from 'react-redux'
import PurchaseorderstocksCreate from '../Purchaseorderstocks/PurchaseorderstocksCreate'
import { AddPurchaseorderstocks, removePurchaseorderstocknotification, fillPurchaseorderstocknotification } from '../../Redux/Actions/PurchaseorderstockAction'
import { GetPurchaseorders, removePurchaseordernotification } from "../../Redux/Actions/PurchaseorderAction"

const mapStateToProps = (state) => ({
    Patietstocks: state.Patietstocks,
    Patients: state.Patients
})


const mapDispatchToProps = {
    AddPurchaseorderstocks, removePurchaseorderstocknotification, fillPurchaseorderstocknotification,
    GetPurchaseorders, removePurchaseordernotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseorderstocksCreate)