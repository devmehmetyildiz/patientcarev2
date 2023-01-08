import React from 'react'
import { connect } from 'react-redux'
import Preregistrations from "../../Pages/Preregistrations/Preregistrations"
import { Getpreregistrations, removePatientnotification,DeletePatients } from "../../Redux/Actions/PatientAction"

const mapStateToProps = (state) => ({
  Patients: state.Patients
})

const mapDispatchToProps = { Getpreregistrations, removePatientnotification,DeletePatients }

export default connect(mapStateToProps, mapDispatchToProps)(Preregistrations)