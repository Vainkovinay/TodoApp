import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, button,} from 'react-native-paper';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput style={styles.input}placeholder='Type here' 
          right={<TextInput.Icon icon="plus"/>}
        ></TextInput>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container2}>
        
        <StatusBar style="auto" />
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
  },
  input: {
    height:35,
    width: 500,
    borderColor: 'grey',
    borderWidth: 1.5,
    textAlign:'center',
    padding: 7,
    marginTop: 20, 
  },
});
