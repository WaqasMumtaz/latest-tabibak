import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import Components from '../../Components';
import Global from '../../Global';
import case1 from '../../Assets/case_1.jpeg'
import case2 from '../../Assets/case_2.jpeg'
import case3 from '../../Assets/case_3.jpeg'
import case4 from '../../Assets/case_4.jpeg'
import case5 from '../../Assets/case_5.jpeg'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import HttpUtilsFile from '../../Services/HttpUtils';
import moment from 'moment';

const DoctorsTile = ({ route }) => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { category_id, category_name } = route.params;
    console.log('Route Category ID >>>', category_id);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState({
        doctor_id:'',
        name: '',
        bio: '',
        category_id: '',
        fees: '',
        role: '',
        category: '',
        specialist:'',
        offday:null,
        user_id:''
        
    })
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    const [doctorsList, setDoctorsList] = useState(null);

    const DATA = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        name: "Dr. Kumar",
        timeStamp: "12:47 PM",
        subTitle: "Specialist",
        avatarUrl: case1
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=hLmfBbQJXSDzlM"
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        name: "Dr. Saif",
        timeStamp: "11:11 PM",
        subTitle: "Cardio Specialist",
        avatarUrl: case2
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=by_xKEh1YSq2WM"
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        name: "Dr. Rumi",
        timeStamp: "6:22 PM",
        subTitle: "Gyani Specialist",
        avatarUrl: case3
        //avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        name: "Dr. Dawood",
        timeStamp: "8:56 PM",
        subTitle: "Child Specialist",
        avatarUrl: case4
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=4_ezFtQMlDkR1M"
    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        name: "Dr. Noor",
        timeStamp: "12:47 PM",
        subTitle: "Specialist",
        avatarUrl: case5
        // avatarUrl: "https://www.google.com/search?q=fbr+tax+collection+images&rlz=1C1ONGR_enPK976PK976&sxsrf=ALiCzsbp0_n_n92v8yIfya4WhFIWUOPjEQ:1662404600891&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj229Xdq_75AhWpMlkFHUMMDf8Q_AUoAnoECAEQBA&biw=1280&bih=577&dpr=1.5#imgrc=B_pNo7CE4kUZmM"
    }
    ]

    const renderItem = ({ item }) => (
        <MyCard data={item} />
    )

    const MyCard = ({ data }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => selectDoctor(data)}
        >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View>
                <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.textStyle, { fontSize: 18 }]} numberOfLines={1} ellipsizeMode='tail'>{data.user.name}</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => handleModal(data)}>
                        <IonicIcon name="ellipsis-vertical" size={28} color={Global.dark_gray} />
                    </TouchableOpacity> */}
                </View>
                {/* <Text style={[styles.textStyle, {fontSize:14}]}>{data.subTitle}</Text> */}
                {/* <Text style={[styles.textStyle, { fontSize: 12 }]}>{data.timeStamp}</Text> */}

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={data.avatarUrl} style={styles.imageStyle}/> */}
                <IonicIcon name="person" size={60} color={Global.dark_gray} />
            </View>
            <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text>{`${moment(data.starttime, 'hh:mm A').format('hh:mm A')}`}</Text>
                <Text>-</Text>
                <Text >{`${moment(data.endtime, 'hh:mm A').format('hh:mm A')}`}</Text>
            </View>
        </TouchableOpacity>
    );

    function selectDoctor(doctor) {
        console.log('Doctor Off day >>>>>>>', doctor);
        setSelectedDoctor({
            doctor_id:doctor?.id,
            name: doctor?.user?.name,
            bio: doctor?.user?.bio,
            category_id: doctor?.category?.id,
            fees: doctor?.fees,
            role: doctor?.user?.role,
            category: doctor?.category?.name,
            specialist:doctor?.specialist,
            offday:doctor?.offday,
            user_id:doctor?.user_id
        })
        setModalVisible(true);

    }

    function handleModal() {
        //return;
        setModalVisible(false);
    }

    function handleClick(params) {
        console.log('Hanlde click >>>', params);
        const { name, bio, category_id, fees, role, category, doctor_id, specialist, offday, user_id } = selectedDoctor;
        if (params === t('profile_view')) {
            setModalVisible(modalVisible => !modalVisible);
            navigation.navigate('DoctorProfile', {
                doctor_id,
                name,
                bio,
                category_id,
                fees,
                role,
                category,
                specialist,
                offday,
                user_id
            });
        }
        else if (params === t('make_appointment')) {
            setModalVisible(modalVisible => !modalVisible);
            navigation.navigate('Appointment', {
                doctor_id,
                name,
                bio,
                category_id,
                fees,
                role,
                category,
                specialist,
                offday,
                user_id
            });
        }
    }

    async function fetchDoctors() {
        try {
            let obj = {
                category_id: category_id
            }
            console.log('Category Obj >>>', obj)

            let req = await HttpUtilsFile.post('getdoctorlistbycategory', obj, userData?.api_token);
            console.log('Req Response of Doctors >>', req);
            // if (req.data.length > 0) {
                setDoctorsList(req.data);
            // }

        } catch (error) {
            console.log('Error >>>', error);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={category_name} backIcon={true} />
            {doctorsList == null ?
                // <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Components.Spinner />
                // </View>
                : doctorsList.length == 0 ?
                    <Components.NoRecord />
                    :
                    <View style={{ flex: 1, margin: 10 }}>
                        <FlatList
                            // contentContainerStyle={{alignItems:'center'}}
                            data={doctorsList}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                        />

                    </View>
            }
            {modalVisible && (
                <Components.AlertModal
                    modalVisible={modalVisible}
                    setModalVisible={handleModal}
                    title={t('alert')}
                    data={[{ name: t('profile_view') }, { name: t('make_appointment') }]}
                    handleClick={handleClick}
                />
            )}
        </SafeAreaView>
    )
}

export default DoctorsTile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        margin: 10,
        width: '45%',
        height:160,
        borderRadius: 15,
        padding: 10,
        backgroundColor: Global.inputs_bg,
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
    textStyle: {
        marginVertical: 5
    }
})
