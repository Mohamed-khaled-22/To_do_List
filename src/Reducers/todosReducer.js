
import { v4 as uuidv4 } from 'uuid';

export default function todosReducer(currentTodos, action) {


    switch (action.type) {
        case 'ADD_TODO':
            if (action.payload.newTaskTitle.trim() !== "") {
                const newTodo = {
                    id: uuidv4(),
                    title: action.payload.newTaskTitle,
                    details: "",
                    isCompleted: false,
                };
                const updatedTodos = [...currentTodos, newTodo];
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                return updatedTodos;
            } break;

        case 'DELETE_TODO':
            const updatedTodos = currentTodos.filter((t) => t.id !== action.payload.id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;

        case 'UPDATE_TODO':
            const { title, details } = action.payload.updatedTodo;
            if (title !== '' && action.payload.selectedTodo) {
                const updatedTodos = currentTodos.map((t) => {
                    if (t.id === action.payload.selectedTodo.id) {
                        return { ...t, title, details };
                    }
                    return t;
                });
                localStorage.setItem("todos", JSON.stringify(updatedTodos));
                return updatedTodos;
            } break;

        case 'CHECKED_TODO':

            const todosAfterToggle = currentTodos.map((t) => {
                if (t.id === action.payload.todo.id) {
                    return { ...t, isCompleted: !t.isCompleted }
                }
                return t
            });
            localStorage.setItem("todos", JSON.stringify(todosAfterToggle));
            return todosAfterToggle



        case 'INITIALIZE_TODOS':
            return action.payload;


        default: throw new Error(`Unknown action type: ${action.type}`)
    }
}