import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from '../../Global'

const Card = ({ data, title, icon_name, box_clr }) => {

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    return (
        <View style={[styles.card, { flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }]}>
            <View style={{
                backgroundColor: box_clr,
                borderRadius: 6,
                height: 34,
                width: 34,
                alignItems: "center",
                justifyContent:'center'
            }}>
                {icon_name === 'dollar-sign' ? 
                 <FontAwesome5Icon name={icon_name} size={18} color={Global.white} />
                :
                <IonicIcon name={icon_name} size={18} color={Global.white} />
              }
            </View>
            <View style={{marginHorizontal:10, flex: 1, alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start' }}>
                <Text style={[styles.titleText, { fontSize : isRTL == 'rtl' ? 14 : 12}]}>{title}</Text>
                <Text>{data}</Text>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card:{
        // height: 139,
        // width: '28%',
        borderRadius: 10,
        alignItems:'center',
        margin:8,
        padding:8,
        backgroundColor: Global.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    titleText:{
        fontSize:11,
        fontWeight:'bold',
    }
})