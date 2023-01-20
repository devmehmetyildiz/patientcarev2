import { connect } from 'react-redux'
import PatientstocksEdit from '../../Pages/Patientstocks/PatientstocksEdit'
import { EditPatientstocks, GetPatientstock, RemoveSelectedPatientstock, removePatientstocknotification, fillPatientstocknotification } from '../../Redux/Actions/PatientstockAction'


const mapStateToProps = (state) => ({
    Patientstocks: state.Patientstocks
})

const mapDispatchToProps = {
    EditPatientstocks, GetPatientstock, RemoveSelectedPatientstock, removePatientstocknotification, fillPatientstocknotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientstocksEdit)