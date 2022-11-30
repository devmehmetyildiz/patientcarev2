import React from 'react'
import { connect } from 'react-redux'
import RolesEdit from '../../Pages/Roles/RolesEdit'
import { GetAuthories, GetAuthorygroups, GetRole, EditRoles, removenotification, fillnotification } from "../../Redux/Actions/RoleAction"

const mapStateToProps = (state) => ({
    Roles: state.Roles
})

const mapDispatchToProps = {
    GetAuthories, GetAuthorygroups, GetRole, EditRoles, removenotification, fillnotification
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesEdit)