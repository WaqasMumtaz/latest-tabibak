import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Components from '../../Components'

const Counts = ({ list , handleTodo }) => {
    console.log('<<<<**** Child Component Render ***>>>')
    return (
      <View>
        {list?.map((item, indx) => {
                return <Text style={{ margin: 10 }} key={indx}>{`${item}_${indx}`}</Text>
            })}
            <TouchableOpacity
                style={{ backgroundColor: 'black', padding:10, borderRadius:5, alignItems:'center' 
            }}
                onPress={()=> handleTodo()}
            >
                <Text style={{ color: 'white' }}>Add Item</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{margin:10, backgroundColor: 'pink', padding:10, borderRadius:5, alignItems:'center' 
            }}
                onPress={()=> setList([])}
            >
                <Text style={{ color: 'black' }}>Clear Items</Text>
            </TouchableOpacity> */}
      </View>

    )
}

export default React.memo(Counts) ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})