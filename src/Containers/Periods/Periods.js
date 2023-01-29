import { connect } from 'react-redux'
import Periods from '../../Pages/Periods/Periods'
import { GetPeriods, removePeriodnotification } from '../../Redux/Actions/PeriodAction'

const mapStateToProps = (state) => ({
    Periods: state.Periods,
    Profile: state.Profile
})

const mapDispatchToProps = { GetPeriods, removePeriodnotification }

export default connect(mapStateToProps, mapDispatchToProps)(Periods)