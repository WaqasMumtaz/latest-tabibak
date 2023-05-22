import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Global from '../../Global';
import ImagePlaceholder from '../Image';


const ProfileContainer = ({ src, _style, uri, disabled, onClick }) => {

    const imageStyle = {
        height: 80,
        width: 80,
        //resizeMode:'contain'
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ ...styles.profile_container, ..._style }}
                disabled={disabled}
                onPress={() => onClick()}
            >
                <ImagePlaceholder
                    src={src}
                    // _style={{}}
                    uri={uri}
                    size={30}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ProfileContainer;

const styles = StyleSheet.create({
    container: {
        // flex:1,
        //justifyContent:'center',
        alignItems: 'center'
    },
    profile_container: {
        height: 120,
        width: 120,
        borderWidth: 1,
        borderColor: Global.inputs_bg,
        borderRadius: 120 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Global.inputs_bg
    },

})