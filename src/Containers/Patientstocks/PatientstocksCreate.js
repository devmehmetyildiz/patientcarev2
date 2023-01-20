import { connect } from 'react-redux'
import PatientstocksCreate from '../../Pages/Patientstocks/PatientstocksCreate'
import { AddPatientstocks, removePatientstocknotification, fillPatientstocknotification } from '../../Redux/Actions/PatientstockAction'
import { GetPatients, Getpreregistrations, removePatientnotification } from "../../Redux/Actions/PatientAction"

const mapStateToProps = (state) => ({
    Patietstocks: state.Patietstocks,
    Patients: state.Patients
})

const mapDispatchToProps = {
    AddPatientstocks, removePatientstocknotification, fillPatientstocknotification, GetPatients, Getpreregistrations, removePatientnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientstocksCreate)