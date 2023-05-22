import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NoData from '../../Assets/no_records.png';
import Global from "../../Global";
export default function NoRecord({ iconStyle }) {
  return (
    <View style={[styles.container]}>
      <Image source={NoData} style={iconStyle ? iconStyle : styles.img}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',backgroundColor: '#fff'
  },
  img:{
    width: 120, 
    height: 120,
    tintColor:Global.main_color
  }
});