import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Components from '../../Components';
import { useTranslation } from 'react-i18next';
import Global from '../../Global';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import bankImg from '../../Assets/bank.png';
import spotImg from '../../Assets/cod.jpg';
import ImagePicker from 'react-native-image-crop-picker';
import HttpUtilsFile from '../../Services/HttpUtils';
import { useSelector, useDispatch } from 'react-redux'
import { updateAppointments } from '../../Redux/reducersActions/updateAppointments';
import { showAlert } from '../../../Functions';
import { useNavigation } from '@react-navigation/native';


const AppointmentForm = ({ route }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { doctor_id, category_id, specialist, name, category, offday, user_id, fees } = route.params;
    console.log('Appointment >>>', name);
    const [appointments, setAppointments] = useState(null);
    const [categories, setCategories] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        create: false,
        selected_date: '',
        time_slot: '',
        follow: '',
        selected_follow_up: '',
        comment: '',
        payment: '',
        bank_name: '',
        bank_account_name: '',
        bank_account_number: '',
        deposited_by: '',
        deposit_slip: '',
        img_obj: {}
    })
    const [errorObj, setErrorObj] = useState({
        bank_name: '',
        bank_account_name: '',
        bank_account_number: '',
        deposited_by: '',
        deposit_slip: ''
    })
    const { userData } = useSelector(state => state.persistedReducer.userReducer);
    const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);

    const [doctors, setDoctors] = useState(null);

    const [createAppLoader, setCreateAppLoader] = useState(false);

    const [openTimeSlots, setOpenTimeSlots] = useState(false);
    const [timeSlots, setTimeSlots] = useState([
        // { label: 'Apple', value: 'apple' },
        // { label: 'Banana', value: 'banana' }
    ]);
    const [openFollowUp1, setOpenFollowUp1] = useState(false);
    const [followUp1, setFollowUp1] = useState([
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
    ]);
    const [openFollowUp2, setOpenFollowUp2] = useState(false);
    const [followUp2, setFollowUp2] = useState([
        // { label: 'F1', value: 'f1' },
        // { label: 'F2', value: 'f2' }
    ]);

    const [selectedCategory, setSelectedCategory] = useState({
        id: undefined,
        name: ''
    });
    const [selectedDoctor, setSelectedDoctor] = useState({
        id: undefined,
        name: '',
        specialist: '',
        offday: offday,
        user_id: undefined,
        fees: undefined
    });

    function handleChange(name, value) {
        setAppointmentData({
            ...appointmentData,
            [name]: value
        })
    }

    function handleDoctor(params, specialist, offday, data) {
        console.log('Doctor Total Data >>>', data);
        setSelectedDoctor({
            id: data?.id,
            name: params.name,
            specialist,
            offday,
            user_id: data?.user_id,
            fees: data?.fees,
        });
    }

    function handleChangeDate(date) {
        setAppointmentData({
            ...appointmentData,
            selected_date: date
        })
    }

    function createAppointment(params) {
        setAppointments({
            ...appointments,
            create: true
        })
    }

    function addDepositedSlip() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
        }).then(async (image) => {
            console.log('image', image);
            // const imgData = new FormData();
            // imgData.append('images', { uri: image.path, name: 'photo', type: 'image/jpg' });
            // imgData.append('name', image.filename);
            // imgData.append('company_id', selectedCompany);
            // imgData.append('user_id', loginUser?.user_id)
            // console.log('Image form data >>>>', imgData._parts)
            // let imageReq = await fetch(Global.apiUrl + '/user/image_upload', {
            //     method: 'Post',
            //     headers: new Headers({
            //         Authorization: 'Bearer ' + loginUser?.token,
            //         // "Content-Type": "application/json",
            //     }),
            //     body: imgData,
            // });

            // let resJson = await imageReq.json();
            // console.log('Image ResJSon >>>>>', resJson);
            //if (resJson.status === 'Success') {
            setAppointmentData({
                ...appointmentData,
                deposit_slip: image.path,
                img_obj: image
            })

            //}
        });
        //console.log('gallery image >>>', profileImage)

    }

    const CATEGORIES = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        category: t('category_1'),
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
    const PLACEMENTS = [
        {
            id: 1,
            title: t('appointment_date'),
        },
        {
            id: 2,
            title: t('appointment_time')
        },
        {
            id: 3,
            title: t('appointment_day')
        },
        {
            id: 4,
            title: t('services')
        }

    ];

    const renderItem = (item, i) => (
        <View
            style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', margin: 10 }}
            key={i}
        >
            <RadioButton
                value={selectedCategory.name}
                status={item.id === selectedCategory.id ? 'checked' : 'unchecked'}
                // onPress={()=> handleCategories(item)}
                 onPress={() => setSelectedCategory({ id: item.id, name: default_language == 'ar' ? item?.translations[0]?.title : item?.translations[1]?.title })}
                color={Global.main_color}
            />
            <Text >
                {/* {item.name} */}
                {default_language == 'ar' ? item?.translations[0]?.title : item?.translations[1]?.title}
            </Text>
        </View>
    )

    async function fetchTimeSlot(doctor_id) {
        try {
            let appDate = moment(appointmentData.selected_date).format('YYYY-MM-DD');
            console.log('Time Slot Date Selected >>>', appointmentData.selected_date);
            let obj = {
                appdate: appDate,
                doctor_id,
            }
            // console.log('Time Slot Obj >>>', obj);
            let req = await HttpUtilsFile.post('getdoctorlistnew', obj, userData?.api_token);
            console.log('Time Slot Response *******>>>>>>>', req);
            if (req.code == 200) {
                // alert('Under condition')
                if (req.data.length == 0) setTimeSlots([]);
                else {
                    // alert('else')
                    let slots = [];
                    for (const iterator of req?.data) {
                        let obj = {
                            label: `${moment(iterator.start_time, 'hh:mm A').format('hh:mm A')} - ${moment(iterator.end_time, 'hh:mm A').format('hh:mm A')}`,
                            value: `${iterator.start_time} - ${iterator.end_time}`,
                            id: iterator.id,
                            disabled: iterator.disabled
                        }
                        slots.push(obj)
                    }
                    // console.log('Slots after change >>>', slots);
                    setTimeSlots(slots);
                }
            }

        } catch (error) {
            console.log('Fetch Time Slots Error >>>>', error);
        }

        return
        try {
            let params = {
                api_token: userData?.api_token
            };

            let query = Object.keys(params)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
            // console.log('Query >>>', query)
            let req = await HttpUtilsFile.get('getdoctorslot?' + query);
            if (req.data.length == 0) {
                setTimeSlots([])
            }
            else {
                let slots = [];
                for (const iterator of req?.data) {
                    let obj = {
                        label: `${moment(iterator.start_time, 'hh:mm A').format('hh:mm A')} - ${moment(iterator.end_time, 'hh:mm A').format('hh:mm A')}`,
                        value: `${iterator.start_time} - ${iterator.end_time}`,
                        id: iterator.id
                    }
                    slots.push(obj)
                }
                setTimeSlots(slots);

            }
        } catch (error) {

        }
    }

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
            //  console.log('Req of Categories >>', req);
            if (req.data.length == 0) {
                setCategories([])
            }
            else {
                //let arr = [...req.data];
                // arr.push({ id: 6, name: 'Family Tree' })
                setCategories(req.data)
            }

        } catch (error) {
            console.log('Error >>>', error);
        }
    }

    async function handleCreateAppointment() {
        const {
            selected_date,
            time_slot,
            follow,
            selected_follow_up,
            comment,
            payment,
            bank_name,
            bank_account_name,
            bank_account_number,
            deposited_by,
            deposit_slip,
            img_obj
        } = appointmentData;

        let errors = {};
        if (payment == 'bank') {
            // if (bank_name == '') {
            //     errors.bank_name = t('bank_name_err')
            // }
            // if (bank_account_name == '') {
            //     errors.bank_account_name = t('account_name_err')
            // }
            // if (bank_account_number == '') {
            //     errors.bank_account_number = t('account_number_err')
            // }
            // if (deposited_by == '') {
            //     errors.deposited_by = t('deposited_by_err')
            // }
            if (deposit_slip == '') {
                errors.deposit_slip = t('deposited_slip_err')
            }
        }
        setErrorObj(errors);
        let dt = moment(selected_date, "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3).toLowerCase();
        console.log('Dayy >>>', dt);
        console.log('off day selected doctor **>>>', selectedDoctor.offday);
        if (selectedDoctor.offday === dt) {
            // alert('This is off day of doctor');
            showAlert(t('alert'), t('doctor_off_day'), t('ok'))
        }
        else {
            if (Object.keys(errors).length === 0) {
                try {
                    setCreateAppLoader(true);
                    let timesSlots = [...timeSlots];
                    let indx = timesSlots.findIndex(x => x.value === time_slot);
                    if (indx != -1) {
                        //alert(timesSlots[indx].id);
                        //return
                        let appDate = moment(selected_date).format('YYYY-MM-DD');
                        let time_id = timesSlots[indx].id;
                        const formObj = new FormData();
                        formObj.append('appdate', appDate)
                        formObj.append('apptime', time_id)
                        formObj.append('slot_id', time_id)
                        formObj.append('DoctorsService', selectedDoctor.specialist == '' ? specialist : selectedDoctor.specialist)
                        formObj.append('selectdoctory', selectedDoctor.id == undefined ? doctor_id : selectedDoctor.id);
                        //formObj.append('selectdoctory', selectedDoctor.user_id == undefined ? user_id : selectedDoctor.user_id);
                        formObj.append('payment_method', payment);
                        formObj.append('comment', comment);
                        formObj.append('followup', follow);
                        formObj.append('followup_id', selected_follow_up);
                        formObj.append('fees', selectedDoctor.fees == undefined ? fees : selectedDoctor.fees)
                        //formObj.append('bank_deposite_slip', img_obj);
                        if (payment === 'bank') {
                            formObj.append('bank_deposite_slip', {
                                uri: deposit_slip,
                                type: img_obj.mime,
                                name: 'photo'
                            }
                            );
                        }
                        console.log('Data of appointment >>>>', formObj);
                        //return
                        // let req = await HttpUtilsFile.post('create-appointment', obj, userData?.api_token);
                        // console.log('Link >>>', Global.BASE_URL + '/create-appointment');
                        // console.log('Image form data >>>>', imgData._parts)
                        let imageReq = await fetch(Global.BASE_URL + '/create-appointment', {
                            method: 'Post',
                            headers: new Headers({
                                Authorization: 'Bearer ' + userData?.api_token,
                                // "Content-Type": "application/json",
                            }),
                            body: formObj,
                        });

                        let resJson = await imageReq.json();
                        console.log('Created Appointment Respons >>>>', resJson);
                        setCreateAppLoader(false)
                        if (resJson.code == 200) {
                            showAlert(t('tabibak'), t('appointment_created'), t('ok'))
                            dispatch(updateAppointments(true));
                            navigation.navigate('Bottom Tabs', { screen: t('appointments') });
                        }
                        // else {
                        //     if (resJson.message === 'Slot Already Booked') {
                        //         showAlert(t('tabibak'), t('slot_booked'), t('ok'))
                        //     }
                        // }

                    }

                } catch (error) {
                    setCreateAppLoader(false);
                    console.log('Error of create appointment', error);
                }
            }
        }

    }

    async function getFollowUps(_id) {
        try {
            // let params = {
            //     api_token: userData?.api_token
            // };

            // let query = Object.keys(params)
            //     .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            //     .join('&');
            let obj = {
                doctor_id: _id
            }
            console.log('Obj follow >>>', obj)
            let req = await HttpUtilsFile.post('followup-appointment', obj, userData?.api_token);
            console.log('Req response of follow ups >>>', req);
            if (req.code == 200) {
                let arr = [];
                req.data.map(items => {
                    let obj = {
                        label: items.id,
                        value: items.id
                    }
                    arr.push(obj)
                })
                setFollowUp2(arr);
            }

        } catch (error) {
            console.log('Error of follow ups api >>>', error);
        }
    }

    async function fetchDoctors(category_id) {
        //let timesSlots = [...timeSlots];
        // let indx = timesSlots.findIndex(x => x.value === appointmentData.time_slot);
        // if (indx != -1) {
        // alert(timesSlots[indx].id);
        //let appDate = moment(appointmentData.selected_date).format('YYYY-MM-DD');
        // let time_id = timesSlots[indx].id;
        let obj = {
            //appdate: appDate,
            // slot_id: time_id,
            // category_id: selectedCategory.id
            category_id
        }
        console.log('Doctor API data >>>', obj);
        try {
            let req = await HttpUtilsFile.post('getdoctorlistbycategory', obj, userData?.api_token);
            //let req = await HttpUtilsFile.post('getdoctorlist', obj, userData?.api_token);
            console.log('Req of Doctors >>', req);
            if (req.data.length == 0) {
                setDoctors([])
            }
            else {
                setDoctors(req.data);
            }

        } catch (error) {
            console.log('Error .>>>', error);
            setDoctors([])
        }
        // }
    }

    useEffect(() => {
        if (category_id == undefined) fetchCategories();
    }, [category_id])

    useEffect(() => {
        if (selectedCategory.id !== undefined && category_id == undefined) {
            fetchDoctors(selectedCategory.id);
        }
    }, [selectedCategory.id, category_id])

    useEffect(() => {
        if (doctor_id != undefined && appointmentData.selected_date != '') {
            getFollowUps(doctor_id);
            fetchTimeSlot(doctor_id);
        }

    }, [appointmentData.selected_date])

    useEffect(() => {
        if (selectedDoctor.id != undefined) {
            getFollowUps(selectedDoctor.id);
            fetchTimeSlot(selectedDoctor.id);
        }
    }, [selectedDoctor.id])

    // useEffect(() => {
    //     fetchTimeSlot();
    // }, [])

    console.log('Selected Doctor .>>>', doctor_id);

    return (
        <SafeAreaView style={styles.container}>
            <Components.TopBar title={t('make_appointment')} backIcon={true} />
            {/* <Text>This is Appointment Form</Text> */}
            {/* {(appointmentData.create == false && appointments == null) ?
                <View style={styles.noDataStyle}>
                    <FontAwesomeIcon name="calendar" color={Global.orange_clr} size={150} />
                    <View style={{ margin: 20 }} />
                    <Components.MyButton
                        title={t('create_appointment')}
                        onClick={createAppointment}
                    />
                </View>
                : */}
            {selectedDoctor.offday != null && (
                <View style={{ marginTop: 10, padding: 5, alignItems: isRTL == 'rtl' ? 'flex-start' : 'flex-end' }}>
                    <View style={{ padding: 5, paddingHorizontal: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', backgroundColor: Global.main_color, borderRadius: 7 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 5, color: 'white' }}>{t('off_day')}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 5, color: 'white' }}>:</Text>
                        <Text style={{ marginHorizontal: 5, color: 'white' }}>{selectedDoctor.offday}</Text>
                    </View>

                </View>
            )}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <View style={{ margin: 10 }}>
                        <Components.DatePicker
                            mode='date'
                            name={appointmentData.selected_date == '' ? 'dd/mm/yyyy' : moment(appointmentData.selected_date).format("DD/MM/YYYY")}
                            onChange={handleChangeDate}
                        />
                    </View>

                    {(appointmentData.selected_date != '' && category_id == undefined) && (
                        <>
                            {categories == null ?
                                <Components.Spinner />
                                :
                                categories?.length == 0 ?
                                    <Components.NoRecord />
                                    :
                                    <>
                                        {categories?.map((item, i) => renderItem(item, i))}
                                    </>


                                // <View style={{ margin: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                //     <Text style={{ color: Global.main_color, fontWeight: 'bold', fontSize: 18 }}>{t('category')}</Text>
                                // </View>
                                // <View style={{ margin: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                //     {categories?.map(item => renderItem(item))}
                                // </View>
                            }
                        </>
                    )}
                    {(selectedCategory.name !== '' && doctor_id == undefined) && (
                        <>
                            <View style={{ margin: 10 }}>
                                <View style={{alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start'}}>
                                    <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>{t('select_doctor')}</Text>
                                </View>
                                <ScrollView horizontal={true} >
                                    {doctors == null ?
                                        <Components.Spinner />
                                        :
                                        doctors?.length == 0 ?
                                            <Components.NoRecord />
                                            :
                                            <>
                                                {doctors?.map((item, i) => (<Components.DoctorCard data={item} handleDoctor={handleDoctor} selectedDoctor={selectedDoctor} key={i} />))}
                                            </>

                                    }
                                </ScrollView>
                            </View>

                        </>
                    )}
                    <View style={{ margin: 10 }}>
                        <Components.DropDown
                            placeholder={t('select_time_slot')}
                            list={timeSlots}
                            onChange={(value) => handleChange('time_slot', value())}
                            value={appointmentData.time_slot}
                            dropDownMaxHeight={150}
                            open={openTimeSlots}
                            style={styles.dropdown_inner_style}
                            setOpen={() => setOpenTimeSlots(openTimeSlots => !openTimeSlots)}
                            listMode="MODAL"
                            disabled={(doctor_id != undefined && appointmentData.selected_date == '') ? true : (doctor_id == undefined && selectedDoctor.id == undefined) ? true : false}
                        // disabled={appointmentData.selected_date == '' ? true : false}
                        />
                    </View>

                    {appointmentData?.time_slot != '' && (
                        <View style={{ margin: 10 }}>
                            <View style={{ flex: 1, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                <Text style={{ color: Global.dark_gray, fontWeight: 'bold', marginVertical: 5 }}>{t('date_time_req')}</Text>
                            </View>
                            <Components.DropDown
                                placeholder={t('follow_up')}
                                list={followUp1}
                                onChange={(value) => handleChange('follow', value())}
                                value={appointmentData.follow}
                                dropDownMaxHeight={150}
                                open={openFollowUp1}
                                style={styles.dropdown_inner_style}
                                setOpen={() => setOpenFollowUp1(openFollowUp1 => !openFollowUp1)}
                                listMode="MODAL"
                                disabled={(doctor_id == undefined && selectedDoctor.id == undefined) ? true : false}
                            />
                        </View>
                    )}
                    {appointmentData.follow == 'yes' && (
                        <>

                            <View style={{ margin: 10 }}>
                                <Components.DropDown
                                    placeholder={t('select_follow')}
                                    list={followUp2}
                                    onChange={(value) => handleChange('selected_follow_up', value())}
                                    value={appointmentData.selected_follow_up}
                                    dropDownMaxHeight={150}
                                    open={openFollowUp2}
                                    style={styles.dropdown_inner_style}
                                    setOpen={() => setOpenFollowUp2(openFollowUp2 => !openFollowUp2)}
                                    listMode="MODAL"
                                />
                            </View>
                        </>
                    )}
                    {(doctor_id != undefined || selectedDoctor.id != undefined) && (
                        <>
                            {appointmentData?.time_slot != '' ? (
                                <View style={{ margin: 10 }}>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ color: Global.main_color, fontWeight: 'bold', marginVertical: 5 }}>{t('placement_head')}</Text>
                                    </View>
                                    <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text>{name == undefined ? `${selectedDoctor?.name} ${t('appointment')}` : `${name} ${t('appointment')}`}</Text>
                                        <Text style={{ color: Global.main_color }}>{`(30 min)`}</Text>
                                    </View>
                                    <View style={styles.cardContainer}>
                                        {PLACEMENTS.map((v, i) => {
                                            return [
                                                i != 0 && (
                                                    <View style={{ borderWidth: 0.5, borderColor: Global.dark_gray }} key={v.id} />
                                                ),
                                                <View style={{ backgroundColor: Global.inputs_bg, height: '25%', justifyContent: 'center', padding: 5 }} key={i}>
                                                    <View
                                                        style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}
                                                    >
                                                        <View style={{ flex: 1, alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start' }}>
                                                            <Text style={{ fontWeight: 'bold' }}>{v.title}</Text>
                                                        </View>
                                                        {v.id == 1 && (<Text>{appointmentData?.selected_date ? moment(appointmentData?.selected_date).format("DD/MM/YYYY") : ''}</Text>)}
                                                        {v.id == 2 && (<Text>{appointmentData?.time_slot}</Text>)}
                                                        {v.id == 3 && (<Text>{appointmentData?.selected_date ? moment(appointmentData?.selected_date, "YYYY-MM-DD HH:mm:ss").format('dddd') : ''}</Text>)}
                                                        {v.id == 4 && (<Text>{category ? category : selectedCategory?.name}</Text>)}
                                                    </View>
                                                </View>
                                            ]

                                        })}
                                    </View>
                                    <View style={{ marginVertical: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text>{t('brief_comment')}</Text>
                                    </View>
                                    <Components.InputField
                                        placeholder={t('comment')}
                                        name={'comment'}
                                        handleChange={(name, value) => handleChange(name, value)}
                                        value={appointmentData.comment}
                                        multiple={true}
                                    />
                                    <View style={{ marginTop: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }}>
                                        <Text style={{ fontWeight: '600', color: Global.main_color }}>{t('select_payment')}</Text>
                                    </View>
                                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => handleChange('payment', 'bank')}
                                            style={appointmentData.payment == 'bank' ? styles.selectedBtnPayment : styles.paymentBtnStyle}
                                        >
                                            <Components.ImagePlaceholder
                                                src={bankImg}
                                                _style={styles.imgStyle1}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleChange('payment', 'spot')}
                                            style={appointmentData.payment == 'spot' ? styles.selectedBtnPayment : styles.paymentBtnStyle}
                                        >
                                            <Components.ImagePlaceholder
                                                src={spotImg}
                                                _style={styles.imgStyle1}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {appointmentData.payment == 'bank' && (
                                        <View style={{ marginTop: 10 }}>
                                            {/* <Components.InputField
             placeholder="Bank Name"
             name={'bank_name'}
             handleChange={(name, value) => handleChange(name, value)}
             value={appointmentData.bank_name}
         />
         {errorObj.bank_name ? (
             <Text style={styles.error}>{errorObj.bank_name}</Text>
         ) : (
             null
         )}
         <View style={{ margin: 10 }} />
         <Components.InputField
             placeholder="Bank Account Name"
             name={'bank_account_name'}
             handleChange={(name, value) => handleChange(name, value)}
             value={appointmentData.bank_account_name}
         />
         {errorObj.bank_account_name ? (
             <Text style={styles.error}>{errorObj.bank_account_name}</Text>
         ) : (
             null
         )}
         <View style={{ margin: 10 }} />
         <Components.InputField
             placeholder="Bank Account Number"
             name={'bank_account_number'}
             handleChange={(name, value) => handleChange(name, value)}
             value={appointmentData.bank_account_number}
         />
         {errorObj.bank_account_number ? (
             <Text style={styles.error}>{errorObj.bank_account_number}</Text>
         ) : (
             null
         )}
         <View style={{ margin: 10 }} />
         <Components.InputField
             placeholder="Deposited by"
             name={'deposited_by'}
             handleChange={(name, value) => handleChange(name, value)}
             value={appointmentData.deposited_by}
         />
         {errorObj.deposited_by ? (
             <Text style={styles.error}>{errorObj.deposited_by}</Text>
         ) : (
             null
         )} */}
                                            {appointmentData.deposit_slip ?
                                                <View style={{ marginTop: 15, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: "center" }}>
                                                    <Components.ImagePlaceholder
                                                        uri={appointmentData.deposit_slip}
                                                        _style={{ height: 80, width: 80 }}
                                                    />
                                                    <TouchableOpacity
                                                        style={{ margin: 10 }}
                                                        onPress={() => setAppointmentData({ ...appointmentData, deposit_slip: '' })}
                                                    >
                                                        <Text style={{ color: 'red', textDecorationLine: 'underline' }}>{t('remove_file')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <>
                                                    <View style={{ margin: 10, flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                                        <Text style={{ margin: 10 }}>{t('deposit_slip')}</Text>

                                                        <TouchableOpacity
                                                            style={styles.chooseFileBtn}
                                                            onPress={() => addDepositedSlip()}
                                                        >
                                                            <Text style={{ fontWeight: 'bold' }}>{t('choose_file')}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    {errorObj.deposit_slip ? (
                                                        <Text style={styles.error}>{errorObj.deposit_slip}</Text>
                                                    ) : (
                                                        null
                                                    )}
                                                </>
                                            }

                                        </View>
                                    )}
                                    {(appointmentData.payment == 'bank' || appointmentData.payment == 'spot') && (
                                        <View style={{ margin: 10 }}>
                                            <Components.MyButton
                                                title={t('create')}
                                                onClick={handleCreateAppointment}
                                                loader={createAppLoader}
                                            // titleStyle={{ fontWeight: '500', color: Global.main_color }}
                                            />
                                        </View>
                                    )}
                                </View>
                            ) : null}
                        </>


                    )}
                </View>
            </ScrollView>
            {/* } */}
        </SafeAreaView>
    )
}

export default AppointmentForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noDataStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        margin: 10
    },
    contentContainer: {
        flexGrow: 1,
        // paddingVertical: 20
    },
    dropdown_inner_style: {
        backgroundColor: Global.inputs_bg,
        borderColor: Global.inputs_bg
    },
    textStyle: {
        fontWeight: 'bold',
        // textAlign: 'center',
        color: Global.dark_gray
    },
    cardContainer: {
        borderWidth: 2,
        borderColor: Global.inputs_bg,
        borderRadius: 10,
        height: 200
    },
    imgStyle1: {
        height: '100%',
        width: '100%',
        resizeMode: ''
    },
    selectedBtnPayment: {
        borderWidth: 2,
        height: 70,
        width: '46%',
        borderColor: Global.main_color
    },
    paymentBtnStyle: {
        height: 70,
        width: '46%',
        margin: 10,
    },
    chooseFileBtn: {
        borderWidth: 1,
        padding: 10,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },

})
