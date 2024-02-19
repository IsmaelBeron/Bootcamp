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