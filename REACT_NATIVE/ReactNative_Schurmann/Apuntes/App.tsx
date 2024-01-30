import { StyleSheet, Text, View, Image, Modal, Button, Alert} from "react-native"
import { useState} from "react";


const crearDialogo = ()=>Alert.alert(`Título`, 'Este es el mensaje', [
  {
    text: "Cancelar",
    onPress: ()=>{},
    style: 'cancel'
  },
  {
    text:'Aceptar',
    onPress: ()=>{},
    style: 'default'
  }
 ],
{cancelable: false}
)

const App = ()=>{

return (
 <View style={styles.container}>

   <Button title="Abrir dialogo" onPress={crearDialogo} />
</View>
)}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 22 //para alejarlo un poco de arriba
  }
});

export default App

