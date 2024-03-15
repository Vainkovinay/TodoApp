import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList,ScrollView, TouchableOpacity } from 'react-native';
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

  const deleteTodo =(id)=>{
    setTodoItems(todoItems.filter(item=>item.id !==id));
  };

  const apiCall = async()=>{
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
        const json =await response.json();
        setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    apiCall();
  },[]);

  //const renderItem = ({ item }) => (
    //<View style={styles.todoItem}>
      //<Text style={styles.taskDisplay}>{item.text}</Text>
      //<TouchableOpacity onPress={() => deleteTodo(item.id)}>
        //<Text style={styles.deleteButton}>Delete</Text>
      //</TouchableOpacity>
    //</View>
  //);
  
  return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput style={styles.input}placeholder='Type here' 
          onChangeText={text => setTodoText(text)}
          value={todoText}
        ></TextInput>
        <Button mode='contained' rippleColor='blue' style={styles.button}
            onPress={()=> {
            addTodo();
            apiCall();
            }}>
            Add Task
          </Button>
          <Text></Text>
        </View>
            <View style={styles.container2}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={({item}) => (
                  <Text>
                    {item.title}, {item.releaseYear}
                  </Text>
                )}
              />
            )}
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
    borderCurve:'circular',
  },
});
