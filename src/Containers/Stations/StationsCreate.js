import React from 'react'
import { connect } from 'react-redux'
import StationsCreate from '../../Pages/Stations/StationsCreate'
import { AddStations, removeStationnotification, fillStationnotification } from '../../Redux/Actions/StationAction'

const mapStateToProps = (state) => ({
    Stations: state.Stations
})

const mapDispatchToProps = { AddStations, removeStationnotification, fillStationnotification }

export default connect(mapStateToProps, mapDispatchToProps)(StationsCreate)