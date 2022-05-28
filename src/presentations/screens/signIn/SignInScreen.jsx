import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";
import Metrics from "../../themes/Metrics";
import NavLink from "../../components/NavLink/NavLink";
import { useNavigation } from "@react-navigation/core";
import Colors from "../../themes/Colors";
import useSignIn from "../../hooks/useSignIn";

const SignInScreen = () => {
  const [loading, error, signInApi] = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onSignInClicked = async () => {
    await signInApi({email, password});
  }

  const onNavLinkClicked = () => {
    navigation.replace("SignUp");
  }
  

	return(
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          title={"Email"}
          placeHolder= {"Please input your email..."}
          text = {email}
          onChangeText = {setEmail}
          autoCapitalize = {"none"}
          autoCorrect = {false}
          keyboardType = {"email-address"}
          style = {styles.emailInput}
        />
        <TextInput
          title={"Password"}
          placeHolder= {"Please input your password..."}
          text = {password}
          onChangeText = {setPassword}
          autoCapitalize = {"none"}
          autoCorrect = {false}
          secureTextEntry = {true}
          style = {styles.passwordInput}
        />
        {
          error ? <Text style={styles.errorText}>{error}</Text>:  null
        }
        <TextButton 
          style={styles.button}
          disabled = {loading || !email || !password}
          text= {"Sign in"}
          onClick={onSignInClicked}/>
        {
          loading ?
          <ActivityIndicator 
            style={styles.indicator} 
            color={Colors.indicator.loading} 
            size="large"/>:
          null
        }
        <NavLink style={styles.navLink} onClick={onNavLinkClicked}>
          <Text>Does not have an account? Register instead.</Text>
        </NavLink>
      </ScrollView>
    </SafeAreaView>
	)
};

const styles = StyleSheet.create({
  container: {
    flex: Metrics.flex.flex1
  },
  title: {
    marginVertical: Metrics.margin.large,
    marginHorizontal: Metrics.margin.medium,
    fontSize: Metrics.font.huge,
    fontWeight: Metrics.fontWeights.bold
  },
  emailInput: {
    marginBottom: Metrics.margin.medium
  },
  passwordInput: {
    marginBottom: Metrics.margin.medium
  },
  errorText: {
    color: Colors.errorText.text,
    marginBottom: Metrics.margin.medium,
    marginHorizontal: Metrics.margin.medium,
    fontSize: Metrics.font.regular
  },
  button: {
    marginHorizontal: Metrics.margin.medium
  },
  navLink: {
    marginTop: Metrics.margin.medium,
    marginHorizontal: Metrics.margin.medium
  },
  indicator: {
    marginTop: Metrics.margin.medium,
  }
})
  
export default SignInScreen
