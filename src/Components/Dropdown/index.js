import React, { useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Global from '../../Global';
import { useSelector } from 'react-redux';

export default function DropDown({
  placeholder,
  list,
  onChange,
  value,
  noTitle,
  searchable,
  multiple,
  disabled,
  multipleText,
  selected,
  multiValue,
  open,
  setOpen,
  zIndex,
  dropDownMaxHeight,
  mainContainer_style,
  style,
  labelStyle,
  listMode,
  arrowIconStyle,
  translation,
  placeholderStyle,
  placeholderClr,
  setItems,
  badge
}) {
  const { default_language } = useSelector(state => state.persistedReducer.changeLanguage);

  DropDownPicker.setLanguage(default_language === 'عربى' ? 'AR' : 'EN')
  
  return (
     <View
      style={{
        flex: 1,
        // marginTop: 5,
        ...(Platform.OS !== 'android' && {
          zIndex: 5000,
        })
      }}
    >
       <DropDownPicker
        items={list}
        placeholder={placeholder}
        containerStyle={[mainContainer_style ? mainContainer_style : { 
          // height:45, 
          // margin: 5, 
          // marginTop: 1
        }]}
        style={[style ? style : { borderColor:'lightgray' }]}
        //dropDownMaxHeight={dropDownMaxHeight ? dropDownMaxHeight: 120}
        maxHeight={dropDownMaxHeight }
        value={value}
        defaultValue={value}
        min={0}
        max={5}
        multipleText={multipleText}
        //dropDownMaxHeight={150}
        open={open}
        setOpen={setOpen}
        setValue={onChange}
        disabled={disabled}
        searchable={searchable === true}
        setItems={multiple ? setItems : null}
        multiple={multiple}
        selected={selected}
        labelStyle={labelStyle ? labelStyle : null}
        listMode={listMode ? listMode : 'DEFAULT'}
        arrowIconStyle={{...arrowIconStyle}}
        translation={{
          PLACEHOLDER:translation ? translation : '',
        }}
        placeholderStyle={{...styles.placeholder, ...placeholderStyle}}
        dropDownContainerStyle={{
          borderColor:Global.iconBackground
        }}
        mode={badge ? "BADGE" : "SIMPLE"}
        disabledItemLabelStyle={{
          opacity: 0.5
        }}
        disabledStyle={{
          opacity: 0.5
        }}
      /> 
   </View>
    
  );
}

const styles = StyleSheet.create({
  placeholder:{
    //  color:'green'
  }
})

