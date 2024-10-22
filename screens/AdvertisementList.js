import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AdvertisementList = ({ navigation }) => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/advertisements ')
            .then(response => response.json())
            .then(data => setAds(data))
            .catch(error => console.error('Error fetching advertisements:', error));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>ID: {item.id} - {item.user.name}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonEdit}
                        onPress={() => navigation.navigate('EditAd', { adId: item.id })}
                    >
                        <Text style={styles.buttonText}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonDelete}
                        onPress={() => console.log('Xóa quảng cáo ID:', item.id)}
                    >
                        <Text style={styles.buttonText}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách quảng cáo</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateAd')}
            >
                <Text style={styles.addButtonText}>Thêm mới quảng cáo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.trashButton}
                onPress={() => navigation.navigate('TrashedAds')}
            >
                <Text style={styles.trashButtonText}>Xem thùng rác</Text>
            </TouchableOpacity>
            <FlatList
                data={ads}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    buttonEdit: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonDelete: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    trashButton: {
        backgroundColor: '#FF5722',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    trashButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        marginBottom: 20,
    }
});

export default AdvertisementList;
