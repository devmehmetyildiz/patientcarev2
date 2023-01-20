import { connect } from 'react-redux'
import PatientstockmovementsEdit from '../../Pages/Patientstockmovements/PatientstockmovementsEdit'
import { EditPatientstockmovements, GetPatientstockmovement, RemoveSelectedPatientstockmovement, removePatientstockmovementnotification, fillPatientstockmovementnotification } from '../../Redux/Actions/PatientstockmovementAction'

const mapStateToProps = (state) => ({
    Patientstockmovements: state.Patientstockmovements,
})

const mapDispatchToProps = {
    EditPatientstockmovements, GetPatientstockmovement, RemoveSelectedPatientstockmovement, removePatientstockmovementnotification, fillPatientstockmovementnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientstockmovementsEdit)