import React, { useEffect, useState, useRef, useCallback} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import { useSelector, useDispatch } from 'react-redux'
import { changeLanguage } from '../../Redux/reducersActions/changeLanguage';
import { updateUser } from '../../Redux/reducersActions/userReducer';
import { useTranslation } from 'react-i18next';
import HttpUtilsFile from '../../Services/HttpUtils'
import { showAlert } from '../../../Functions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useFocusEffect } from '@react-navigation/native';


const Login = ({ handleState }) => {
    let actionSheet = useRef();
    let dispatch = useDispatch();
    const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    // console.log('<<<<<****** userData *******>>>>>', userData, default_language);
    const [loader, setLoader] = useState(false);
    const [deviceToken , setDeviceToken] = useState(null);

    const [authObj, setAuthObj] = useState({
        email: '',
        password: '',
        //deviceToken:null
    })

    const [errorObj, setErrorObj] = useState({
        email: '',
        password: ''
    })

    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();

    // useSelector(state => console.log('<<<<******* Redux Data ******>>>>>>', state.persistedReducer));

    let optionArray = [
        'English',
        'عربى',
        t('cancel'),
    ];

    const openSheet = () => {
        actionSheet.current.show();
    }

    function handleChange(name, value) {
        // console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }

    async function handleLogin() {
        console.log('User Data ****>>>>>', authObj)
        let { email, password } = authObj;
        let errors = {};
        // if (Global.email_validation.test(email.replace(' ', '')) === false) {
        //     errors.email = 'Please Enter a Valid Email.';
        // }
        if(email === ''){
            errors.email = t('field_req')
        }

        if (password.length < 5) {
            errors.password = 'Password Length should be 8 characters or more.';
        }
        // return
        setErrorObj(errors);
        if (Object.keys(errors).length === 0) {
            setLoader(true)
            let userData = {
                email,
                password,
                device_token:deviceToken
            }
            console.log('Login User Data >>>>', userData);
           // return;
            try {
                
             let req = await HttpUtilsFile.post('login', userData);
            //    console.log('URL Base of Login >>>>>', Global.BASE_URL + '/login');
            //    let req = await fetch('https://fahadoman.com/doctorportal/api/v1/login', {
            //     method: 'POST',
            //     headers: new Headers({
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     }),
            //     body: JSON.stringify(userData),
            // });

            // let resJson = await req.json();
                setLoader(false);
                //console.log('Login REq Response >>>>', resJson);
                console.log('Login REq Response >>>>', req);
               // return
                if(req.code == 200){
                    // alert(req.message);
                     if(req.message === 'Patient Login Successful!'){
                        showAlert(t('alert'), t('patient_login'), t('ok'))
                        dispatch(updateUser(req.data));
                     }
                     else if(req.message === 'email/password wrong'){
                        showAlert(t('error'), t('email_password_error'), t('ok'))
                     }
                }
                else {
                    alert(req.message);
                }
            } catch (error) {
               console.log('Login Error >>>>>', error);
               setLoader(false);
            //    dispatch(updateUser(userData));
               //alert('Oop something went wrong, try to later');
               showAlert(t('alert'), t('oops'), t('ok'))
            }

            // if(req.data.length == 0) alert(req.message);
            // else dispatch(updateUser(userData));
        }

    }

    async function selectLang(index) {
        console.log('Language index >>>>>>>>>', index);
        dispatch(changeLanguage(index == 0 ? 'en' : 'ar'))
    }

    useFocusEffect(
        useCallback(() => {
          let isActive = true;
          requestUserPermission(isActive)
          return () => {
            isActive = false;
          };
        }, [])
      );

    async function requestUserPermission(isActive) {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (Platform.OS === 'ios') {
            if (enabled) {
                // console.log('Authorization status:', authStatus);
                if (userData != null) {
                    getToken(isActive);
                }
            }
        }
        else {
            getToken(isActive);
        }
    }
    
    const getToken = async (isActive) => {
        let fcmToken = await AsyncStorage.getItem('@token');
        //console.log("CHECK @token LocalStorage >>>>>>>", fcmToken);
        if (!fcmToken) {
            // let a =   messaging().getToken();
            messaging()
                .getToken()
                .then(async (fcmToken) => {
                    console.log("FcmToken Generated New *******>>>>>>>>>", fcmToken);
                    if (fcmToken && isActive) {
                        setDeviceToken(fcmToken)
                      // handleChange('deviceToken', fcmToken)
                        await AsyncStorage.setItem('@token', fcmToken);
                    } else {
                        console.log('[FCMService] User does not have a device token');
                    }
                })
                .catch((error) => {
                    let err = `FCm token get error${error}`;
                    console.log('[FCMService] getToken rejected ', err);
                });
        } else {
            if(isActive) setDeviceToken(fcmToken);
           // handleChange('deviceToken', fcmToken)
            console.log("Else Condition @token LocalStorage >>>", fcmToken)
        }
    };

    // useEffect(() => {
    //     requestUserPermission();
    // }, [])

    //console.log('State Token Value >>>>>', authObj.deviceToken);

    return (
        <KeyboardAwareScrollView
            style={{ flexGrow: 1, backgroundColor: 'white' }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Components.Logo />
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={t('email_phone')}
                        name={'email'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.email}
                        // keyboardType={'email-address'}
                    />
                    {errorObj.email ? <Text style={styles.error}>{errorObj.email}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={t('password')}
                        secureTextEntry={!authObj.showPass}
                        name={'password'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.password}
                        onPress={() =>
                            setAuthObj({
                                ...authObj,
                                showPass: !authObj.showPass,
                            })}
                    />
                    {errorObj.password ? (
                        <Text style={styles.error}>{t('password_validation')}</Text>
                    ) : (
                        null
                    )}
                    <View style={{ margin: 15 }} />
                    <Components.MyButton
                        title={t('Login')}
                        onClick={handleLogin}
                        loader={loader}
                    />

                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}>
                        <TouchableOpacity style={{ margin: 15 }} onPress={() => handleState(3)}>
                            <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline' , fontSize: isRTL == 'rtl' ? 16 : 13}}>{t('forgot_password')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleState(2)}>
                            <Text style={{ color: 'gray',fontSize: isRTL == 'rtl' ? 16 : 13 }}>
                                {t('not_register')}{' '}
                                <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline', fontSize: isRTL == 'rtl' ? 16 : 13 }}>{t('create_account')}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <TouchableOpacity style={styles.languageBox} onPress={() => openSheet()}>
                    <Text style={{ fontWeight: 'bold', fontSize: isRTL == 'rtl' ? 18 : 13 }}>{default_language == 'ar' ? 'عربى' : 'English'}</Text>
                    <View style={{ marginLeft: 10 }}>
                        <FontIcon name="globe" color={Global.buttons_bg} size={20} />
                    </View>
                </TouchableOpacity>

            </View>
            <ActionSheet
                ref={actionSheet}
                title={t('choose_lang')}
                options={optionArray}
                cancelButtonIndex={2}
                destructiveButtonIndex={0}
                onPress={(index) =>
                    selectLang(index)
                }
            />
        </KeyboardAwareScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
    languageBox: {
        position: 'absolute',
        zIndex: 0,
        top: -50,
        bottom: 0,
        right: 20,
        height: 40,
        backgroundColor: Global.inputs_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 12,
        paddingHorizontal: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 15,
        width: 100
    }
})
