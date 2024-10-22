import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getUsers, createUser, updateUser, deleteUser } from '../api/api';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    if (editId) {
      await updateUser(editId, { name, email });
      setEditId(null);
    } else {
      await createUser({ name, email });
    }
    setName('');
    setEmail('');
    fetchUsers();
  };

  const handleEditUser = (item) => {
    setEditId(item.id);
    setName(item.name);
    setEmail(item.email);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Users</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddUser} />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.email}</Text>
            <TouchableOpacity onPress={() => handleEditUser(item)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
