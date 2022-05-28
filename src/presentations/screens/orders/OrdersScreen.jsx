import React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Order from "../../components/Order/Order";
import Metrics from "../../themes/Metrics";
import useOrders from "../../hooks/useOrders";

const OrdersScreen = () => {
  const navigation = useNavigation()
  const [orders, loading, error, fetchOrdersApi] = useOrders()

  const onRefresh = () => {
    fetchOrdersApi()
  }

  return (
    <>
      <FlatList
        contentContainerStyle={ styles.listContent }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={({ item }) => (
          <Order
            item={item}
            onClick={() => navigation.navigate("OrderDetails", { id: item.id })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: Metrics.margin.small
  },
});

export default OrdersScreen;

