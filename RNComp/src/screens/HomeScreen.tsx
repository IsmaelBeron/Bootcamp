import {Text, View} from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FlatListMenuItem from '../components/FlatListMenuItem'
import { menuItems } from '../data/menuItems'



export default function HomeScreen () {

    const {top} = useSafeAreaInsets()


    const renderListHeader =()=>{
        return(
            <View style={{marginTop: top+20}}>
                <Text style={styles.title} >Opciones de Menú</Text>
            </View>
        )
    }

    const itemSeparator = ()=>{
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
        renderItem={({item})=><FlatListMenuItem menuItem={item} />}
        keyExtractor={(item)=> item.name}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={itemSeparator}
       />

        </View>
    )
  
}