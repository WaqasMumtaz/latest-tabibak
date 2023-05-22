import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Components from '../../Components';
import Global from '../../Global';
import TemplateComponents from '../../Components/TemplateComponents';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';



const DoctorProfile = ({ route }) => {
    const {doctor_id, name ,bio , category_id, fees, role,specialist, category,offday, user_id} = route.params;
    const navigation = useNavigation();
    console.log('Bio Data ******>>>>>>>>>>>>>', bio);

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    function openImage() {
        // alert('test')
    }

    function handleNavigate(){
        navigation.navigate('Appointment', {
            doctor_id,
            name,
            category_id,
            specialist,
            category,
            offday,
            user_id,
            fees
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={name} backIcon={true} />
            <View style={{ flex: 1, margin: 15 }}>
                <Components.ProfileContainer
                    onClick={openImage}
                />
                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flex: 1, alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start'}}>
                        <TemplateComponents.HeadingText title={name} />
                        <TemplateComponents.BodyText title={category} _style={{ marginVertical: 10 }} />
                    </View>
                    <View style={{flexDirection:isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems:'center'}}>
                        <TemplateComponents.HeadingText title={t('fees')} _style={{ color: Global.main_color}} />
                        <TemplateComponents.HeadingText title=':' _style={{ color: Global.main_color, marginHorizontal:5  }} />
                        <TemplateComponents.HeadingText title={`$${fees}`} _style={{ color: Global.main_color }} />

                    </View>
                </View>
                <View style={{ paddingVertical: 10,  flexDirection:isRTL == 'rtl' ? 'row-reverse' : 'row', borderBottomWidth: 1, borderBottomColor: Global.dark_gray,}}>
                    <TemplateComponents.HeadingText
                        title={t('about_doctor')}
                        _style={{ lineHeight: 25 }}
                    />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <TemplateComponents.BodyText
                        title={bio}
                        _style={{ lineHeight: 25 }}
                    />
                </View>
                <View style={{margin:20}}/>
                <Components.MyButton
                    title={t('make_appointment')}
                    onClick={handleNavigate}
                />
            </View>
        </SafeAreaView>
    )
}

export default DoctorProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
