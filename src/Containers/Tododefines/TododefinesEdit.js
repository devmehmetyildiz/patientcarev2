import { connect } from 'react-redux'
import TododefinesEdit from '../../Pages/Tododefines/TododefinesEdit'
import { GetTododefine, EditTododefines, removeTododefinenotification, fillTododefinenotification } from '../../Redux/Actions/TododefineAction'


const mapStateToProps = (state) => ({
    Tododefines: state.Tododefines
})

const mapDispatchToProps = {
    GetTododefine, EditTododefines, removeTododefinenotification, fillTododefinenotification
}

export default connect(mapStateToProps, mapDispatchToProps)(TododefinesEdit)