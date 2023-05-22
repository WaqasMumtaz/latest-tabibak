import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import Components from '../../Components'
import Global from '../../Global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { hasMixed, hasNumber, hasSpecial, hasValidLength } from '../../Global/password';
import HttpUtilsFile from '../../Services/HttpUtils';
import { showAlert } from '../../../Functions'

const SignUp = ({ handleState }) => {
    const phoneInput = useRef(null);
    const [loader , setLoader] = useState(false);

    const [authObj, setAuthObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country_code:'',
        password: '',
        family_key: null
    })

    const [errorObj, setErrorObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    })

    const { t , i18n} = useTranslation();
    const isRTL = i18n.dir();

    function handleChange(name, value) {
        //  console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }
    function handleChangeFormatted(params) {
        console.log('Phone Number Formatted *****>>>>>>>>>', params);
        setAuthObj({
            ...authObj,
            country_code: params.callingCode[0],
        });
    }

    async function handleLogin() {
        // console.log('User Data ****>>>>>', authObj)
        let { email, password, first_name, last_name, phone, family_key , country_code} = authObj;
        let errors = {};
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        //   return
        if (Global.email_validation.test(email.replace(' ', '')) === false) {
            errors.email = 'Please enter a valid email.';
        }
        //console.log('Errors >>', errors);
        if (!hasValidLength(password)) {
            errors.password = "Your password must have 8 or more characters"
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

        if (first_name == '' || !/^[a-zA-Z]+$/.test(first_name)) {
            errors.first_name = 'First Name is required and may only contain letters';

        }
        if (last_name == '' || !/^[a-zA-Z]+$/.test(last_name)) {
            errors.last_name = 'Last Name is required and may only contain letters';

        }
        console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        if (phoneInput.current?.isValidNumber(phone) == false) {
            errors.phone = 'Phone number is not valid';

        }
        setErrorObj(errors);
        if (Object.keys(errors).length === 0) {
             setLoader(true);
            let data = {
                email, 
                // name: `${first_name} ${last_name}`,
                fname: first_name,
                lname: last_name,
                phone: `${country_code}${phone}`, 
                password,
                family_key,
                role:'patient'
            }
            try {
                console.log('Register User Data >>>>', data);
               // return
                let req = await HttpUtilsFile.post('register', data);
                console.log('REgister Request Response >>>>', req);
                setLoader(false);
                if(req.message === 'Email Already Exist'){
                    alert(req.message)
                }
                else {
                    alert(req.message);
                    console.log('Else User Data >>>>', data);
                    if(req.code == 200){
                        clearForm();
                        handleState(1);
                    }
    
                }
                
            } catch (error) {
                console.log('Error >>>', error);
                showAlert(t('alert'), t('oops'), t('ok'))
            }
        }
    }

    function clearForm() {
        setAuthObj({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            country_code:'',
            password: '',
            family_key: null
        })
    }

    return (
        <KeyboardAwareScrollView
            style={{backgroundColor: 'white' }}
            contentContainerStyle={{ flexGrow: 1 }}
            //  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
             enableOnAndroid={true}
        >
             <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Components.Logo />
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={t('first_name_text')}
                        name={'first_name'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.first_name}
                    />
                    {errorObj.first_name ? <Text style={styles.error}>{t('first_name')}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={t('last_name_text')}
                        name={'last_name'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.last_name}
                    />
                    {errorObj.last_name ? <Text style={styles.error}>{t('last_name')}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.PhoneNumberInput
                        name='phone'
                        handleChange={handleChange}
                        handleChangeFormatted={handleChangeFormatted}
                        phoneInput={phoneInput}
                    />
                    {/* <Components.InputField
                        placeholder="Phone"
                        name={'phone'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.phone}
                    /> */}
                     {errorObj.phone ? <Text style={styles.error}>{t('phone_validation')}</Text> : null} 
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={t('email')}
                        name={'email'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.email}
                        keyboardType={'email-address'}
                    />
                    {errorObj.email ? <Text style={styles.error}>{t('email_validation')}</Text> : null}
                    <View style={{ marginBottom: 15 }} />
                    <Components.InputField
                        placeholder={`${t('family_key_optional')}`}
                        name={'family_key'}
                        handleChange={(name, value) => handleChange(name, value)}
                        value={authObj.family_key}
                    />
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
                        title={t('signUp')}
                        onClick={handleLogin}
                        loader={loader}
                    />

                    <View style={{margin:30, justifyContent: 'center', alignItems: "center", alignSelf: 'center' }}>
                        <TouchableOpacity style={{}} onPress={() => handleState(1)}>
                            <Text style={{ color: 'gray', fontSize: isRTL == 'rtl' ? 16 : 13 }}>
                                {t('already_registerd')}{' '}
                                <Text style={{ color: Global.buttons_bg, textDecorationLine: 'underline', fontSize: isRTL == 'rtl' ? 16 : 13 }}>{t('Login')}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
             </View> 
        </KeyboardAwareScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
})
