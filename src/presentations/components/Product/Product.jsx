import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, ViewStyle, View } from "react-native";
import Colors from "../../themes/Colors";
import Metrics from "../../themes/Metrics";
import TextButton from "../TextButton/TextButton";
import i18n from "i18n-js";

const Product = ({item:{price, name, imageUrl}, onClick}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
      <Text 
        numberOfLines={2}
        style={styles.title}>
        {name}
      </Text>
      <Text 
        numberOfLines={2}
        style={styles.description}>
        $ {Math.round(price.toFixed(2) * 100) / 100}
      </Text>
      <TextButton 
        style={styles.button}
        text= {i18n.t('addToCart')}
        onClick={onClick}/>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.margin.regular,
    marginVertical: Metrics.margin.small,
    backgroundColor: Colors.productList.background,
    borderRadius: Metrics.borderRadius.small,
    paddingBottom: Metrics.margin.small,
    overflow: Metrics.overflow.hidden,
  },
	image: {
		aspectRatio: 1.75, 
		width: Metrics.screen.full,
	},
	title: {
		fontSize: Metrics.font.large,
		paddingHorizontal: Metrics.margin.medium, 
    paddingTop: Metrics.margin.small,
		color: Colors.productList.title,
    fontWeight: Metrics.fontWeights.bold
	},
  description: {
		fontSize: Metrics.font.extraRegular,
		paddingHorizontal: Metrics.margin.medium, 
		color: Colors.productList.title,
    fontWeight: Metrics.fontWeights.regular
  },
  button: {
    marginHorizontal: Metrics.margin.medium,
    alignSelf: Metrics.alignSelf.baseline
  }
})
  
export default Product;