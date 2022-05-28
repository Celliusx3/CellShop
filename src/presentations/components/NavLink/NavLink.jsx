import React from "react";
import { StyleSheet, TouchableOpacity} from "react-native";
import Metrics from "../../themes/Metrics";

const NavLink = ({children, onClick, style}) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ ...styles.container, ...style }}>
      {children}
    </TouchableOpacity>
  )
};


const styles = StyleSheet.create({
  container: {
    flexDirection: Metrics.flexDirection.row,
    alignItems: Metrics.alignItems.center
  },
})

  
export default NavLink;
