import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';

const TrashedAds = () => {
    const [trashedAds, setTrashedAds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/trashedAds')
            .then(response => response.json())
            .then(data => setTrashedAds(data));
    }, []);

    const restoreAd = (id) => {
        console.log('Khôi phục quảng cáo ID:', id);
    };

    const permanentlyDeleteAd = (id) => {
        Alert.alert(
            'Xác nhận xóa vĩnh viễn',
            'Bạn có chắc chắn muốn xóa quảng cáo này vĩnh viễn?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => console.log('Xóa vĩnh viễn quảng cáo ID:', id) }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>ID: {item.id}</Text>
            <Text>Người tạo: {item.user.name}</Text>
            <Button title="Khôi phục" onPress={() => restoreAd(item.id)} />
            <Button title="Xóa vĩnh viễn" color="red" onPress={() => permanentlyDeleteAd(item.id)} />
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 18 }}>Danh sách quảng cáo đã xóa</Text>
            <FlatList
                data={trashedAds}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default TrashedAds;
