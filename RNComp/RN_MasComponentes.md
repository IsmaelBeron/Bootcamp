# REACT NATIVE - MAS COMPONENTES

- Creo el proyecto

> npx react-native init MasComponentes --template react-native-template-typescript

- Instalo Navigator (para el createStackNavigator) y react-native-vector-icons

> npm i @react-navigation/native
> npm install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

- En App debo colocar la linea de importación de react-native-gesture-handler antes que la importación de React
- Hay que colocar el NavigationContainer en la parte superior de la aplicación

~~~js
import 'react-native-gesture-handler'
import React  from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { Text } from 'react-native'

export default function App (){
    return (
      <NavigationContainer>
        <Text>Pepe</Text>
      </NavigationContainer>
    )
  
}
~~~

- Creo la carpeta src con las carpetas components, hooks y screens
- Creo el componente HomeScreen en screens
- Creo el stack y la navegación en una nueva carpeta navigator
- Para quitar los headers de las pantallas uso la opción **headerShown en false**

> npm i @react-navigation/stack

~~~js
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export const Navigator =()=> {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
    }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
~~~

- Coloco el Navigator dentro de NavigationContainer

~~~js
import 'react-native-gesture-handler'
import React  from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { Text } from 'react-native'
import { Navigator } from './src/navigator/Navigator'

export default function App (){
    return (
      <NavigationContainer>
      <Navigator />
      </NavigationContainer>
    )
}
~~~

- Para instalar los iconos (en Android)

> npm i react-native-vector-icons

- Debo configurar en android/app/build.gradle (ios tiene otra config)
- Si quisiera todos los iconos debería poner esta línea apply from: "../../node_modules/react-native-vector-icons/fonts.gradle
- Si solo quiero unos iconos en concreto debo copiar la linea anterior y este pedazo de código
- Hay que poner el nombre igual!!
  
~~~js
project.ext.vectoricons = [
  iconFontNames: ['Ionicons.ttf']
]
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
~~~

- Instalo los tipos

> npm i --save-dev @types/react-native-vector-icons

- Coloco mi primer icono en HomeScreen

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export default function HomeScreen () {
    return (
        <View>
            <Icon 
                name={"star-outline"}
                size={50}
                color="black"
                />

        </View>
    )
  
}
~~~
----

## FlatList

- Necesita la **data** que renderizar, la función para renderizar el elemento (**renderItem**) y el key (**keyExtractor**)
- Se autocierra (no tiene children)
- renderItem **siempre devuelve un elemento JSX**
- Para la función de renderItem creo una **interfaz**, porque me interesa definir como luce un MenuItem
- Puedo **desestructurar el item y el index de renderItem**
- Del key de keyExtractor recibo directamente el item, **tiene que ser un string!**

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface MenuItem{
    name: string,
    icon: string,
    components: string
}

const menuItems=[
    {name: 'Animation 101', icon: 'cube-outline', components: 'Animation101Screen'},
]



export default function HomeScreen () {

    const renderMenuItem = (menuItem: MenuItem)=>{
        return (
            <View>
                <Text>{menuItem.name} - {menuItem.icon}</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
       
       <FlatList 
        data={menuItems}
        renderItem={({item})=>renderMenuItem(item)}
        keyExtractor={(item)=> item.name}
       />

        </View>
    ) 
}
~~~

- 