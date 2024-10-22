import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditAd = ({ route }) => {
    const { adId } = route.params;
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/advertisements/${adId}`)
            .then(response => response.json())
            .then(data => {
                setContent(data.content);
                setImage(data.image);
            });
    }, [adId]);

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

        // Gửi dữ liệu đã chỉnh sửa đến API mà không thêm headers
        fetch(`http://localhost:3000/advertisements/${adId}`, {
            method: 'PATCH', // Đổi PUT thành PATCH
            body: formData,
        })
            .then(response => response.json())
            .then(data => console.log('Ad updated:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Chỉnh sửa quảng cáo</Text>

            <TextInput
                placeholder="Nội dung quảng cáo"
                value={content}
                onChangeText={text => setContent(text)}
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <Button title="Chọn ảnh" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <Button title="Cập nhật" onPress={handleSubmit} />
        </View>
    );
};

export default EditAd;
