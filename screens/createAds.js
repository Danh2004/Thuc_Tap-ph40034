import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreateAd = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', {
                uri: image,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
        }

        // Xử lý việc gửi dữ liệu quảng cáo đến API
        fetch('http://localhost:3000/advertisements ', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log('Ad created:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Thêm mới quảng cáo</Text>

            <TextInput
                placeholder="Nội dung quảng cáo"
                value={content}
                onChangeText={text => setContent(text)}
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <Button title="Chọn ảnh" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <Button title="Thêm mới" onPress={handleSubmit} />
        </View>
    );
};

export default CreateAd;
