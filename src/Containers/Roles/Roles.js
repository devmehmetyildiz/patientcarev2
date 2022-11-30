import React from 'react'
import { connect } from 'react-redux'
import Roles from "../../Pages/Roles/Roles"
import { GetRoles,removenotification } from "../../Redux/Actions/RoleAction"

const mapStateToProps = (state) => ({
  Roles: state.Roles
})

const mapDispatchToProps = { GetRoles,removenotification }

export default connect(mapStateToProps, mapDispatchToProps)(Roles)