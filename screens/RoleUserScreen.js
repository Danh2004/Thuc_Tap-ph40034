import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getRoleUsers, createRoleUser, deleteRoleUser } from '../api/api';

export default function RoleUserScreen() {
  const [roleUsers, setRoleUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    fetchRoleUsers();
  }, []);

  const fetchRoleUsers = async () => {
    const response = await getRoleUsers();
    setRoleUsers(response.data);
  };

  const handleAddRoleUser = async () => {
    await createRoleUser({ userId, roleId });
    setUserId('');
    setRoleId('');
    fetchRoleUsers();
  };

  const handleDeleteRoleUser = async (id) => {
    await deleteRoleUser(id);
    fetchRoleUsers();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Role-User Assignments</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Role ID"
        value={roleId}
        onChangeText={setRoleId}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Role-User Assignment" onPress={handleAddRoleUser} />

      <FlatList
        data={roleUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text>User ID: {item.userId}</Text>
            <Text>Role ID: {item.roleId}</Text>
            <TouchableOpacity onPress={() => handleDeleteRoleUser(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
