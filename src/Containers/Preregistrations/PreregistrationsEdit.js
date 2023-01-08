import React from 'react'
import { connect } from 'react-redux'
import PreregistrationsEdit from "../../Pages/Preregistrations/PreregistrationsEdit"
import { GetPatient, EditPatients, fillPatientnotification, removePatientnotification } from "../../Redux/Actions/PatientAction"
import { AddFiles, removeFilenotification, fillFilenotification } from "../../Redux/Actions/FileAction"
import { GetStocks, removeStocknotification } from "../../Redux/Actions/StockAction"
import { GetDepartments, removeDepartmentnotification } from "../../Redux/Actions/DepartmentAction"
import { GetCases, removeCasenotification } from "../../Redux/Actions/CaseAction"

const mapStateToProps = (state) => ({
  Patients: state.Patients,
  Files: state.Files,
  Stocks: state.Stocks,
  Departments: state.Departments,
  Cases: state.Cases
})

const mapDispatchToProps = {
  GetPatient, EditPatients, fillPatientnotification, removePatientnotification, AddFiles, removeFilenotification, fillFilenotification,
  GetStocks, removeStocknotification, GetDepartments, removeDepartmentnotification, GetCases, removeCasenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PreregistrationsEdit)