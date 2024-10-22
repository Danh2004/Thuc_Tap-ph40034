import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getAdvertisements, createAdvertisement, updateAdvertisement, deleteAdvertisement } from '../api/api';

export default function AdvertisementsScreen() {
  const [advertisements, setAdvertisements] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    const response = await getAdvertisements();
    setAdvertisements(response.data);
  };

  const handleAddAdvertisement = async () => {
    if (editId) {
      await updateAdvertisement(editId, { title, description });
      setEditId(null);
    } else {
      await createAdvertisement({ title, description });
    }
    setTitle('');
    setDescription('');
    fetchAdvertisements();
  };

  const handleEditAdvertisement = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleDeleteAdvertisement = async (id) => {
    await deleteAdvertisement(id);
    fetchAdvertisements();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Advertisements</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddAdvertisement} />

      <FlatList
        data={advertisements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => handleEditAdvertisement(item)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteAdvertisement(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
