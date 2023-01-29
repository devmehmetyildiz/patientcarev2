import { connect } from 'react-redux'
import TododefinesCreate from '../../Pages/Tododefines/TododefinesCreate'
import { AddTododefines, fillTododefinenotification, removeTododefinenotification } from '../../Redux/Actions/TododefineAction'


const mapStateToProps = (state) => ({
    Tododefines: state.Tododefines
})

const mapDispatchToProps = {
    AddTododefines, fillTododefinenotification, removeTododefinenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TododefinesCreate)