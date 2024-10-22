import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { getComments, createComment, updateComment, deleteComment } from '../api/api';

export default function CommentsScreen() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await getComments();
    setComments(response.data);
  };

  const handleAddComment = async () => {
    if (editId) {
      await updateComment(editId, { text });
      setEditId(null);
    } else {
      await createComment({ text });
    }
    setText('');
    fetchComments();
  };

  const handleEditComment = (item) => {
    setEditId(item.id);
    setText(item.text);
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    fetchComments();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Comments</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      <TextInput
        placeholder="Comment Text"
        value={text}
        onChangeText={setText}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={editId ? "Update" : "Add"} onPress={handleAddComment} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.text}</Text>
            <TouchableOpacity onPress={() => handleEditComment(item)}>
              <Text style={{ color: 'blue' }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
