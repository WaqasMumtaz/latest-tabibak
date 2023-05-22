import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, useWindowDimensions } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Booking = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    // const [authObj, setAuthObj] = useState({
    //     search: ''
    // })

    // const { height, width } = useWindowDimensions();

    function createAppointment() {
        navigation.navigate('Appointment', {
            doctor_id:undefined,
            name:undefined,
            category_id:undefined,
            category:undefined,
            specialist:undefined
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('booking')} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon name="calendar" color={Global.orange_clr} size={150} />
                <View style={{ margin: 20 }} />
                <Components.MyButton
                    title={t('create_appointment')}
                    onClick={createAppointment}
                />
            </View>
        </SafeAreaView>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
})