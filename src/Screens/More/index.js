import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import Components from '../../Components';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import Global from '../../Global';
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '../../Redux/reducersActions/userReducer';
import { changeLanguage } from '../../Redux/reducersActions/changeLanguage';
import ActionSheet from 'react-native-actionsheet';
import HttpUtilsFile from '../../Services/HttpUtils';


const More = () => {
  const navigation = useNavigation();
  let actionSheet = useRef();
  const dispatch = useDispatch();
  // const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);
  const { userData } = useSelector(state => state.persistedReducer.userReducer);
  const [loader , setLoader] = useState(false);

  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir();

  let optionArray = [
    'English',
    'عربى',
    t('cancel'),
  ];
  const openSheet = () => {
    actionSheet.current.show();
  }

  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: t('lang'),
    icon: 'globe',

  }
  , 
  // {
  //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //   title: t('profile'),
  //   icon: 'person',

  // }, 
  
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: t('member'),
    icon: 'person-add'
    // title: t('licence'),
    // icon: "logo-usd",

  }, 
  // {
  //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //   title: t('about_us'),
  //   icon: 'people-circle-outline',
  // },
  // {
  //   id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //   title: 'Learn',
  //   icon: "information-circle",

  // },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d73",
    title: t('logout'),
    icon: "log-out",

  }
  ]

  async function logout() {
    setLoader(true);
    try {
      let params = {
        api_token: userData?.api_token
      };

      let query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
      // console.log('Query >>>', query)
      let req = await HttpUtilsFile.get('logout?' + query);
      console.log('Logout response .>>>>>', req);
      setLoader(false);
      dispatch(updateUser(null))

    } catch (error) {
      console.log('Error logout >>>>>', error);
      setLoader(false);

    }
  }

  function handleNavigate(title) {
    if (title === t('logout')) {
      Alert.alert(
        `${t('alert')}`,
        `${t('logout_alert')}`,
        [
          {
            text: `${t('no')}`,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: `${t('yes')}`, onPress: () => logout()}
        ]
      );
    }
    else if (title === t('lang')) {
      openSheet()
    }
    // else if (title === t('profile')) {
    //   navigation.navigate('Profile');
    // }
    else if (title === t('member')) {
      navigation.navigate('Family Members');
    }
    // else if(title === t('about_us')){
    //   navigation.navigate('About');
    // }
    else if(title === 'Learn'){
      navigation.navigate('Learn');
    }

    // navigation.navigate('Detail', { title , detail, point_1, point_2, point_3 });
  }

  async function selectLang(index) {
    console.log('Language index >>>>>>>>>', index);
    dispatch(changeLanguage(index == 0 ? 'en' : 'ar'))
  }


  const renderItems = ({ item }) => (
    <TouchableOpacity
      style={[styles.cardList, { flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }]}
      onPress={() => handleNavigate(item.title)}
    >
      <View style={{ marginLeft: 10 }}>
        <IonicIcon name={item.icon} color={Global.main_color} size={27} />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )


  console.log('RTL >>>>', isRTL);
  //isRTL === 'rtl' ? 'right' : 'left'

  return (
    <SafeAreaView style={styles.container}>
      <Components.TopBar title={t('more')} />
      <View style={{ flex: 1, }}>
        <FlatList
          data={DATA}
          renderItem={renderItems}
          keyExtractor={item => `item_${item.id}`}
          ItemSeparatorComponent={() => (<View></View>)}
        />
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
      {loader && <Components.ModalSpinner/>}
    </SafeAreaView>
  )
}

export default More

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  cardList: {
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Global.inputs_bg,
    padding: 10,
    height: 60,
    marginTop: 12
  }
})