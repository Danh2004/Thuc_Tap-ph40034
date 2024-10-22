// advertisementApi.js

const API_BASE_URL = 'http://localhost:3000';

// Hàm lấy danh sách quảng cáo
export const fetchAdvertisements = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/advertisements`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisements:', error);
    }
};

// Hàm tạo quảng cáo mới
export const createAdvertisement = async (content, imageFile) => {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', imageFile);

    try {
        const response = await fetch(`${API_BASE_URL}/advertisements`, {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating advertisement:', error);
    }
};

// Hàm cập nhật quảng cáo
export const updateAdvertisement = async (id, content, imageFile) => {
    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/advertisements/${id}`, {
            method: 'PUT',
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating advertisement:', error);
    }
};

// Hàm xóa quảng cáo
export const deleteAdvertisement = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/advertisements/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error('Error deleting advertisement:', error);
    }
};

// Hàm lấy danh sách quảng cáo đã xóa
export const fetchTrashedAdvertisements = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/trashedAds`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching trashed advertisements:', error);
    }
};

// Hàm khôi phục quảng cáo đã xóa
export const restoreAdvertisement = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/trashedAds/${id}/restore`, {
            method: 'POST',
        });
        return await response.json();
    } catch (error) {
        console.error('Error restoring advertisement:', error);
    }
};

// Hàm xóa vĩnh viễn quảng cáo
export const permanentlyDeleteAdvertisement = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/trashedAds/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (error) {
        console.error('Error permanently deleting advertisement:', error);
    }
};
