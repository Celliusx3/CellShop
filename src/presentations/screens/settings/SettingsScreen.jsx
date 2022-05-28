import React, {useContext} from "react";
import { StyleSheet,View, Text } from "react-native";
import NavLink from "../../components/NavLink/NavLink";
import Colors from "../../themes/Colors";
import Metrics from "../../themes/Metrics";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Context as AuthContext } from "../../context/AuthContext";

const SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);

	return(
    <View style={styles.container}>
      <View style={styles.settingsButton}>
        <NavLink style={styles.navLink} onClick={signOut}>
          <Ionicons 
            name={"md-exit"} 
            size={Metrics.icons.medium} 
            color={Colors.errorText.text} 
            style={{marginEnd: Metrics.margin.small}}/>
          <Text style={styles.logout}>Logout</Text>
        </NavLink>
      </View>
    </View>
	)
};
  
export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: Metrics.flex.flex1,
  },
  settingsButton: {
    backgroundColor: Colors.settingsButton.background,
    marginTop: Metrics.margin.medium,
  },
  navLink: {
   paddingVertical:  Metrics.margin.small,
   paddingHorizontal: Metrics.margin.medium
  },
  logout: {
    color: Colors.errorText.text, 
    fontSize: Metrics.font.regular
  }
})

