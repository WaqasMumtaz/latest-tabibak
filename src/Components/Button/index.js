import { StyleSheet, Text, View , TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import Global from '../../Global'
import { useTranslation } from 'react-i18next';


const MyButton = ({title , onClick , styleBtn, titleStyle, loader, disabled}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir();
 
    const btnStyle = {
        //borderWidth:2,
       // borderColor:Global.main_color,
        borderRadius:12,
        backgroundColor:Global.buttons_bg,
        padding:10,
        height:50,
        paddingHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row'
    }
    const _titleStyle = {
        fontWeight:'bold',
        color:Global.white
      }

  return (
    <TouchableOpacity 
    onPress={()=> onClick()}
    style={{...btnStyle, ...styleBtn}}
    disabled={disabled}
    >
      {loader && (
        <View style={{marginHorizontal:8}}>
          <ActivityIndicator color={Global.white} size='small'/>
        </View>
      )}
      <Text style={[{..._titleStyle, ...titleStyle}, {fontSize: isRTL == 'rtl' ? 20 : 16}]}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
   btn:{
     justifyContent:'center',
     
   }
})