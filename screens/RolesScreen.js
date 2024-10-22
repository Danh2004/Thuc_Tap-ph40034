import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getRoles, createRole, updateRole, deleteRole } from '../api/api';

export default function RolesScreen() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await getRoles();
    setRoles(response.data);
  };

  const handleAddRole = async () => {
    if (editId) {
      await updateRole(editId, { name });
      setEditId(null);
    } else {
      await createRole({ name });
    }
    setName('');
    fetchRoles();
  };

  const handleEditRole = (item) => {
    setEditId(item.id);
    setName(item.name);
  };

  const handleDeleteRole = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  return (
    <View style={{ padding: 20 }}>
     
     <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Roles</Text>
     <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="Role Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddRole} />

      <FlatList
        data={roles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleEditRole(item)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteRole(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
