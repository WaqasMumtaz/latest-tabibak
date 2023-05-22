import React from 'react';
import { TextInput, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

 function SearchInput({
  placeholder,
  error,
  icon,
  secureTextEntry = false,
  handleChange,
  name,
  value,
  multiple,
  editable,
  inputStyle,
  styleInputs,
  inputPlaceholderStyle,
  keyboardType,
  onPress,
  maxLength,
  disabled
}) {
  //  console.log('TextField *****>>>>>', editable);
//   const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);
  const { t , i18n } = useTranslation();
  const isRTL = i18n.dir();
//   console.log('isRTL direction ***>>>>', isRTL);

  const input = {
    flex: 1,
   // marginTop: 5,
    height:50,
    paddingLeft: icon ? 15 : 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    color: '#424242',
    backgroundColor:Global.inputs_bg,
    textAlign:isRTL === 'rtl' ? 'right' : 'left'
  }

  const searchSection = {
    flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Global.inputs_bg,
    borderWidth: 3,
    borderColor: Global.inputs_bg,
    borderRadius: 12,
   // paddingLeft: 5,
  }

 
  return (
    <View style={inputStyle ? inputStyle : searchSection}>
      {icon  && (
        <View style={{marginLeft:10}}>
          <IonicIcon name={icon} size={25} />
        </View>
      )}
      <TextInput
        style={{...input, ...styleInputs}}
        placeholder={placeholder}
        onChangeText={(searchString) => handleChange(name, searchString)}
        underlineColorAndroid="transparent"
        placeholderTextColor={inputPlaceholderStyle ? 'gray' : Global.lightGray}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        value={value}
        multiple={multiple}
        noOfLines={4}
        editable={editable}
        maxLength={maxLength}
      />
      {/* {(icon && default_language === 'عربى') && (
        <TouchableOpacity >
          <IonicIcon name={icon} size={25} />
        </TouchableOpacity>
      )} */}
    </View>
  );
}

export default SearchInput;


let styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row-reverse',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Global.inputs_bg,
    borderWidth: 3,
    borderColor: Global.inputs_bg,
    borderRadius: 12,
   // paddingLeft: 5,
  },

  passEye: {
    margin: 10,
    color: Global.inputFieldPlaceHolder,

  },
});
