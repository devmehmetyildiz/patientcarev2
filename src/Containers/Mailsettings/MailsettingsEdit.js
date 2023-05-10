import { connect } from 'react-redux'
import MailsettingsEdit from '../../Pages/Mailsettings/MailsettingsEdit'
import { GetMailsetting, EditMailsettings, fillMailsettingnotification, removeMailsettingnotification } from "../../Redux/Actions/MailsettingAction"


const mapStateToProps = (state) => ({
    Mailsettings: state.Mailsettings
})

const mapDispatchToProps = {
    GetMailsetting, EditMailsettings, fillMailsettingnotification, removeMailsettingnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(MailsettingsEdit)