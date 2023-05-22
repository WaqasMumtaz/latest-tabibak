

import React, { useEffect, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  AppState,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Global from './src/Global';

import SplashScreen from 'react-native-splash-screen';

import Components from './src/Components';
import Navigation from './src/Navigation';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor:'white'
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const appState = useRef(AppState.currentState);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const statusBarStyle = {
    backgroundColor: 'red',
  }

  async function onMessageReceived(message) {
    const { title, body } = message.notification;
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      badge: true
    });

    // Display a notification
    notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        sound: 'default',
      },
      ios: {
        critical: true,
        sound: 'default',
        // criticalVolume: 1,
      },

    });
    notifee
      .incrementBadgeCount()
      .then(() => notifee.getBadgeCount())
      .then(count => console.log('Test Counts >>>>>', count));
  }

  useEffect(()=>{
    SplashScreen.hide();

    let subscription_state = AppState.addEventListener("change", nextAppState => {
      if (nextAppState === "active") {
        notifee.setBadgeCount(0).then(() => console.log('Badge count removed'));
      }
      appState.current = nextAppState;
      //setAppStateVisible(appState.current);
      //console.log("AppState", appState.current);
    });

    const unsubscribe = messaging().onMessage((e) => onMessageReceived(e));
    messaging().setBackgroundMessageHandler(async (e) => {
      onMessageReceived(e);
    });

    return () => {
      unsubscribe;
      console.log('Clean Function App.js File Close');
      subscription_state?.remove();
      // subscription.remove();
    }
  },[])

  return (
    <>
      <Components.MyStatusBar backgroundColor={Global.main_color} barStyle="light-content"/>
    <SafeAreaView style={[backgroundStyle, {flex:1}]}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarStyle.backgroundColor}
      /> */}
      <NavigationContainer theme={MyTheme}>
          <Navigation />
        </NavigationContainer>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView> */}
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
