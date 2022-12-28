import React from 'react'
import { connect } from 'react-redux'
import Layout from "../../Pages/Layout/Layout"
import { GetActiveUser, GetUserRoles,logOut } from "../../Redux/Actions/ProfileAction"

const mapStateToProps = (state) => ({
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetActiveUser, GetUserRoles,logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)