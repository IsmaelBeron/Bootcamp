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

- Voy a crear una lista que me sirva de menú para navegar a otras pantallas
- Necesita la **data** que renderizar, la función para renderizar el elemento (**renderItem**) y el key (**keyExtractor**)
- Se autocierra (no tiene children)
- **renderItem** **siempre devuelve un elemento JSX**
- Para la función de renderItem creo una **interfaz**, porque me interesa definir como luce un MenuItem
- Puedo **desestructurar el item y el index de renderItem**. Aquí solo desestructuro el item
- Del key de keyExtractor recibo directamente el item, **tiene que ser un string!**

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'

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

- Entonces, necesito la **data**, la función de **renderItem** que debe retornar un JSX y el **keyExtractor** que debe de ser un string
- Creo una nueva carpeta llamada theme en src/
- Creo appTheme con una StyleSheet y la importo

~~~js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
      title:{
        fontSize: 35,
        fontWeight: 'bold'
      }
});
~~~

- Añado el estilo al texto "Opciones de menú"

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'
import { styles } from '../theme/appTheme'

interface MenuItem{
    name: string,
    icon: string,
    components: string
}

const menuItems: MenuItem[]=[
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

            <Text style={styles.title} >Opciones de Menú</Text>
       
       <FlatList 
        data={menuItems}
        renderItem={({item})=>renderMenuItem(item)}
        keyExtractor={(item)=> item.name}
       />

        </View>
    ) 
}
~~~

- Pero de esta manera cuando hago scroll el Texto no se va para arriba y además choca con el notch de ios
- Este texto puede ser parte del menú
- Creo una función que retorne el texto. Lo meto dentro de un View porque me ayudará con el CSS (separaciones, sombras, etc)
- Ahora puedo llamar a la función con la propiedad **ListHeaderComponent**. Necesita una función que regrese un JSX
- Incluso tengo para personalizar el estilo con **ListHeaderComponentStyle**
- Uso **useSafeAreaInsets** para desestructurar el **top** y añadirle 20 para que el header no moleste con el notch
- Le añado también un **marginBottom**
- Lo coloco en el style del View que devuelve renderListHeader

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface MenuItem{
    name: string,
    icon: string,
    components: string
}

const menuItems: MenuItem[]=[
    {name: 'Animation 101', icon: 'cube-outline', components: 'Animation101Screen'},
]



export default function HomeScreen () {

    const {top} = useSafeAreaInsets()

    const renderMenuItem = (menuItem: MenuItem)=>{
        return (
            <View>
                <Text>{menuItem.name} - {menuItem.icon}</Text>
            </View>
        )
    }

    const renderListHeader =()=>{
        return(
            <View style={{marginTop: top+20, marginBottom: 20}}>
                <Text style={styles.title} >Opciones de Menú</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
       
       <FlatList 
        data={menuItems}
        renderItem={({item})=>renderMenuItem(item)}
        keyExtractor={(item)=> item.name}
        ListHeaderComponent={()=>renderListHeader()}
       />

        </View>
    )
}
~~~

- Tampoco quiero que todo quede pegado a los bordes, creo la propiedad globalMargin en appTheme

~~~js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  globalMargin:{
    marginHorizontal: 20
  },
      title:{
        fontSize: 35,
        fontWeight: 'bold'
      }
});
~~~

- Uso el spread de styles para usar solo globalMargin

~~~js
return (
    <View style={{flex: 1, ...styles.globalMargin}}>
    
    <FlatList 
    data={menuItems}
    renderItem={({item})=>renderMenuItem(item)}
    keyExtractor={(item)=> item.name}
    ListHeaderComponent={()=>renderListHeader()}
    />

    </View>
)
~~~

- Coloco otro icono. recuerda que los nombres deben ser diferentes para el keyExtractor

~~~js
const menuItems: MenuItem[]=[
    {name: 'Animation 101', icon: 'cube-outline', components: 'Animation101Screen'},
    {name: 'Animation 102', icon: 'albums-outline', components: 'Animation102Screen'},
]
~~~

- Para crear separación entre los componentes tengo **ItemSeparatorComponent**
- Devuelve un JSX, solo aparece entre los items ( ni al principio ni al final)

