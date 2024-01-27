import { StyleSheet, Text, View, FlatList} from "react-native"

const App = ()=>{

return (
 <View style={styles.container}>

  <FlatList  data={[
    {key:'1', nombre: "Miguel"},
    {key:'2', nombre:"Pepe"},
    {key:'3', nombre:"María"},
    {key:'4', nombre:"Lucas"},
    {key:'5', nombre:"Petra"},
    {key:'6', nombre:"Juana"}

  ]} renderItem={({item})=><Text style={styles.item}>{item.nombre}</Text>} />

</View>
)}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems:'stretch',
    justifyContent:'center',
    paddingTop: 22 //para alejarlo un poco de arriba
  },
  item:{
    padding: 10,
    fontSize: 22,
    height: 50,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default App

