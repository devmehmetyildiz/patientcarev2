import React from 'react'
import { connect } from 'react-redux'
import Patients from '../../Pages/Patients/Patients'
import { GetPatients, removePatientnotification } from "../../Redux/Actions/PatientAction"


const mapStateToProps = (state) => ({
  Patients: state.Patients,
  Profile: state.Profile
})

const mapDispatchToProps = {
  GetPatients, removePatientnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)