import React, { useLayoutEffect, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Product from "../../components/Product/Product";
import IconButton from "../../components/IconButton/IconButton";
import { Context as CartContext } from "../../context/CartContext";
import Metrics from "../../themes/Metrics";
import useProducts from "../../hooks/useProducts";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, loading, error, fetchProductsApi]= useProducts();
  const { addToCart } = useContext(CartContext);

  const onCartIconClicked = () => {
    navigation.navigate("Cart");
  }

  const onRefresh = () => {
    fetchProductsApi()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
				<IconButton style={styles.headerButton} icon={'md-cart'} onClick={onCartIconClicked} />	
      ),
    });
  }, [navigation]);

  return (
    <>
      <FlatList
        contentContainerStyle={ styles.listContent }
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        data={products}
        renderItem={({ item }) => {          
          return (
            <Product
              item={item}
              onClick={() => addToCart(item)}
            />
          )
         
        }}
        keyExtractor={(item, index) => item.id}
      />
    </>
    
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: Metrics.margin.small
  },
  headerButton: {
    marginHorizontal: Metrics.margin.medium
  }
});

export default HomeScreen;
