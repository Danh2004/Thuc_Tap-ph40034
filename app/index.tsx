import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdvertisementsScreen from '../screens/AdvertisementsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CommentsScreen from '../screens/CommentsScreen';
import UsersScreen from '../screens/UsersScreen';
import RolesScreen from '../screens/RolesScreen';
import RoleUserScreen from '../screens/RoleUserScreen';
import HomeScreen from '../screens/HomeScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Advertisements" component={AdvertisementsScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Roles" component={RolesScreen} />
        <Stack.Screen name="RoleUser" component={RoleUserScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}



