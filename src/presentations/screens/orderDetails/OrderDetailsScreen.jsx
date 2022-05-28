import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Metrics from "../../themes/Metrics";
import { useRoute } from "@react-navigation/native";
import useOrder from "../../hooks/useOrder";
import Cart from "../../components/Cart/Cart";

const OrderDetailsScreen = () => {
  const route = useRoute()
  const [orderItems, loading, error] = useOrder(route.params.id)

  return (
    <>
      <FlatList
        contentContainerStyle={ styles.listContent }
        showsVerticalScrollIndicator={false}
        data={orderItems}
        renderItem={({ item }) => {   
          return (
            <Cart
              item={item}
            />
          )
        }}
        keyExtractor={(item, index) => item.productId}
      />
    </>
    
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: Metrics.margin.small
  },
});

export default OrderDetailsScreen;