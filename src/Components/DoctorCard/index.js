import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImagePlaceholder from '../Image';
import MyButton from '../Button';
import Global from '../../Global';
import IonicIcon from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';



const DoctorCard = ({ data, handleDoctor, selectedDoctor, i }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    return (
        <View style={styles.card} elevation={3} >
            <ImagePlaceholder />
            <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, alignItems:isRTL =='rtl' ? 'flex-end' : 'flex-start' }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={[styles.textStyle, { fontSize: 16 }]}>{data?.user?.name}</Text>
                    </View>
                    <View style={{alignItems:isRTL =='rtl' ? 'flex-end' : 'flex-start' }}>
                        {/* <Text style={[styles.textStyle, { fontSize: 15, color: Global.dark_gray }]}>{data?.category?.name}</Text> */}
                        <Text style={[styles.textStyle, { fontSize: 14,marginTop:3, color: Global.dark_gray }]}>{data?.specialist}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal:3 }}>
                    {/* <Text style={{fontSize:12}}>{t('select_doctor')}</Text> */}
                    <RadioButton
                        value={data?.id === selectedDoctor.id ? selectedDoctor.name : ''}
                        status={data?.id === selectedDoctor.id ? 'checked' : 'unchecked'}
                        onPress={() => handleDoctor(data?.user, data?.specialist, data?.offday, data)}
                        color={Global.main_color}
                    />
                </View>
                {/* <View>
           <IonicIcon name="ellipsis-vertical" size={20} color={Global.dark_gray}/>
         </View> */}
            </View>
        </View>
    )
}

export default DoctorCard;

const styles = StyleSheet.create({
    card: {
        margin: 10,
        // width:120,
        // height:120,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Global.inputs_bg,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    btn_style: {
        borderWidth: 1,
        borderColor: Global.main_color,
        borderRadius: 15,
        backgroundColor: Global.main_color,

    },
    titleStyle: {
        fontWeight: 'bold',
        color: Global.white
    },
    imageStyle: {
        resizeMode: 'cover',
        height: 120,
        width: 120,
        borderRadius: 120 / 2
    },
    textStyle: {
        marginVertical: 5
    }
})