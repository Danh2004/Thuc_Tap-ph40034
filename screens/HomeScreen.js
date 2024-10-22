import React from 'react';
import { View, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Home</Text>
      <Button title="Go to Advertisements" onPress={() => navigation.navigate('Advertisements')} />
      <Button title="Go to Categories" onPress={() => navigation.navigate('Categories')} style={{ marginTop: 10 }} />
      <Button title="Go to Comments" onPress={() => navigation.navigate('Comments')} style={{ marginTop: 10 }} />
      <Button title="Go to Users" onPress={() => navigation.navigate('Users')} style={{ marginTop: 10 }} />
      <Button title="Go to Roles" onPress={() => navigation.navigate('Roles')} style={{ marginTop: 10 }} />
      <Button title="Go to RoleUser" onPress={() => navigation.navigate('RoleUser')} style={{ marginTop: 10 }} />
    </View>
  );
}
