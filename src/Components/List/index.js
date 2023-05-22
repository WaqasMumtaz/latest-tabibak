import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import Global from '../../Global'
import Components from '..'

const MembersList = ({ data, userOperation, listStyle, isRTL }) => {

    function renderItems({ item }) {

        let listContainer = {
            flexDirection:'row',
            marginHorizontal: 18,
            margin: 8,
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'space-between'
        }
        return (
            <View style={{ ...listContainer, ...listStyle }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize:17, fontWeight:'bold' }}>{`${item.name}`}</Text>
                </View>
                {/* <View style={styles.options}>
                    <TouchableOpacity onPress={() => userOperation('edit', item)}>
                        <FontIcon name="pencil-alt" color={Global.main_color} size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => userOperation('delete', item)}>
                        <Icon name="trash-outline" color={Global.main_color} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => userOperation('view', item)}>
                        <Icon name="open-outline" color={Global.main_color} size={20} />
                    </TouchableOpacity>
                </View> */}

            </View>
        )

    }

    return (
        <>
            {data == null ?
                <Components.Spinner />
                :
                data?.length == 0 ?
                    <Components.NoRecord />
                    :
                    <FlatList
                        data={data}
                        keyExtractor={(item) => `item_${item.id}`}
                        ItemSeparatorComponent={() => (<View style={styles.borderLine}></View>)}
                        renderItem={renderItems}
                    // ListEmptyComponent={() => (
                    // <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    //     <Components.Spinner/>
                    // </View>
                    // )}
                    />
            }
        </>

    )
}

export default MembersList

const styles = StyleSheet.create({
    borderLine: {
        borderBottomWidth: 0.9,
        borderBottomColor: "lightgray",
    },

    options: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        // fontWeight: 'bold',
        color: Global.main_color,
        textAlign: 'center',
    },
})
