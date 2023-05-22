import React from 'react'
import { StyleSheet, Text, View} from 'react-native';
import Global from '../../Global';

export const HeadingText = ({title, _style}) => {
    return (<Text style={{...styles.head, ..._style}}>{title}</Text>)
}


const styles = StyleSheet.create({
    head:{
        fontSize: 18, 
        fontWeight: 'bold'
    },
    bodyText:{
        color:Global.dark_gray,
        fontWeight:'600',
        fontSize:14
    }
})