~~~js
return (
    <View style={{flex: 1, ...styles.globalMargin}}>
    
    <FlatList 
    data={menuItems}
    renderItem={({item})=>renderMenuItem(item)}
    keyExtractor={(item)=> item.name}
    ListHeaderComponent={()=>renderListHeader()}
    ItemSeparatorComponent={()=> <Text>_________________</Text>}
    />

    </View>
)
~~~

- Puedo crear una función para el ItemSeparatorComponent
- Cuando **no hay ningún argumento puedo mandar solo la declaración de la función**

~~~js
import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface MenuItem{
    name: string,
    icon: string,
    components: string
}

const menuItems: MenuItem[]=[
    {name: 'Animation 101', icon: 'cube-outline', components: 'Animation101Screen'},
    {name: 'Animation 102', icon: 'albums-outline', components: 'Animation102Screen'},
]



export default function HomeScreen () {

    const {top} = useSafeAreaInsets()

    const renderMenuItem = (menuItem: MenuItem)=>{
        return (
            <View>
                <Text>{menuItem.name} - {menuItem.icon}</Text>
            </View>
        )
    }

    const renderListHeader =()=>{
        return(
            <View style={{marginTop: top+20}}>
                <Text style={styles.title} >Opciones de Menú</Text>
            </View>
        )
    }

    const itemSeparatror = ()=>{
        return(
            <View 
            style={{borderBottomWidth: 1,
                opacity: 0.4,
                marginVertical: 8
                }}
            />
        )
    }

    return (
        <View style={{flex: 1, ...styles.globalMargin}}>
       
       <FlatList 
        data={menuItems}
        renderItem={({item})=>renderMenuItem(item)}
        keyExtractor={(item)=> item.name}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={itemSeparatror}
       />

        </View>
    ) 
}
~~~

- No hay ningún **FlatListItem**, hay que crearlo
- Vamos a crear un componente pra reutilizar llamado FlatListMenuItems
- Necesito la interfaz en el componente, la corto y la coloco en la carpeta src/interfaces
- La importo en HomeScreen
- Creo una interfaz **Props** en FlatListMenuItem

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import { MenuItem } from '../interfaces/appInterfaces'

interface Props{
    menuItem: MenuItem
}

const FlatListMenuItem = ({menuItem}: Props) => {
    return (
        <View>
            <Text>{menuItem.name} - {menuItem.icon}</Text>
        </View>
    )
}

export default FlatListMenuItem
~~~

- En HomeScreen ya no tengo la función de **renderItem**, le paso el componente directamente

~~~js
return (
    <View style={{flex: 1, ...styles.globalMargin}}>
    
    <FlatList 
    data={menuItems}
    renderItem={({item})=><FlatListMenuItem menuItem={item} />}
    keyExtractor={(item)=> item.name}
    ListHeaderComponent={renderListHeader}
    ItemSeparatorComponent={itemSeparatror}
    />

    </View>
)
~~~

- Puedo aplicar los estilos al FlatListMenuItem de manera local
- Quiero poner el icono, el texto y una flechita para indicar que lleva a esa página
- Uso Icon de IonIcons
- Cambio la dirección de flex a row (por defecto está en column)
- Coloco una separación en el texto y aumento la fuente
- La flecha es otro icono, lo coloco en duro
- Para que se coloque al final puedo usar **otro View y colocarle flex:1**. Como está en row se estira todo lo que puede hasta el final
- **Puedo crear un spacer con un flex de 1 (se suele hacer, es lo mismo)**
- Para hacer los MenuItems clicables lo enmarcamos en un **TouchableOpacity**
~~~js
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MenuItem } from '../interfaces/appInterfaces'
import { StyleSheet } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'

interface Props{
    menuItem: MenuItem
}

const FlatListMenuItem = ({menuItem}: Props) => {
    return (
        <TouchableOpacity>
        <View style={styles.container} >
            <Icon
            name={menuItem.icon}
            color="gray"
            size={23}
            />
            <Text style={styles.itemText}>
                {menuItem.name}
                </Text>
            
            <View style={{flex:1}} />
            <Icon
            name="chevron-forward-outline"
            color="gray"
            size={23}
            />
            
           
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
      container:{
        flexDirection: 'row'
      },
      itemText:{
        marginLeft: 10,
        fontSize: 19
      }
});

export default FlatListMenuItem
~~~

