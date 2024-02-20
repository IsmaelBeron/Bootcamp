import React, { useRef } from 'react'
import { StyleSheet, View, Animated, Button } from 'react-native'

const Animation101Screen = () => {

  const opacity = useRef(new Animated.Value(0)).current

  const fadeIn = ()=>{
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 900,
        useNativeDriver: true //activa la aceleración por hardware
      }
    ).start()
  }
  const fadeOut = ()=>{
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: 900,
        useNativeDriver: true //activa la aceleración por hardware
      }
    ).start()
  }


  return (
   <View style={styles.container} >
    <Animated.View style={{...styles.purpleBox, opacity: opacity, marginBottom: 20}}   />
    <Button 
      title="FadeIn"
      onPress={ fadeIn}
    ></Button>
    <Button 
      title="FadeOut"
      onPress={ fadeOut}
    ></Button>
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
      purpleBox:{
        backgroundColor: '#5856D6',
        width: 150,
        height: 150
      }
});
export default Animation101Screen