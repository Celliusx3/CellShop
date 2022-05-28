import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Metrics from "../../themes/Metrics";

const IconButton = ({icon, onClick, color, disabled = false, style}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} style={{...styles.container, ...style}}>
      <Ionicons name={icon} color = {color} size={Metrics.icons.medium} style={{opacity: disabled? 0.5: 1}} />
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  container: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    alignItems: Metrics.alignItems.center,
  },
})

  
export default IconButton;