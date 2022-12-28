import React from 'react'
import { connect } from 'react-redux'
import PasswordChange from '../../Pages/Auth/PasswordChange'
import { ChangePassword } from "../../Redux/Actions/ProfileAction"


const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = {
    ChangePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)