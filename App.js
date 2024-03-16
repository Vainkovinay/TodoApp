import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

export default function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const addTodo = () => {
    if (todoText.trim() !== '') {
      setTodoItems([...todoItems, { id: Math.random().toString(), text: todoText }]);
      setTodoText('');
    }
  };

  const deleteTodo = (id) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const deleteAPI = () => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'DELETE',
    });
  }

  const apiCall = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.taskDisplay}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItemsss = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.taskDisplay}>
        {item.name}
      </Text>
      <TouchableOpacity onPress={() => deleteAPI(item.title)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput style={styles.input} placeholder='Type here'
          onChangeText={text => setTodoText(text)}
          value={todoText}
        ></TextInput>
        <Button mode='contained' rippleColor='blue' style={styles.button}
          onPress={() => {
            addTodo();
          }}>
          Add Task
        </Button>
      </View>
      <View style={styles.container2}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItemsss}
          />
        )
        }
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
    flex: 2.2,
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
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    paddingTop: 50,
  },
  input: {
    height: 35,
    width: 300,
    borderColor: 'grey',
    borderWidth: 1.5,
    textAlign: 'center',
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
    borderBottomColor: 'darkblue',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    textShadowColor: 'red',
  },
  taskDisplay: {
    fontWeight: 'bold',
    fontSize: 18,
    maxWidth: 'auto',
    color: 'black',
    width: 330,
    borderCurve: 'circular',
  },
});
