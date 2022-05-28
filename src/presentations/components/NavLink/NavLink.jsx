import React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";

const NavLink = ({children, onClick, style}) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ ...styles.container, ...style }}>
      {children}
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:"center"
  },
})

  
export default NavLink;
