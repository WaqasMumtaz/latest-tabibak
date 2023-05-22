import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Global from "../../Global";

export default function Spinner() {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={Global.main_color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
});