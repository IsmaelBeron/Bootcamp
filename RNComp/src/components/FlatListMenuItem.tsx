import React from 'react'
import { Text, View } from 'react-native'
import { MenuItem } from '../interfaces/appInterfaces'
import { StyleSheet } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons'

interface Props{
    menuItem: MenuItem
}

const FlatListMenuItem = ({menuItem}: Props) => {
    return (
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