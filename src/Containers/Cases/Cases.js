import { connect } from 'react-redux'
import Cases from "../../Pages/Cases/Cases"
import { GetCases, DeleteCases, removeCasenotification, fillCasenotification } from "../../Redux/Actions/CaseAction"
 
const mapStateToProps = (state) => ({
  Cases: state.Cases
})

const mapDispatchToProps = { GetCases, DeleteCases, removeCasenotification, fillCasenotification }

export default connect(mapStateToProps, mapDispatchToProps)(Cases)