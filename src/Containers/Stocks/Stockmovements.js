import { connect } from 'react-redux'
import Stockmovements from "../../Pages/Stocks/Stockmovements"
import { GetStockmovements, fillStockmovementnotification, removeStockmovementnotification } from '../../Redux/Actions/StockmovementAction'

const mapStateToProps = (state) => ({
  Stockmovements: state.Stockmovements
})

const mapDispatchToProps = { GetStockmovements, fillStockmovementnotification, removeStockmovementnotification }

export default connect(mapStateToProps, mapDispatchToProps)(Stockmovements)