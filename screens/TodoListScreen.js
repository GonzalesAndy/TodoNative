import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo} from '../redux/actions';
import NeumorphismStyles from '../NeumorphismStyles';

const TodoListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const renderItem = ({item}) => (
    <View style={[NeumorphismStyles.neuContainer, NeumorphismStyles.innerShadow]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
          <Text style={{color: 'red'}}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={NeumorphismStyles.container}>
      <Text style={{fontSize: 24, marginVertical: 20}}>Liste de tâches</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={[NeumorphismStyles.neuContainer, NeumorphismStyles.innerShadow]}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Text>Ajouter une tâche</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListScreen;
