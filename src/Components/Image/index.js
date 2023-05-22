import React from 'react'
import { StyleSheet, Text, View , Image} from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';


const ImagePlaceholder = ({src , _style, uri, size}) => {

    const imageStyle={
        height:80,
        width:80,
        //resizeMode:'contain'
    }

  return (
    <View style={styles.container}>
       {(src != undefined || uri != undefined) ? (
        <Image source={uri ? {uri:uri} : src} style={{...imageStyle, ..._style}} resizeMode={'cover'}/>
       ):
       <IonicIcon name="person" size={size ? size : 80} color={Global.dark_gray} />
    }
    </View>
  )
}

export default ImagePlaceholder;

const styles = StyleSheet.create({
    container:{
        // flex:1,
        //justifyContent:'center',
        alignItems:'center'
    },
    
})