import { connect } from 'react-redux'
import ProfileEdit from '../../Pages/Auth/ProfileEdit'
import { GetUserMeta,removenotification,fillnotification } from "../../Redux/Actions/ProfileAction"
import { EditUsers,removeUsernotification } from "../../Redux/Actions/UserAction"

const mapStateToProps = (state) => ({
    Profile: state.Profile,
    Users:state.Users
})

const mapDispatchToProps = { GetUserMeta, EditUsers,removenotification,fillnotification,removeUsernotification }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)