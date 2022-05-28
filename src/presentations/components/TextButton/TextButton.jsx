import React from "react";
import { StyleSheet, TouchableHighlight, Text, View} from "react-native";
import Colors from "../../themes/Colors";
import Metrics from "../../themes/Metrics";

const TextButton = ({text, disabled, onClick, style}) => {
  return (
    <TouchableHighlight 
      disabled={disabled}
      style={{...styles.container, ...style}}
      underlayColor= {Colors.textButton.focused}
      onPress={onClick}>
      <View style={{...styles.button, ...{backgroundColor: disabled ? Colors.textButton.disabled: Colors.textButton.default}}}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
};


const styles = StyleSheet.create({
  container: {
    overflow: Metrics.overflow.hidden,
    borderRadius: Metrics.borderRadius.tiny
  },
  button: {
    backgroundColor: Colors.textButton.default,
    padding: Metrics.margin.medium
  },
  text: {
    textAlign: Metrics.textAlignment.center,
    color: Colors.textButton.text
  }
})

  
export default TextButton;