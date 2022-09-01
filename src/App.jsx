
import './App.css'
import TodoItems from './components/TodoItems'
import { Zoom} from 'react-awesome-reveal'

function App() {
  
  return (
    <>
    <Zoom triggerOnce>
    <div className="todo_title">
      <h3>Lista de Tarefas</h3>
    </div>
      <TodoItems/>
    </Zoom>
    </>
  )
}

export default App
