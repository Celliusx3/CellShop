import React from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text, ActivityIndicator } from "react-native";
import Cart from "../../components/Cart/Cart";
import Metrics from "../../themes/Metrics";
import TextButton from "../../components/TextButton/TextButton";
import Colors from "../../themes/Colors";
import useCarts from "../../hooks/useCarts";
import i18n from "i18n-js";

const CartScreen = () => {
  const [carts, totalAmount, error, loading, addOrderApi, removeItemsApi]= useCarts()

  return (
    <SafeAreaView style={{flex: 1, flexDirection:"column"}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        data={carts}
        renderItem={({ item }) => (
          <Cart
            deleteable
            item={item}
            onClick= {()=> removeItemsApi(item.productId)}
          />
        )}
        keyExtractor={(item, index) => item.productId }
      />
      <View style={styles.bottomBar}>
        <Text 
          numberOfLines={2}
          style={styles.total}>
          {`${i18n.t('total')}: $ ${Math.round(totalAmount.toFixed(2) * 100) / 100}` }
        </Text>
        { loading ?
          <ActivityIndicator 
            style={styles.indicator} 
            color={Colors.indicator.loading} 
            size="large"/>:
          <TextButton 
            style={styles.button}
            disabled = {carts === null || carts.length === 0}
            text= {i18n.t('submitOrder')}
            onClick={addOrderApi}/>
        }
        
      </View>
    </SafeAreaView> 
  )


}

const styles = StyleSheet.create({
  container: {
    flex: Metrics.flex.flex1, 
    flexDirection: Metrics.flexDirection.column
  },
  listContent: {
    paddingVertical: Metrics.margin.small
  },
  bottomBar: {
    backgroundColor: Colors.bottomBar.background,
    padding: Metrics.margin.medium
  },
  total: {
    alignSelf:Metrics.alignSelf.flexEnd,
    fontWeight: Metrics.fontWeights.bold,
		fontSize: Metrics.font.extraRegular
  },
  button: {
    marginVertical: Metrics.margin.medium
  },
  indicator: {
    marginVertical: Metrics.margin.medium,
  }
});

export default CartScreen;

