import { connect } from 'react-redux'
import PatientstockmovementsCreate from '../../Pages/Patientstockmovements/PatientstockmovementsCreate'
import { AddPatientstockmovements, removePatientstockmovementnotification, fillPatientstockmovementnotification } from '../../Redux/Actions/PatientstockmovementAction'
import { GetPatientstocks, removePatientstocknotification } from '../../Redux/Actions/PatientstockAction'

const mapStateToProps = (state) => ({
    Patientstockmovements: state.Patientstockmovements,
    Patietstocks: state.Patietstocks
})


const mapDispatchToProps = {
    AddPatientstockmovements, removePatientstockmovementnotification, fillPatientstockmovementnotification,
    GetPatientstocks, removePatientstocknotification
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientstockmovementsCreate)