import React from 'react'
import { connect } from 'react-redux'
import { AddRoles, GetAuthories, GetAuthorygroups, removenotification, fillnotification } from "../../Redux/Actions/RoleAction"
import RolesCreate from '../../Pages/Roles/RolesCreate'

const mapStateToProps = (state) => ({
    Roles: state.Roles
})

const mapDispatchToProps = { AddRoles, GetAuthories, GetAuthorygroups, removenotification, fillnotification }

export default connect(mapStateToProps, mapDispatchToProps)(RolesCreate)