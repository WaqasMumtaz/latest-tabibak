import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Platform, FlatList, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native'
import Components from '../../Components'
import { useFocusEffect } from '@react-navigation/native';
import Global from '../../Global'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import HttpUtilsFile from '../../Services/HttpUtils';
import cardio from '../../Assets/Categories/cardio.png';
import therapy from '../../Assets/Categories/therapy.png';
import online_doctor from '../../Assets/Categories/nurse-home.png';
import doctor from '../../Assets/Categories/doctor.png';
import family from '../../Assets/Categories/family-care.png';
import nurse from '../../Assets/Categories/nurse-2.png';
import blood_test from '../../Assets/Categories/blood-test.png';
import { updateUser } from '../../Redux/reducersActions/userReducer'
import IonicIcon from 'react-native-vector-icons/Ionicons';


const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);

    const [categories, setCategories] = useState(null);
    const [record, setRecord] = useState(null);

    const [authObj, setAuthObj] = useState({
        search: ''
    })

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }


    const CATEGORIES = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        category: t('category_1')
    }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        category: t('category_2')
    }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        category: t('category_3')
    }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        category: t('category_4')

    }, {
        id: "28694a0f-3da1-471f-bd96-142456e29d72",
        category: t('category_5')
    }
    ]

    function handleNavigate(data) {
        console.log('Data clicked >>>>', data);
        navigation.navigate("DoctorsTile", {
            category_id: data.id,
            category_name: default_language == 'ar' ? data?.translations[0]?.title : data?.translations[1]?.title
        })
    }

    // console.log('Selected Language ******>>>>>>>', default_language)

    const renderItem = (item, i) => (
        // <Components.MyCard data={item} key={item.id} />
        <TouchableOpacity
            key={i}
            style={[styles.card, { width: '28%', height: 139 }]}
            // elevation={17}
            onPress={() => handleNavigate(item)}
        >
            {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginVertical: 5 }}>
                    <Components.ImagePlaceholder
                         src={item.id == 1 ? 
                            doctor : item.id == 2 ?
                            nurse : item.id == 3 ? 
                            therapy : item.id == 7 ?
                            family : item.id == 8 ?
                            online_doctor :
                            null
                        }
                        // src={item.title === 'Home Doctor Consultation Visit' ?
                        //     doctor : item.title === 'Nurse Visit' ?
                        //         nurse : item.title === 'Physiotherapy & Rehabilization' ?
                        //             therapy : item.title === 'Wound Care' ?
                        //                 family : item.title === 'Online Doctor Consultation' ?
                        //                     online_doctor :
                        //                     null}
                        _style={{ height: 40, width: 40 }}
                        size={40}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.textStyle, { fontSize: 11, fontWeight: 'bold' }]}>
                        {default_language == 'ar' ? item?.translations[0]?.title : item?.translations[1]?.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    async function fetchCategories() {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('getcategory?' + query);
            // console.log('Req of Categories >>', req);
           // console.log('Services Data *****>>>>>', req.data);
            if (req.message === 'Unauthenticated.') {
                dispatch(updateUser(null))
            }
            else {
                if (req.data.length == 0) {
                    setCategories([])
                }
                else {
                    // let arr = [...req.data];
                    // arr.push({ id: 6, name: 'Family Tree' })
                    setCategories(req.data)
                }
            }

        } catch (error) {
            console.log('Error >>>', error);
        }
    }

    async function getDataRecord() {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('dashboard?' + query);
            console.log('Dashboard DAta >>>>', req);
            if (req.code == 200) setRecord(req.data);

        } catch (error) {
            console.log('Error >>>', error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let getRecord = false;
            getDataRecord()
            getRecord = true;
            return () => {
                getRecord = false
            };
        }, [])
    );


    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar
                // title={t('home')} 
                home={true}
                user_name={userData?.name}
            />
            <View style={{ flex: 1 }}>
                {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}

                {categories == null ?
                    <Components.Spinner />
                    : categories?.length == 0 ?
                        <Components.NoRecord />
                        :
                        // <View style={{ flexDirection: 'row', marginTop: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                        //  {categories.map(item => renderItem(item))}
                        <ScrollView>
                            <View style={{}}>
                                <Components.GraphCard
                                    title={t('past_appointments')}
                                    icon_name={'calendar-outline'}
                                    data={record?.past_appointment}
                                    box_clr={Global.main_color}
                                />
                                <Components.GraphCard
                                    title={t('ongoing')}
                                    icon_name={'calendar-outline'}
                                    data={record?.today_appointment}
                                    box_clr={Global.orange_clr}
                                />
                                {/* <Components.GraphCard
                                    title={t('total_cost')}
                                    icon_name={'dollar-sign'}
                                    data={`$${record?.cost}`}
                                    box_clr={Global.lime_green}
                                /> */}
                                <AboutUs />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                {categories.map((item, i) => renderItem(item, i))}
                            </View>
                            {/* <FlatList
                                contentContainerStyle={{ alignSelf: 'center' }}
                                data={categories}
                                renderItem={renderItem}
                                keyExtractor={item => `item_id${item.id}`}
                                numColumns={3}
                            /> */}
                        </ScrollView>
                    // </View>
                }
                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
    )
}

export default Home;

const AboutUs = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('About')}
            style={[styles.card, { flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }]}>
            <View style={{
                backgroundColor: Global.lime_green,
                borderRadius: 6,
                height: 34,
                width: 34,
                alignItems: "center",
                justifyContent: 'center'
            }}>
                <IonicIcon name={'people-circle-outline'} size={25} color={Global.white} />
            </View>
            <View style={{ marginHorizontal: 10, flex: 1, alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start' }}>
                <Text style={[styles.titleText, { fontSize: isRTL == 'rtl' ? 14 : 12 }]}>{t('about_us')}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20
    },
    card: {
        flexDirection: 'row',
        //margin: 5,
        // width: 150,
        height: 150,
        borderRadius: 20,
        margin: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 17,
        //backgroundColor: Global.inputs_bg,
        //  borderWidth:3,
        // borderColor:Global.gray_clr,
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
        // fontWeight: 'bold',
        textAlign: 'center',
        // fontSize:8,
        // lineHeight: 20,
        color: Global.main_color,
        marginVertical: 8
    },
    card: {
        // height: 139,
        // width: '28%',
        borderRadius: 10,
        alignItems: 'center',
        margin: 8,
        padding: 8,
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
    titleText: {
        fontSize: 11,
        fontWeight: 'bold',
    }
})