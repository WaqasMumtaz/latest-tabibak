import React from 'react'
import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native';
import Components from '..';
import Global from '../../Global';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalScreen = ({ children, modalVisible, title, handleModal, transparent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={transparent}
      visible={modalVisible}
    // onRequestClose={() => {
    //   setModalVisible(!modalVisible);
    // }}
    >
      {title && (
        <Components.TopBar title={title} backIcon={true} backBtn={() => handleModal()} />
      )}
      {title ? (
        <>
          {children}
        </>
      ) :
        <View
          style={styles.customModalStyle}
          elevation={5}
        >
          {children}
        </View>
      }
    </Modal>
  )
}

export default ModalScreen

const styles = StyleSheet.create({
  customModalStyle: {
    flex: 1,
    marginVertical: '20%',
    marginHorizontal: 12,
    borderRadius:10,
    backgroundColor:Global.white,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
})
