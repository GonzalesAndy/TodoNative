import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/actions';
import NeumorphismStyles from '../NeumorphismStyles';

const AddTodoScreen = ({navigation}) => {
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
    <View style={NeumorphismStyles.container}>
      <Text style={{fontSize: 24, marginVertical: 20}}>Ajouter une tâche</Text>
      <View
        style={[
          NeumorphismStyles.neuContainer,
          NeumorphismStyles.innerShadow,
          {width: '90%', marginBottom: 20},
        ]}
      >
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la tâche"
          style={{paddingHorizontal: 20, width: '100%'}}
        />
      </View>
      <TouchableOpacity
        style={[
          NeumorphismStyles.neuContainer,
          NeumorphismStyles.innerShadow,
          {width: 150, height: 50, justifyContent: 'center'},
        ]}
        onPress={handleAddTodo}
      >
        <Text>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;
