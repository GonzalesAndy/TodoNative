import AsyncStorage from '@react-native-async-storage/async-storage';
//import data from '../data.json';
import axios from 'axios';

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
    const storedTodos = JSON.parse(await AsyncStorage.getItem('todos'));
  
    if (storedTodos && storedTodos.length > 0) {
      // If there are saved todos in AsyncStorage, load them
      dispatch({
        type: LOAD_TODOS,
        payload: storedTodos,
      });
    } else {
      // If there are no saved todos in AsyncStorage, fetch the data from an API and store it in AsyncStorage
      try {
        const response = await axios.get('https://raw.githubusercontent.com/GonzalesAndy/TodoNative/main/data.json?token=GHSAT0AAAAAAB47VFKYK44VMIHF4JZDCT7AZBNV2NQ');
        const fetchedTodos = response.data.todos;
  
        dispatch({
          type: LOAD_TODOS,
          payload: fetchedTodos,
        });
  
        await AsyncStorage.setItem('todos', JSON.stringify(fetchedTodos));
      } catch (error) {
        console.log(error);
      }
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
  