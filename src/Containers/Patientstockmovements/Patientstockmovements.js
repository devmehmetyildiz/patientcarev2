import React from 'react'
import { connect } from 'react-redux'
import Patientstockmovements from '../../Pages/Patientstockmovements/Patientstockmovements'
import { GetPatientstockmovement, removePatientstockmovementnotification, fillPatientstockmovementnotification, DeletePatientstockmovements } from '../../Redux/Actions/PatientstockmovementAction'


const mapStateToProps = (state) => ({
    Patietstockmovements: state.Patientstockmovements,
    Profile: state.Profile
})

const mapDispatchToProps = {
    GetPatientstockmovement, removePatientstockmovementnotification, fillPatientstockmovementnotification, DeletePatientstockmovements
}

export default connect(mapStateToProps, mapDispatchToProps)(Patientstockmovements)