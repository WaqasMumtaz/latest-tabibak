import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Global from './../../Global';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

const DatePicker = ({ onChange, name, getDateType,styleText, styleData, disabled,visible, mode, ...rest }) => {
  const [pickerMode, setPickerMode] = useState(null);
 // let tomorrow  = moment().add(1,'days');
  // var date = moment(tomorrow);
  // console.log('Tomorrow Date >>', date);
  // console.log('Today Date >>>>', new Date());

  const showDatePicker = () => {
   // alert(mode)
    setPickerMode(mode);
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    hidePicker();
    let t = date;
    onChange(t);
  };

  // React.useEffect(() => {
  // setPickerMode(getDateType)
  // }, []);
  console.log("pickerMode >>>", pickerMode);
  return (
    <View style={style.root}>
      <TouchableOpacity
        style={[styleData ? styleData : style.dateStyle]}
        onPress={showDatePicker}
        disabled={disabled}
        >
        <Text style={[styleText ? styleText : style.textStyle, {opacity: disabled ? 0.2 : null}]}>
          {name}
        </Text>
        <FontAwesomeIcon name="calendar" color={Global.main_color} size={25} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={pickerMode != null}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        minimumDate={new Date()}
      />
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  dateStyle: {
    //flex:1,
    width: '100%',
    height:50,
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    backgroundColor: Global.inputs_bg,
    // margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  textStyle:{
    textAlign: 'center', 
    fontSize: 18, 
    color: Global.main_color ,
    fontWeight:'bold'
  }
});

export default DatePicker;
