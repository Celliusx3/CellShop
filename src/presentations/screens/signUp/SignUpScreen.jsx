import React, { useState } from "react";
import { StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextButton from "../../components/TextButton/TextButton";
import TextInput from "../../components/TextInput/TextInput";
import Metrics from "../../themes/Metrics";
import NavLink from "../../components/NavLink/NavLink";
import { useNavigation } from "@react-navigation/core";
import Colors from "../../themes/Colors";
import useSignUp from "../../hooks/useSignUp";

const SignUpScreen = () => {
  const [loading, error, signUpApi] = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onSignUpClicked = async () => {
    await signUpApi({email, password});
  }

  const onNavLinkClicked = () => {
    navigation.replace("SignIn");
  }
  
	return(
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Sign Up</Text>
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
          text= {"Sign up"}
          onClick={onSignUpClicked}/>
        {
          loading ?
          <ActivityIndicator 
            style={styles.indicator} 
            color={Colors.indicator.loading} 
            size="large"/>:
          null
        }
        
        <NavLink style={styles.navLink} onClick={onNavLinkClicked}>
          <Text>Already have an account? Sign in instead.</Text>
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
  
export default SignUpScreen
