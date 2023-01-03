import { connect } from 'react-redux'
import StationsEdit from '../../Pages/Stations/StationsEdit'
import { EditStations, GetStation, RemoveSelectedStation, removeStationnotification, fillStationnotification } from '../../Redux/Actions/StationAction'

const mapStateToProps = (state) => ({
    Stations: state.Stations
})

const mapDispatchToProps = { EditStations, GetStation, RemoveSelectedStation, removeStationnotification, fillStationnotification }

export default connect(mapStateToProps, mapDispatchToProps)(StationsEdit)