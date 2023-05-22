import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '../../Components/TopBar'
import Global from '../../Global'

const DetailsPage = ({ route, navigation }) => {
  const { title, detail, point_1, point_2, point_3 } = route.params;
  return (
    <>
      <TopBar title={title} />
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={{ margin: 5 }}>
          <Text style={{ color: '#000', lineHeight: 20 , textAlign:'auto', fontSize:18 , fontWeight:'400'}}>{detail}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: '#000', lineHeight: 25 }}>
            {Global.bullets_unicode} {point_1}
          </Text>
          <Text style={{ color: '#000', lineHeight: 25 }}>
            {Global.bullets_unicode} {point_2}
          </Text>
          <Text style={{ color: '#000', lineHeight: 25 }}>
            {Global.bullets_unicode} {point_3}
          </Text>
        </View>
      </View>
      </ScrollView>
    </>
  )
}

export default DetailsPage

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 15,
  },
})