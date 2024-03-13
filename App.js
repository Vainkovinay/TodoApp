import { useState } from 'react';
import { StyleSheet, Text, View, FlatList,ScrollView, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodoItems([...todoItems, { id: Math.random().toString(), text: todoText }]);
      setTodoText('');
    }
  };

  const deleteTodo =(id)=>{
    setTodoItems(todoItems.filter(item=>item.id !==id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput style={styles.input}placeholder='Type here' 
          onChangeText={text => setTodoText(text)}
          value={todoText}
        ></TextInput>
        <Button mode='contained' rippleColor='blue' style={styles.button}
            onPress={addTodo}>
            Add Task
          </Button>
        </View>
            <View style={styles.container2}>
          <FlatList
            data={todoItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        </View>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 3,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex:3,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingTop: 50,
  },
  input: {
    height:35,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1.5,
    textAlign:'center',
    padding: 7,
    marginTop: 20, 
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue', 
  },
  todoItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    color: 'red',
  },
});
