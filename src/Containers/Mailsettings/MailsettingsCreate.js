import { connect } from 'react-redux'
import MailsettingsCreate from '../../Pages/Mailsettings/MailsettingsCreate'
import { AddMailsettings, fillMailsettingnotification, removeMailsettingnotification } from "../../Redux/Actions/MailsettingAction"


const mapStateToProps = (state) => ({
    Mailsettings: state.Mailsettings,
    Profile: state.Profile
})

const mapDispatchToProps = {
    AddMailsettings, fillMailsettingnotification, removeMailsettingnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(MailsettingsCreate)