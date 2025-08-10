import './App.css';
import ToDoList from './Componant/ToDoList'
import { ToastProvider } from './Context/ToastContext';
import { TodosProvider } from './Context/TodosContext';

function App() {

  return (
    <TodosProvider>

      <ToastProvider>

        <div className="App" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <ToDoList />

        </div>

      </ToastProvider>

    </TodosProvider>
  );
}

export default App;
