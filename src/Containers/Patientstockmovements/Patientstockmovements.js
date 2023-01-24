import React from 'react'
import { connect } from 'react-redux'
import Patientstockmovements from '../../Pages/Patientstockmovements/Patientstockmovements'
import { GetPatientstockmovements, removePatientstockmovementnotification, fillPatientstockmovementnotification, DeletePatientstockmovements } from '../../Redux/Actions/PatientstockmovementAction'


const mapStateToProps = (state) => ({
    Patientstockmovements: state.Patientstockmovements,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetPatientstockmovements, removePatientstockmovementnotification, fillPatientstockmovementnotification, DeletePatientstockmovements
}

export default connect(mapStateToProps, mapDispatchToProps)(Patientstockmovements)