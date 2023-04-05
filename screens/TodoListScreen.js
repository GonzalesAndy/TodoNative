import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, loadTodos, toggleTodo, moveTodo} from '../redux/actions';

const TodoListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);


  const [search, setSearch] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, todos]);

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleMoveTodo = (id, direction) => {
    dispatch(moveTodo(id, direction));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };


  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  const renderItem = ({ item }) => (
    <View style={[styles.todoItemContainer, item.completed ? styles.completedTodoItemContainer : {}]}>
      <View style={styles.todoItem}>
        <Checkbox
          style={styles.checkbox}
          value={item.completed}
          onValueChange={() => handleToggleTodo(item.id)}
          color="#d9d9d9"
        />
        <Text
          style={[
            styles.todoItemTitle,
            item.completed ? styles.completedTodoItemTitle : {},
          ]}
        >
          {item.title}
        </Text>
        <View style={styles.todoItemActions}>
          <TouchableOpacity onPress={() => handleMoveTodo(item.id, 'up')}>
            <MaterialIcons name="arrow-upward" size={24} color="#d9d9d9" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoveTodo(item.id, 'down')}>
            <MaterialIcons name="arrow-downward" size={24} color="#d9d9d9" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
            <MaterialIcons name="delete" size={24} color="#d9d9d9" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Liste des tâches ({remainingTasks} restantes)
      </Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher une tâche"
        />
        <MaterialIcons name="search" size={24} color="#d9d9d9" />
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text style={styles.addButtonLabel}>Ajouter une tâche</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#d9d9d9',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: 50,
    boxShadow: '30px 30px 51px #a1a1a1,-30px -30px 51px #ffffff;'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 20,
  },
  todoItemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    boxShadow: '30px 30px 51px #a1a1a1,-30px -30px 51px #ffffff;'
  },
  completedTodoItemContainer: {
    backgroundColor: '#e6e6e6',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoItemTitle: {
    flex: 1,
    fontSize: 18,
    color: '#333333',
    marginLeft: 10,
  },
  completedTodoItemTitle: {
    textDecorationLine: 'line-through',
  },
  todoItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
  },
  addButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '30px 30px 51px #a1a1a1,-30px -30px 51px #ffffff;'
  },
  addButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  checkbox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#d9d9d9'
  },
});
    
    

export default TodoListScreen;
