import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/api';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleAddCategory = async () => {
    if (editId) {
      await updateCategory(editId, { name });
      setEditId(null);
    } else {
      await createCategory({ name });
    }
    setName('');
    fetchCategories();
  };

  const handleEditCategory = (item) => {
    setEditId(item.id);
    setName(item.name);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Categories</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="Category Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddCategory} />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleEditCategory(item)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
