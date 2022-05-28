import HomeScreen from '../screens/home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SignInScreen from '../screens/signIn/SignInScreen';
import SignUpScreen from '../screens/signUp/SignUpScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import OrderDetailsScreen from '../screens/orderDetails/OrderDetailsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import CartScreen from '../screens/cart/CartScreen';

const AppStackNavigator = createNativeStackNavigator();

const AppStack = () => {
  return (
    <AppStackNavigator.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <AppStackNavigator.Screen name="Main" component={MainTab} options={{headerShown: false}} />
      <AppStackNavigator.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <AppStackNavigator.Screen name="Cart" component={CartScreen} />
    </AppStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
    </AuthStackNavigator.Navigator>
  );
};

const MainTabNavigator = createBottomTabNavigator();

const MainTab = () => {
  return (
    <MainTabNavigator.Navigator screenOptions={{headerTitleAlign: "center"}}>
      <MainTabNavigator.Screen options={{
        title: "Home",
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-home" size={size} color={color} />
        ),}} 
        name='Home'
        component={HomeScreen} />
      <MainTabNavigator.Screen options={{
        title: "Orders",
        tabBarLabel: "Orders",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-receipt" size={size} color={color} />
        ),}} 
        name='Orders'
        component={OrdersScreen} />
      <MainTabNavigator.Screen options={{
        title: "Settings",
        tabBarLabel: "Settings",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-settings" size={size} color={color} />
        ),}} 
        name='Settings'
        component={SettingsScreen} />
    </MainTabNavigator.Navigator>
  );
};

export {AuthStack, AppStack}