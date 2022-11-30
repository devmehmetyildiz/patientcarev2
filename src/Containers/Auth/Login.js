import React from 'react'
import { connect } from 'react-redux'
import Login from "../../Pages/Auth/Login"
import { logIn, logOut, removenotification, fillnotification } from "../../Redux/Actions/ProfileAction"

const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = { logIn, logOut, removenotification, fillnotification }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
