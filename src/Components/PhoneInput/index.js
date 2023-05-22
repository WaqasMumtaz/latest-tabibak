import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PhoneInput from "react-native-phone-number-input";
import Global from '../../Global';
import { useTranslation } from 'react-i18next'


const PhoneNumberInput = ({
    value,
    name,
    handleChange,
    handleChangeFormatted,
    phoneInput,
    disabled
}) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    const input_container_style = {
        backgroundColor: Global.inputs_bg,
        borderRadius:12,
        height:55,
        width:'100%',
        flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row',
        textAlign: isRTL == 'rtl' ? 'right' : 'left',
    }

    return (
        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            placeholder={t('phone')}
            // disabled={disabled}
            // disableArrowIcon={disabled}
            defaultCode="OM"
            layout="first"
            onChangeText={(text) => {
                handleChange(name,text);
            }}
            // onChangeFormattedText={(text) => {
            //     // handleChangeFormatted(text);
            //     handleChange(name,text);
            // }}
            onChangeCountry={(value)=> {
                handleChangeFormatted(value)
            }}
            // withDarkTheme
            // withShadow
            // autoFocus
            containerStyle={{...input_container_style}}
            textContainerStyle={styles.textContainerStyle}
            textInputStyle={[styles.textInputStyle, {textAlign: isRTL == 'rtl' ? 'right' : 'left'}]}
          />
    )
}

export default PhoneNumberInput

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor: Global.inputs_bg,
        borderRadius:12,
        height:55,
        width:'100%',
    },
    textContainerStyle:{
        backgroundColor:Global.inputs_bg,
        borderBottomRightRadius:12,
        borderTopRightRadius:12,
        height:55,
        alignItems:'center'
    },
    textInputStyle:{
        flex:1,
        height:55,
        backgroundColor:Global.inputs_bg
        //backgroundColor:'red'

    }
})
