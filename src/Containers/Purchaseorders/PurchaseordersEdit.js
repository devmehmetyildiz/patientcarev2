import { connect } from 'react-redux'
import PurchaseordersEdit from '../../Pages/Purchaseorders/PurchaseordersEdit'
import { EditPurchaseorders, GetPurchaseorder, fillPurchaseordernotification, removePurchaseordernotification } from "../../Redux/Actions/PurchaseorderAction"
import { GetStockdefines, removeStockdefinenotification, AddStockdefines, fillStockdefinenotification } from "../../Redux/Actions/StockdefineAction"
import { GetCases, removeCasenotification } from "../../Redux/Actions/CaseAction"
import { GetUnits, removeUnitnotification } from "../../Redux/Actions/UnitActions"
import { GetDepartments, removeDepartmentnotification } from "../../Redux/Actions/DepartmentAction"

const mapStateToProps = (state) => ({
    Purchaseorders: state.Purchaseorders,
    Stockdefines: state.Stockdefines,
    Cases: state.Cases,
    Units: state.Units,
    Departments: state.Departments
})

const mapDispatchToProps = {
    EditPurchaseorders, GetPurchaseorder, fillPurchaseordernotification, removePurchaseordernotification,
    GetStockdefines, removeStockdefinenotification, AddStockdefines, fillStockdefinenotification,
    GetCases, removeCasenotification, GetUnits, removeUnitnotification, GetDepartments, removeDepartmentnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseordersEdit)