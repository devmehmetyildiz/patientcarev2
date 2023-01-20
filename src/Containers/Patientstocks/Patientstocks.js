import { connect } from 'react-redux'
import Patientstocks from '../../Pages/Patientstocks/Patientstocks'
import { GetPatientstock, removePatientstocknotification, fillPatientstocknotification, DeletePatientstocks } from '../../Redux/Actions/PatientstockAction'


const mapStateToProps = (state) => ({
    Patietstocks: state.Patientstocks
})

const mapDispatchToProps = {
    GetPatientstock, removePatientstocknotification, fillPatientstocknotification, DeletePatientstocks
}

export default connect(mapStateToProps, mapDispatchToProps)(Patientstocks)