import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title) {
      const newTodo = {
        id: Date.now(),
        title,
      };
      dispatch(addTodo(newTodo));
      setTitle('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une tâche</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la tâche"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonLabel}>Ajouter</Text>
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
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '30px 30px 51px #a1a1a1,-30px -30px 51px #ffffff;'
  },
  addButtonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default AddTodoScreen;
