import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import Colors from "../../themes/Colors";
import Metrics from "../../themes/Metrics";
import IconButton from "../IconButton/IconButton";

const Cart = ({item: {productImage, quantity, productPrice, productName, totalPrice}, onClick, deleteable = false}) => {
  return (
    <View style={styles.container}>
      <View style = {styles.main}>
        <Image
          style={styles.image}
          source={{
            uri: productImage,
          }}
        />

        <View style={styles.metadata}>
          <Text 
            numberOfLines={1}
            style={styles.title}>
            {productName}
          </Text>

          <Text 
            numberOfLines={1}
            style={styles.subtitle}>
            $ {Math.round(productPrice.toFixed(2) * 100) / 100}
          </Text>

          <Text 
            numberOfLines={1}
            style={styles.description}>
            x {quantity}
          </Text>

        </View>

      </View>
      
      <View style={styles.secondary}>
        {
          deleteable? (
            <IconButton 
            color= {Colors.cartList.trash} 
            icon={'md-trash-bin'} 
            onClick={onClick} />	
          ): <View/>
        }
        <Text 
          numberOfLines={1}
          style={styles.total}>
          Total: $ {Math.round(totalPrice.toFixed(2) * 100) / 100}
        </Text>
      </View>
     

    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cartList.background,
    marginVertical:  Metrics.margin.small,
    marginHorizontal: Metrics.margin.regular,
    borderRadius:Metrics.borderRadius.small,
    overflow: Metrics.overflow.hidden,
    padding: Metrics.margin.small,
  },
  main: {
    flex: Metrics.flex.flex1,
    flexDirection: Metrics.flexDirection.row,
    paddingBottom: Metrics.margin.small,
    borderBottomWidth: 1
  },
	image: {
		aspectRatio: 1.75, 
		width: Metrics.images.cart,
    borderRadius:Metrics.borderRadius.tiny,
    marginEnd: Metrics.margin.tiny
	},
  metadata: {
    flex: Metrics.flex.flex1, 
    flexDirection: Metrics.flexDirection.column,
    marginEnd: Metrics.margin.tiny,
    alignItems: Metrics.alignItems.flexEnd
  },
  secondary: {
    flex: Metrics.flex.flex1, 
    flexDirection: Metrics.flexDirection.row,
    marginEnd: Metrics.margin.tiny,
    justifyContent: "space-between"
  },
	title: {
    fontSize: Metrics.font.extraRegular,
		color: Colors.cartList.title,
    fontWeight: Metrics.fontWeights.bold
	},
  subtitle: {
		fontSize: Metrics.font.regular,
		color: Colors.cartList.subtitle,
    fontWeight: Metrics.fontWeights.bold
  },
  description: {
		fontSize: Metrics.font.regular,
		color: Colors.cartList.description,
    fontWeight: Metrics.fontWeights.bold
  },
  total: {
    fontSize: Metrics.font.extraRegular,
		color: Colors.cartList.total,
    fontWeight: Metrics.fontWeights.bold,
    paddingTop: Metrics.margin.small,
	},
})
  
export default Cart;