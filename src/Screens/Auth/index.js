import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Global from '../../Global';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';



const Auth = () => {
    const [state, setState] = useState(1);

    function handleState(screen) {
        setState(screen)
    }

    return (
        <>

            {state == 3 ?
                <ForgotPassword handleState={handleState} />
                :
                state == 2 ?
                    <SignUp handleState={handleState} />
                    :
                    <Login handleState={handleState} />
            }
        </>
    )
}

export default Auth;

const styles = StyleSheet.create({
   
})