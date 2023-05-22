import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Components from '../../Components'
import Counts from './counts'

const Learning = () => {
    const [email, setEmail] = useState('');
    const [list, setList] = useState([]);
    const [counts, setCounts] = useState(0);

    const handleTodo = useCallback(() => {
        setList(prev => [...prev, 'added_item'])
    }, [list])
    

    function increment() {
        setCounts(counts + 1)
    }

    // console.log('<<<<**** Parent Component Render ***>>>')
    return (
        <View style={styles.container}>
            <Counts handleTodo={handleTodo} list={list}/>
            <View style={{ marginTop: 8, alignItems: 'center' }}>
                <Text style={{ marginVertical: 10 }}>Counts : {counts}</Text>
                <TouchableOpacity
                    style={{ backgroundColor: 'red', margin: 10, padding: 10, borderRadius: 5, alignItems: 'center' }}
                    onPress={() => increment()}
                >
                    <Text style={{ color: 'white' }}>Start Count</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Learning;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})