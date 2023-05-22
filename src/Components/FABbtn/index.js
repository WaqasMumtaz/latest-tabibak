import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-elements';

const FABComponent = ({ loading, visible, iconDetail, color, placement , size, onPress , title, _style}) => {
    return (
        <FAB
            loading={loading}
            visible={visible}
            icon={iconDetail}
            title={loading ? '' : title}
            color={color}
            placement={placement}
            size={size}
            onPress={()=> onPress()}
            buttonStyle={{..._style}}
        />
    )
}

export default FABComponent

const styles = StyleSheet.create({})
