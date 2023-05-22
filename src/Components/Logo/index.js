import React from 'react'
import { StyleSheet, Text, View , Image} from 'react-native'
import logo_img from '../../Assets/logo.jpg';

const Logo = ({ logoStyle }) => {
    const logo = {
         height:180,
         width:180,
        resizeMode:'cover'
    };
    return (
       <Image 
       source={logo_img}
       style={{...logo, ...logoStyle}}
       />
    )
}

export default Logo

const styles = StyleSheet.create({
    logo:{
        // height:0,
        // width:0,
        resizeMode:'cover'
    }
})
