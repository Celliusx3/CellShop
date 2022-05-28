import React from "react";
import { StyleSheet, View, Text, TextInput as RNTextInput } from "react-native";
import Metrics from "../../themes/Metrics";

const TextInput = ({
  title, 
  placeHolder, 
  text, 
  secureTextEntry,
  onChangeText, 
  autoCapitalize, 
  autoCorrect, 
  keyboardType,
  style
}) => { 
  return (
    <View style={style}>
     <Text style={styles.inputTitle}>{title}</Text>
      <RNTextInput
        placeholder={placeHolder}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        secureTextEntry= {secureTextEntry}
        autoCapitalize = {autoCapitalize}
        autoCorrect = {autoCorrect}
        keyboardType = {keyboardType}
      />
    </View> 
  )
};

const styles = StyleSheet.create({
  inputTitle: {
    marginHorizontal: Metrics.margin.medium,
    fontSize: Metrics.font.large,
    fontWeight: Metrics.fontWeights.bold,
    marginBottom: Metrics.margin.small
  },
  input: {
    height: 48,
    marginHorizontal: Metrics.margin.medium,
    borderWidth: Metrics.borderWidth.tiny,
    borderRadius: Metrics.borderRadius.tiny,
    padding: Metrics.margin.medium,
    fontSize: Metrics.font.regular
  },
})

export default TextInput;