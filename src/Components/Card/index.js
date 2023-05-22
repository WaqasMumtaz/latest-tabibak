import * as React from 'react';
import { View , Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MyButton from '../Button';
import Global from '../../Global';
import IonicIcon from 'react-native-vector-icons/Ionicons'


const MyCard = ({ data }) => (
  <View style={styles.card} elevation={3} >
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <View>
      <View style={{flexDirection:'row', alignItems:'center'}}>
         <View style={{flex:1}}>
            <Text style={[styles.textStyle, {fontSize:18}]}>{data.name}</Text>
         </View>
         <TouchableOpacity>
           <IonicIcon name="ellipsis-vertical" size={20} color={Global.dark_gray}/>
         </TouchableOpacity>
      </View>
      {/* <Text style={[styles.textStyle, {fontSize:14}]}>{data.subTitle}</Text> */}
      <Text style={[styles.textStyle, {fontSize:12}]}>{data.timeStamp}</Text>
    </View>
     <View style={{justifyContent:'center', alignItems:'center'}}>
      {/* <Image source={data.avatarUrl} style={styles.imageStyle}/> */}
      <IonicIcon name="person" size={80} color={Global.dark_gray}/>
     </View>
  </View>
);

export default MyCard;

const styles = StyleSheet.create({
  card:{
    margin:10,
    width:'45%',
    borderRadius:10,
    padding:10,
    backgroundColor:Global.inputs_bg,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  btn_style:{
    borderWidth:1,
    borderColor:Global.main_color,
    borderRadius:15,
    backgroundColor:Global.main_color,

  },
  titleStyle:{
    fontWeight:'bold',
    color:Global.white
  },
  imageStyle:{
    resizeMode:'cover',
    height:120, 
    width:120, 
    borderRadius:120/2
  },
  textStyle:{
    marginVertical:5
  }
})