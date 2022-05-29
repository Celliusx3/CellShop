import { Provider as CartProvider, Context as CartContext } from '../../context/CartContext';
import { fireEvent, render } from '@testing-library/react-native';
import { View, Text, TouchableOpacity } from "react-native";
import ProductResponse from '../../../data/models/responses/ProductResponse';
import React, { useContext } from 'react';

const TestComponent = () => {
  const { state: {items, totalAmount}, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  return (
    <View>
      <Text testID="items">{Object.values(items).length}</Text>
      <Text testID="totalAmount">{totalAmount}</Text>
      <TouchableOpacity testID="addShirt" onPress={() => addToCart(
        new ProductResponse (
          "1",
          "Shirt",
          "https://img.png",
          "Red Shirt",
          5,
        )
      )}>Add Shirt</TouchableOpacity>
      <TouchableOpacity testID="addShoes" onPress={() => addToCart(
        new ProductResponse (
          "2",
          "Shoes",
          "https://img.png",
          "Red Shoes",
          7,
        )
      )}>Add Shoes</TouchableOpacity>
      <TouchableOpacity testID="remove" onPress={() => removeFromCart("1")}>Remove</TouchableOpacity>
      <TouchableOpacity testID="clear" onPress={() => clearCart()}>Clear</TouchableOpacity>
    </View>
  );
};

describe('CartContext', () => {
  test('add multiple items to cart', async () => {
    const wrapper = ({children}) => (
      <CartProvider>
        {children}
      </CartProvider>
    )

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper})
    const addShirt = getByTestId('addShirt')
    fireEvent.press(addShirt)
    fireEvent.press(addShirt)
    fireEvent.press(addShirt)
    
    const totalAmount = getByTestId("totalAmount")
    const items = getByTestId("items")

    expect(totalAmount.props.children).toBe(15)
    expect(items.props.children).toBe(1)

    const addShoes = getByTestId('addShoes')
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)

    expect(totalAmount.props.children).toBe(36)
    expect(items.props.children).toBe(2)

  })

  test('remove from cart', async () => {
    const wrapper = ({children}) => (
      <CartProvider>
        {children}
      </CartProvider>
    )

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper})
    const addShirts = getByTestId('addShirt')
    fireEvent.press(addShirts)
    fireEvent.press(addShirts)
    fireEvent.press(addShirts)
    fireEvent.press(addShirts)
    fireEvent.press(addShirts)

    const addShoes = getByTestId('addShoes')
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)
    fireEvent.press(addShoes)

    const removeFromCart = getByTestId('remove')
    fireEvent.press(removeFromCart)

    const totalAmount = getByTestId("totalAmount")
    const items = getByTestId("items")
    
    expect(totalAmount.props.children).toBe(35)
    expect(items.props.children).toBe(1)
   
  })

  test('clear cart', async () => {
    const wrapper = ({children}) => (
      <CartProvider>
        {children}
      </CartProvider>
    )

    const {getByTestId, getByText, queryByTestId, toJSON} = render(<TestComponent/>, {wrapper})
    const button = getByTestId('addShirt')
    fireEvent.press(button)
    fireEvent.press(button)
    fireEvent.press(button)
    fireEvent.press(button)
    fireEvent.press(button)

    const clearCart = getByTestId('clear')
    fireEvent.press(clearCart)

    const totalAmount = getByTestId("totalAmount")
    const items = getByTestId("items")
    
    expect(totalAmount.props.children).toBe(0)
    expect(items.props.children).toBe(0)
  })
});