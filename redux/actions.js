import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data.json';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const LOAD_TODOS = 'LOAD_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const MOVE_TODO = 'MOVE_TODO';


export const addTodo = (todo) => async (dispatch) => {
  dispatch({
    type: ADD_TODO,
    payload: todo,
  });

  const currentTodos = JSON.parse(await AsyncStorage.getItem('todos')) || [];
  currentTodos.push(todo);
  await AsyncStorage.setItem('todos', JSON.stringify(currentTodos));
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_TODO,
    payload: id,
  });

  const currentTodos = JSON.parse(await AsyncStorage.getItem('todos')) || [];
  const newTodos = currentTodos.filter((todo) => todo.id !== id);
  await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
};

export const loadTodos = () => async (dispatch) => {
  const todos = JSON.parse(await AsyncStorage.getItem('todos')) || [];
  if(!todos || todos.length === 0) {
    dispatch({
        type: LOAD_TODOS,
        payload: data.todos,
    });
    await AsyncStorage.setItem('todos', JSON.stringify(data.todos));
  } else  {
    dispatch({
        type: LOAD_TODOS,
        payload: todos,
    });
  }
};

export const toggleTodo = (id) => async (dispatch) => {
    dispatch({
      type: TOGGLE_TODO,
      payload: id,
    });
  
    const currentTodos = JSON.parse(await AsyncStorage.getItem('todos')) || [];
    const newTodos = currentTodos.map((todo) =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
};

export const moveTodo = (id, direction) => {
    return async (dispatch, getState) => {
      const todos = getState().todos;
      const index = todos.findIndex((todo) => todo.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === todos.length - 1)
      ) {
        return;
      }
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const newTodos = [...todos];
      [newTodos[index], newTodos[newIndex]] = [newTodos[newIndex], newTodos[index]];
      dispatch({
        type: MOVE_TODO, payload: {id, direction}
       });
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos)); // Sauvegardez les nouvelles positions des tâches dans le AsyncStorage
    };
  };
  