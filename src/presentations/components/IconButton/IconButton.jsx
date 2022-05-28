import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const IconButton = ({icon, onClick, color, disabled = false, style}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} style={{...styles.container, ...style}}>
      <Ionicons name={icon} color = {color} size={32} style={{opacity: disabled? 0.5: 1}} />
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    alignItems: 'center',
  },
})

  
export default IconButton;