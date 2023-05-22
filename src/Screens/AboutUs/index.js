import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, Platform } from 'react-native'
import Global from '../../Global'
import Components from '../../Components'
import { useTranslation } from 'react-i18next';
// import tabibak_pdf from '../../Assets/tabibak-profile.pdf';
import Pdf from 'react-native-pdf';
// import { WebView } from 'react-native-webview';
// import PDFExample from './pdf';

const AboutUs = () => {
    const { t, i18n } = useTranslation();

    const source = require('../../Assets/tabibak-profile.pdf');  // ios only
    const android_source = { uri:'bundle-assets://tabibak-profile.pdf' }
    // const isRTL = i18n.dir();
    return (
        <>
            <Components.TopBar title={t('about_us')} backIcon={true} />
            {/* <PDFExample/> */}
            {/* <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                // marginTop: 25
            }}> */}

                <Pdf
                    trustAllCerts={false}
                    source={Platform.OS == 'ios' ? source : android_source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    onLoadProgress={()=> {
                        <Components.Spinner/>
                    }}
                    style={styles.pdf}
                    />

           
            {/* </View> */}
        </>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Global.white
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})