import { TodoListView } from './Presentation/Todo/TodoList/TodoListView';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='container'>
      <ToastContainer/>
      <TodoListView/>
    </div>
  );
}

export default App;
