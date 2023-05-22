import React from 'react';
import { TextInput, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';
import { useTranslation } from 'react-i18next';


 function InputField({
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
    // console.log('<<<<<****** Child Component TextField Render *****>>>>>');
  const input = {
    flex: 1,
   // marginTop: 5,
    height:50,
    paddingLeft: icon ? 15 : 10,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    color: '#424242',
    backgroundColor:Global.inputs_bg
  }

  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();

  return (
    <View style={[inputStyle ? inputStyle : styles.searchSection, {flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row' }]}>
      {icon && (
        <TouchableOpacity >
          <IonicIcon name={icon} color={Global.inputFieldPlaceHolder} size={20} />
        </TouchableOpacity>
      )}
      <TextInput
        style={[{...input, ...styleInputs}, {textAlign: isRTL == 'rtl' ? 'right' : 'left'} , multiple ? {minHeight:80 , maxHeight:120} : null]}
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
      {(placeholder === t('password') || placeholder === t('old_password') || placeholder === t('new_password') || placeholder === t('confirm_password')) && (
        <TouchableOpacity onPress={() => onPress()} style={styles.passEye}>
          <Icon5 name={secureTextEntry == true ? 'eye-slash' : 'eye'} color={Global.inputFieldPlaceHolder} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default InputField;

let styles = StyleSheet.create({
  searchSection: {
    // flexDirection: 'row',
    justifyContent: 'center',
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
