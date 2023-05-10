import React from 'react'
import { connect } from 'react-redux'
import PrinttemplatesEdit from '../../Pages/Printtemplates/PrinttemplatesEdit'
import { GetDepartments, removeDepartmentnotification } from '../../Redux/Actions/DepartmentAction'
import { GetPrinttemplate, EditPrinttemplates, fillPrinttemplatenotification, removePrinttemplatenotification } from '../../Redux/Actions/PrinttemplateAction'

const mapStateToProps = (state) => ({
    Departments: state.Departments,
    Printtemplates: state.Printtemplates
})

const mapDispatchToProps = {
    GetPrinttemplate, GetDepartments, removeDepartmentnotification, EditPrinttemplates, fillPrinttemplatenotification, removePrinttemplatenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PrinttemplatesEdit)