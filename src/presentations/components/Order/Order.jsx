import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../themes/Colors";
import Metrics from "../../themes/Metrics";

const Order = ({item: {id, totalPrice }, onClick}) => {
  return (
    <TouchableOpacity onPress= {onClick}>
      <View style={styles.container}>
        <Text 
          numberOfLines={2}
          style={styles.title}>
          {id}
        </Text>

        <Text 
          numberOfLines={2}
          style={styles.description}>
          $ {totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.margin.regular,
    marginVertical: Metrics.margin.small,
    backgroundColor: Colors.orderList.background,
    borderRadius: Metrics.borderRadius.small,
    overflow: Metrics.overflow.hidden,
  },
	title: {
    fontSize: Metrics.font.extraRegular,
		color: Colors.orderList.title,
    padding: Metrics.margin.medium, 
    fontWeight: Metrics.fontWeights.bold
	},
  description: {
		fontSize: Metrics.font.regular,
		color: Colors.orderList.description,
    padding: Metrics.margin.medium, 
    fontWeight: Metrics.fontWeights.bold,
    alignSelf: Metrics.alignSelf.flexEnd
  },
})
  
export default Order;