import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Platform, Linking, Dimensions } from 'react-native';
import Global from '../../Global';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import SearchInput from '../SearchInput';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'


export default function TopBar({ title, home = false, backBtn, backIcon = false, user_name }) {
  const navigation = useNavigation();
  const { userData } = useSelector(state => state.persistedReducer.userReducer);

  const [searchValue, setSearchValue] = useState({
    name: ''
  });

  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();

  function handleChange(name, value) {
    setSearchValue({
      ...searchValue,
      [name]: value
    })
  }

  function moveProfile() {
    navigation.navigate('Profile');
  }

  console.log('User Data TopBar >>>>>', userData);


  return home ? (
    <>
      <View style={styles.homeTopBarStyle}>
        <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center' }}>
          <TouchableOpacity style={[styles.profile_container]} onPress={() => moveProfile()}>
            {userData?.image ?
              <Image source={{ uri: userData?.image }} style={{ height: 50, width: 50, borderRadius: 50 / 2 }} />
              :
              <IonicIcon name="person" size={40} color={Global.dark_gray} />

            }
          </TouchableOpacity>
          <View style={{ marginHorizontal: 10, alignItems: isRTL == 'rtl' ? 'flex-end' : 'flex-start' }}>
            <Text style={[styles.welcomText, { fontSize: isRTL == 'rtl' ? 18 : 14 }]}>{t('welcome')}</Text>
            <Text style={styles.topBarText} numberOfLines={1} ellipsizeMode='tail'>{`${userData?.fname} ${userData?.lname}`}</Text>
          </View>
        </View>
      </View>
      <View style={{
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Global.main_color
      }} />
      {/* <View style={{ flex: 1, height: '100%', backgroundColor: Global.main_color, borderBottomLeftRadius: 20 }} />
        <View style={{ flex: 1, height: "100%", backgroundColor: Global.main_color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ zIndex: 0, position: 'absolute' }}>
            <View style={[styles.profile_container, { bottom: -15 }]}>
              <IonicIcon name="person" size={40} color={Global.dark_gray} />
            </View>
          </View>

        </View>
        <View style={{ flex: 1, height: '100%', backgroundColor: Global.main_color, borderBottomRightRadius: 20 }} />
      </View> */}
    </>

  ) : backIcon ? (
    <View style={[Platform.OS === 'android' ? styles.androidTopBarWithIcon : styles.iosWithIcon]}>
      <TouchableOpacity
        onPress={() => (backBtn ? backBtn() : navigation.goBack())}
      // onPress={() => navigation.dispatch(
      //   StackActions.push('Main'))}
      >
        <Icon name="chevron-left" iconStyle={styles.topBarMenuIcon} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={[styles.topBarText, { fontSize: isRTL == 'rtl' ? 18 : 14 }]} numberOfLines={1} ellipsizeMode='tail'>
          {title}
        </Text>
      </View>
    </View>
  )
    :
    (
      <View style={styles.androidTopBar}>
        <Text style={[styles.topBarText, { fontSize: isRTL == 'rtl' ? 18 : 14 }]} numberOfLines={1} ellipsizeMode='tail'>
          {title}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  androidTopBarWithIcon: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Global.main_color,

    // marginTop:20
  },
  homeTopBarStyle: {
    backgroundColor: Global.main_color,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    //marginTop:20,
    // alignItems:"center",
    // height: '16%',
    //borderBottomRightRadius: 20,
    //borderBottomLeftRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 10
  },
  containerText: {
    position: 'relative',
    elevation: 3,
    //  backgroundColor: '#FB8500',
    // padding: 3,
    borderRadius: 12,
    marginHorizontal: '6%',
    top: 37,
    // left:-30,
    // right:-30
    // marginTop: 30,
    // marginLeft: -10,
  },
  androidTopBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Global.main_color,
    alignItems: 'center',
    justifyContent: "center",
  },
  iosWithIcon: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    // marginTop:20,
    //paddingTop:30,
    backgroundColor: Global.main_color,
    justifyContent: 'space-between',
  },
  iosContainer: {
    flexDirection: 'row',
    padding: 8,
    // backgroundColor: Global.screensBackground,
    alignItems: 'center',
    justifyContent: "center",
    // marginTop:20
    //  paddingTop:30,
  },
  topBarText: {
    color: Global.white,
    fontSize: 15,
    fontWeight: 'bold',
    //padding: 5,
    textTransform: 'uppercase',
  },
  welcomText: {
    color: Global.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  topBarMenuIcon: {
    color: Global.white,
    fontSize: 32,
    // padding: 5,
    fontWeight: 'bold',
  },
  topBarIcon: {
    color: Global.main_color,
    fontSize: 26,
    padding: 5,
    fontWeight: 'bold',
  },
  sideIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bgImg: {
    height: 70,
    width: '100%',
  },
  update_btn: {
    borderWidth: 2,
    borderColor: Global.screensBackground,
    borderRadius: 7,
    padding: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Global.screensBackground
    //marginLeft:12,
  },
  profile_container: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Global.inputs_bg,
    backgroundColor: Global.white,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 3
  }
});
