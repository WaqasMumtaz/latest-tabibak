import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from "react-native";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from "../../Global";
import { useTranslation } from 'react-i18next';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

console.log('windowWidth >>>', parseInt(windowWidth - 10));

const AlertModal = ({ modalVisible, setModalVisible, title, data , handleClick}) => {
    //   const [modalVisible, setModalVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems:'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalText}>{title}</Text>
                            </View>
                            <Pressable onPress={() => setModalVisible()}>
                                <IonicIcon name="close-circle-outline" color={Global.main_color} size={30} />
                            </Pressable>
                        </View>
                        <View style={{padding:10}}/>
                        <View style={{padding:10}}/>
                        {data.length <= 3 ?
                            <View style={{ flexDirection: isRTL == 'rtl' ? 'row-reverse' : 'row', alignItems: 'center', justifyContent:'space-evenly' }}>
                                {data.map((item, i) => (
                                    <Pressable
                                        key={i}
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={()=> handleClick(item.name)}
                                    >
                                        <Text style={styles.textStyle}>{item.name}</Text>
                                    </Pressable>
                                ))}
                            </View>
                            :
                            <View>
                                <Text>Other button</Text>
                            </View>
                        }

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        //flex:1,
        width: parseInt(windowWidth - 32),
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: Global.main_color,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        // marginBottom: 15,
        // textAlign: "center"
        fontWeight:'bold',
        fontSize:18
    }
});

export default AlertModal;