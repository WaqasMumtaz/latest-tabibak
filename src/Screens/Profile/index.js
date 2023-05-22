import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Global from '../../Global'
import { hasMixed, hasNumber, hasSpecial, hasValidLength } from '../../Global/password';
import Components from '../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { showAlert, useRTL } from '../../../Functions'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import HttpUtilsFile from '../../Services/HttpUtils';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/reducersActions/userReducer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


//const isRTL = Global.isRTL();

const Profile = () => {
    const { t, i18n } = useTranslation();
    const isRTL = useRTL();
    let actionSheet = useRef();
    const navigation = useNavigation()
    // console.log('Custom Function RTL ***>>>>>', isRTL);
    let dispatch = useDispatch();

    const { userData } = useSelector(state => state.persistedReducer.userReducer);

    let phoneInput = useRef(null);
    const [loader, setLoader] = useState(false);
    const [record, setRecord] = useState(null);


    let optionArray = [
        t('gallery'),
        t('camera'),
        t('cancel')
    ];

    const openSheet = () => {
        actionSheet.current.show();
    }

    const [authObj, setAuthObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        family_key: '',
        photo: null,
        photo_obj: {
            mime: "image/jpeg"
        },
        edit: false,
        role: ''
    })

    const [errorObj, setErrorObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    })

    function handleClear() {
        //alert('Clear form')
        // phoneInput = null;
        setAuthObj({
            ...authObj,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: '',
            family_key: '',
            edit: false
        })
        setErrorObj({
            ...errorObj,
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
        })
        setLoader(false);

    }

    function handleChange(name, value) {
        // console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }

    async function handleSave() {
        // console.log('User Data ****>>>>>', authObj)
        const { email, password, first_name, last_name, phone, family_key, photo, photo_obj } = authObj;
        let errors = {};
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        //   return
        if (Global.email_validation.test(email.replace(' ', '')) === false) {
            errors.email = 'Please enter a valid email.';
        }
        //console.log('Errors >>', errors);
        if(password != ''){
            if (!hasValidLength(password)) {
                errors.password = "Your password must have 8 or more characters"
            }
        }
        // if (!hasMixed(password)) {
        //     errors.password = "Your password must have upper & lowercase letters"

        // }
        // if (!hasNumber(password)) {
        //     errors.password = "Your password must have at least one number"

        // }
        // if (!hasSpecial(password)) {
        //     errors.password = "Your password must have at least one special character"
        // }

        if (first_name == '' || first_name == null) {
            errors.first_name = 'First Name is required';

        }
        if (last_name == '' || last_name == null) {
            errors.last_name = 'Last Name is required';

        }
        //console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        // if (phoneInput.current?.isValidNumber(phone) == false) {
        //     errors.phone = 'Phone number is not valid';

        // }
        // console.log('Errors >>>', errors);
        setErrorObj(errors);
        if (Object.keys(errors).length == 0) {
            //    alert(1)
            setLoader(true);
            const formObj = new FormData();
            formObj.append('fname', `${first_name}`)
            formObj.append('lname', `${last_name}`)
            formObj.append('email', email);
            formObj.append('phone', phone);
            if(password != '') formObj.append('password', password);
            if (photo != null) {
                formObj.append('image', {
                    uri: photo,
                    type: photo_obj.mime,
                    name: 'photo'
                })
            }

            try {
                console.log('Edit Member Obj ***>>>>', JSON.stringify(formObj));
                let imageReq = await fetch(Global.BASE_URL + '/user-update', {
                    method: 'Post',
                    headers: new Headers({
                        Authorization: 'Bearer ' + userData?.api_token,
                        // "Content-Type": "application/json",
                    }),
                    body: formObj,
                });
                console.log('Edit Member Before JSON >>>>', imageReq);
                let resJson = await imageReq.json();
                setLoader(false);
                console.log('Edit Member Respons >>>>', resJson);
                if (resJson.code == 200) {
                    // alert(t('updated_user'));
                    dispatch(updateUser(resJson.data));
                    showAlert(t('alert'), t('updated_user'), t('ok'))
                    setAuthObj({ ...authObj, edit: false });
                }
                else {
                    alert(req.message);
                }

            } catch (error) {
                console.log('update user error >>>', error);
                setLoader(false);
            }
        }
    }

    async function selectProfilePic(index) {
        if (index == 0) {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
            }).then(async (image) => {
                console.log('image src', image);
                setAuthObj({
                    ...authObj,
                    photo: image.path,
                    // photo_obj:image
                })

                //}
            });
            //console.log('gallery image >>>', profileImage)

        }
        else if (index == 1) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
            }).then((image) => {
                console.log('Camera Pic >>', image);
                setAuthObj({
                    ...authObj,
                    photo: image.path,
                    //photo_obj:image
                })
               //  }

            });

        }
    }

    // console.log('Edit user >>>', authObj.edit)
    async function getUserDetails() {
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');

            let req = await HttpUtilsFile.get('user_details?' + query);
            console.log('Fetched user data >>>', req);
            if (req.code == 200) {
                setAuthObj({
                    ...authObj,
                    first_name: req?.data?.fname,
                    last_name: req?.data?.lname,
                    role: req?.data?.role,
                    phone: req?.data?.phone,
                    email: req?.data?.email,
                    family_key: req?.data?.family_name,
                    photo: req?.data?.image
                })
            }

        } catch (error) {

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

    useEffect(() => {
        getUserDetails();
        getDataRecord();

        return () => {
            handleClear()
        }
    }, [])

    // console.log('Photo Pic Profile >>>>>>>>>>', authObj.photo)

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                //style={{backgroundColor: 'white' }}
                contentContainerStyle={{ flexGrow: 1 }}
                //  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                enableOnAndroid={true}
                nestedScrollEnabled={true}
            >
                <View style={[styles.container, { margin: 20 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IonicIcon name="chevron-back" color={Global.main_color} size={30} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.profile_container}
                            disabled={!authObj.edit}
                            onPress={() => openSheet()}
                        >
                            {authObj.photo ?
                                <Image source={{ uri: authObj.photo }} style={styles.profile_photo} resizeMode='cover' />
                                :
                                <IonicIcon name="person" size={30} color={Global.dark_gray} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            zIndex: 0,
                            top: 20,
                            right: 15,
                            position: 'absolute',
                            // flexDirection: 'row',
                            // justifyContent: 'flex-end',
                        }}
                            onPress={() => setAuthObj({ ...authObj, edit: true })}
                        >
                            <IonicIcon name="create" color={Global.main_color} size={30} />

                        </TouchableOpacity>
                    </View>
                    {authObj.role && (
                        <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: Global.main_color }}>{`${t('role')} :`}</Text>
                            <Text style={{ marginHorizontal: 7 }}>{`${authObj.role}`}</Text>
                        </View>
                    )}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Components.InputField
                            placeholder={t('first_name_text')}
                            name={'first_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.first_name}
                            editable={authObj.edit}
                        />
                        {errorObj.first_name ? <Text style={styles.error}>{t('first_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t('last_name_text')}
                            name={'last_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.last_name}
                            editable={authObj.edit}
                        />
                        {errorObj.last_name ? <Text style={styles.error}>{t('last_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        {/* {authObj.edit ? (
                            <>
                                <Components.PhoneNumberInput
                                    name='phone'
                                    handleChange={handleChange}
                                    handleChangeFormatted={handleChange}
                                    phoneInput={phoneInput}
                                />
                                {errorObj.phone ? <Text style={styles.error}>{t('phone_validation')}</Text> : null}
                            </>
                        ) :
                            ( */}
                        <Components.InputField
                            placeholder={t('phone')}
                            name={'phone'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.phone}
                            editable={authObj.edit}
                        />
                        {/* )
                        } */}

                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t("Email")}
                            name={'email'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.email}
                            keyboardType={'email-address'}
                            editable={authObj.edit}
                        />
                        {errorObj.email ? <Text style={styles.error}>{t('email_validation')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        {/* <Components.InputField
                            placeholder="Family key (Optional)"
                            name={'family_key'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.family_key}
                            editable={authObj.edit}
                        /> */}
                        {authObj.edit && (
                            <>
                                <Components.InputField
                                    placeholder={t("password")}
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
                                <View style={{ margin: 5 }} />

                            </>
                        )}
                        {/* <View style={{ margin: 2 }} /> */}
                        <View style={{flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' ,alignItems:'center', borderRadius: 10, padding: 10, height: 50, backgroundColor: Global.inputs_bg }}>
                            <View style={{
                                backgroundColor: Global.lime_green,
                                borderRadius: 6,
                                height: 34,
                                width: 34,
                                alignItems: "center",
                                justifyContent: 'center'
                            }}>
                                <FontAwesome5Icon name={'dollar-sign'} size={18} color={Global.white} />
                            </View>
                            <View style={{marginHorizontal:10}}>
                                <Text style={{
                                     fontSize:11,
                                     fontWeight:'bold',
                                }}>{t('total_cost')}</Text>
                                <Text>{record?.cost}</Text>
                            </View>
                        </View>
                        {/* <Components.GraphCard
                                    title={t('total_cost')}
                                    icon_name={'dollar-sign'}
                                    data={`$${record?.cost}`}
                                    box_clr={Global.lime_green}
                                /> */}
                        {authObj.edit && (
                            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={t('save')}
                                        styleBtn={{ width: 120 }}
                                        loader={loader}
                                        onClick={handleSave}
                                        disabled={loader}
                                    />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={t('cancel')}
                                        styleBtn={{ width: 120, backgroundColor: Global.inputs_bg }}
                                        titleStyle={{ color: 'black' }}
                                        onClick={handleClear}
                                    />

                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <ActionSheet
                    ref={actionSheet}
                    title={t('choose_pic')}
                    options={optionArray}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={0}
                    onPress={(index) =>
                        selectProfilePic(index)
                    }
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    profile_container: {
        height: 120,
        width: 120,
        borderWidth: 1,
        borderColor: Global.inputs_bg,
        borderRadius: 120 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Global.inputs_bg
    },
    profile_photo: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
})
