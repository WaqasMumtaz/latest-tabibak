import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native'
import Components from '../../Components'
import { useTranslation } from 'react-i18next';
import Global from '../../Global';
import { hasMixed, hasNumber, hasSpecial, hasValidLength } from '../../Global/password';
import { alertDialog ,showAlert} from '../../../Functions';
import HttpUtilsFile from '../../Services/HttpUtils';
import { useSelector } from 'react-redux';

const FamilyMembers = () => {
    let phoneInput = useRef(null);
    const [DATA, setDATA] = useState(null);
    const [visible, setVisible] = useState(true);
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const { userData } = useSelector(state => state.persistedReducer.userReducer);

    const { t, i18n } = useTranslation();

    const [authObj, setAuthObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        family_key: '',
        form_type: 'add'
    })

    const [errorObj, setErrorObj] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: ''
    })


    const isRTL = i18n.dir();

    function deleteMember(i) {
        console.log('iiiii member >>>', i);
        let users = [...DATA];
        let indx = users.findIndex(x => x.value === i);
        if(indx != -1){
             users.splice(indx, 1);
             showAlert(t('alert'),isRTL == 'rtl' ? 'تمت إزالة المستخدم بنجاح' : 'User successfully removed', t('ok'));
             setDATA(users)
        }

    }

    function userOperation(params, data) {
        console.log('Params >>>', params, data);
        if (params === 'edit'){ 
            setAuthObj({
                ...authObj,
                first_name:data.first_name,
                last_name:data.last_name,
                fullName:data.label,
                form_type:'edit'
            })
            setModal(modal => !modal);
        }
        else if (params === 'delete') alertDialog(t('alert'), t('delete_member'), deleteMember, data.value, options={yes:t('yes'), no:t('no')});
        else if (params === 'view') {
            setAuthObj({
                ...authObj,
                // first_name:data.first_name,
                // last_name:data.last_name,
                fullName:data.name,
                form_type:'view'
            })
            setModal(modal => !modal);
        }
    }

    function handleModal() {
        setModal(modal => !modal)
    }

    function handleChange(name, value) {
        console.log('Name >>>>>>', name, 'Value >>>>>>', value);
        setAuthObj({
            ...authObj,
            [name]: value,
        });
    }
    function handleChangeFormatted(params) {
        console.log('Get Country *****>>>>>>>>>', params);
    }

    async function fetchFamilyMembers(params) {
        // let data = [];
        // const res = [{
        //     value: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        //     first_name: 'Ahmed',
        //     last_name:'Ali'

        // }, {
        //     value: "58694a0f-3da1-471f-bd96-145571e29d72",
        //     first_name: 'Zain',
        //     last_name:'Abbas'

        // }, {
        //     value: "68694a0f-3da1-431f-bd56-142371e29d72",
        //     first_name: 'Qureshi',
        //     last_name:'Qais'
        // }, {
        //     value: "28694a0f-3da1-471f-bd96-142456e29d72",
        //     first_name: 'Naeem',
        //     last_name:'Badar'
        // },
        // {
        //     value: "28694a0f-3da1-471f-bd96-142456e29d73",
        //     first_name: 'Nabi',
        //     last_name:'Noor'
        // }
        // ]
        // setDATA(res);
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('getfamilymembers?' + query);
            console.log('Family members res >>>>', req);
            if(req.data.length > 0){
                setDATA(req.data);
            }else {
                setDATA([]);
            }
            
            
        } catch (error) {
            console.log('Fetching family members error >>>', error)
        }

        // if (isRTL === 'rtl') {
        //     for (const iterator of res) {
        //         const result = await translate(`${iterator.first_name}`, {
        //             tld: "cn",
        //             to: "ar",
        //         });
        //         console.log('After Change lang name >>>>', result);
        //         // let obj = {
        //         //     ...iterator,
        //         //     label: result[0]
        //         // }
        //         // data.push(obj);
        //     }
        //     // console.log('After Change lang name >>>>', data);
        //     setDATA(data);
        // }
       // else {
           // setDATA(res);
        //}

    }

    async function handleSave() {
        // console.log('User Data ****>>>>>', authObj)
        let { email, password, first_name, last_name, phone, family_key } = authObj;
        let errors = {};
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        //   return
        if (Global.email_validation.test(email.replace(' ', '')) === false) {
            errors.email = 'Please enter a valid email.';
        }
        console.log('Password Error >>', hasValidLength(password));
        if (!hasValidLength(password)) {
            errors.password = "Your password must have 8 or more characters"
        }
        // else {
        //     errors.password = ''
        // }
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
        // console.log(phoneInput.current?.isValidNumber(phone), 'PHONE');
        // if (phoneInput.current?.isValidNumber(phone) == false) {
        //     errors.phone = 'Phone number is not valid';

        // }
        console.log('Errors Details >>>>', errors);
        setErrorObj(errors);
        if (Object.keys(errors).length === 0) {
            setLoader(true)
            try {
                let obj = {
                    name:`${first_name} ${last_name}`,
                    email:email,
                    phone:phone,
                    password:password
                }
                console.log('Added Member Obj ***>>>>', obj);
                let req = await HttpUtilsFile.post('addfamily', obj, userData?.api_token);
                console.log('Added Member Respons >>>>', req);
                setLoader(false);
                if(req.code == 200){
                    alert(req.message);
                    handleClear();
                    handleModal();
                    fetchFamilyMembers();
                }
                else {
                    alert(req.message);
                }
                
            } catch (error) {
                console.log('Error >>>>', error);
                setLoader(false);
            }
            // setTimeout(()=>{
            //     setLoader(false);
            //     dispatch(updateUser(authObj));
            // },2000)
        }
    }

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
        })
        setErrorObj({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password: ''
        })
        setLoader(false);
    }


    useEffect(() => {
        fetchFamilyMembers();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('users')} backIcon={true} />
            <Components.MembersList
                data={DATA}
                userOperation={userOperation}
                // listStyle={{ flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
                isRTL={isRTL}
            />
            <Components.FABComponent
                visible={visible}
                iconDetail={{ name: 'add', color: 'white' }}
                color={Global.main_color}
                placement='right'
                size='large'
                onPress={handleModal}
            />
            <Components.ModalScreen
                modalVisible={modal}
                title={t('add_member')}
                handleModal={handleModal}
                transparent={false}
            >
                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t('first_name_text')}
                            name={'first_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.first_name}
                            editable={(authObj.form_type === 'add' || authObj.form_type === 'edit') ? true : false}
                            styleInputs={{textAlign: (isRTL == 'rtl' && authObj.form_type === 'view') ? 'right' : 'left'}}
                        />
                        {errorObj.first_name ? <Text style={styles.error}>{t('first_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t('last_name_text')}
                            name={'last_name'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.last_name}
                            editable={(authObj.form_type === 'add' || authObj.form_type === 'edit') ? true : false}
                            styleInputs={{textAlign: (isRTL == 'rtl' && authObj.form_type === 'view') ? 'right' : 'left'}}

                        />
                        {errorObj.last_name ? <Text style={styles.error}>{t('last_name')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        {/* <Components.PhoneNumberInput
                            name='phone'
                            value={authObj.phone}
                            handleChange={handleChange}
                            handleChangeFormatted={handleChangeFormatted}
                            phoneInput={phoneInput}
                        /> */}
                        <Components.InputField
                            placeholder={t("phone")}
                            name={'phone'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.phone}
                            keyboardType='phone-pad'
                            editable={(authObj.form_type === 'add' || authObj.form_type === 'edit') ? true : false}
                            styleInputs={{textAlign: (isRTL == 'rtl' && authObj.form_type === 'view') ? 'right' : 'left'}}

                        />
                        {errorObj.phone ? <Text style={styles.error}>{t('phone_validation')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t("email")}
                            name={'email'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.email}
                            keyboardType={'email-address'}
                            editable={(authObj.form_type === 'add' || authObj.form_type === 'edit') ? true : false}
                            styleInputs={{textAlign: (isRTL == 'rtl' && authObj.form_type === 'view') ? 'right' : 'left'}}

                        />
                        {errorObj.email ? <Text style={styles.error}>{t('email_validation')}</Text> : null}
                        <View style={{ marginBottom: 15 }} />
                        <Components.InputField
                            placeholder={t('family_key_optional') }
                            name={'family_key'}
                            handleChange={(name, value) => handleChange(name, value)}
                            value={authObj.family_key}
                            editable={(authObj.form_type === 'add' || authObj.form_type === 'edit') ? true : false}
                            styleInputs={{textAlign: (isRTL == 'rtl' && authObj.form_type === 'view') ? 'right' : 'left'}}

                        />
                        <View style={{ marginBottom: 15 }} />
                        {authObj.form_type === 'add' ? (
                            <>
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
                            </>
                        )
                            :
                            null
                        }
                        {(authObj.form_type === 'edit' || authObj.form_type === 'add') ? (
                            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={authObj.form_type === 'add' ? t('add') : t('save')}
                                        styleBtn={{ width: 120 }}
                                        loader={loader}
                                        onClick={handleSave}
                                    />
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Components.MyButton
                                        title={t('clear')}
                                        styleBtn={{ width: 120, backgroundColor: Global.inputs_bg }}
                                        titleStyle={{ color: 'black' }}
                                        onClick={handleClear}
                                    />

                                </View>
                            </View>
                        )
                            :
                            null
                        }
                    </View>
                </ScrollView>
            </Components.ModalScreen>
        </SafeAreaView>
    )
}

export default FamilyMembers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    error: {
        textAlign: 'center',
        color: 'red',
    }
})
