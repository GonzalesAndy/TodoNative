import {ADD_TODO, DELETE_TODO, LOAD_TODOS, TOGGLE_TODO, MOVE_TODO} from './actions';

const initialState = {
  todos: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {...state, todos: [...state.todos, action.payload]};
    case DELETE_TODO:
      return {...state, todos: state.todos.filter((todo) => todo.id !== action.payload)};
    case LOAD_TODOS:
      return {...state, todos: action.payload};
    case TOGGLE_TODO:
        return {...state, todos: state.todos.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed}: todo),};

    case MOVE_TODO: {
        const {id, direction} = action.payload;
        const index = state.todos.findIndex((todo) => todo.id === id);
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === state.todos.length - 1)) 
        {
            return state;
        }
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newTodos = [...state.todos];
        [newTodos[index], newTodos[newIndex]] = [newTodos[newIndex], newTodos[index]];
        return {...state, todos: newTodos};
    }
      
    default:
      return state;
  }
};
