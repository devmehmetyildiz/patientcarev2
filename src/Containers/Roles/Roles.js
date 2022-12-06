import React from 'react'
import { connect } from 'react-redux'
import Roles from "../../Pages/Roles/Roles"
import { GetRoles,removeRolenotification ,DeleteRoles} from "../../Redux/Actions/RoleAction"

const mapStateToProps = (state) => ({
  Roles: state.Roles
})

const mapDispatchToProps = { GetRoles,removeRolenotification,DeleteRoles }

export default connect(mapStateToProps, mapDispatchToProps)(Roles)