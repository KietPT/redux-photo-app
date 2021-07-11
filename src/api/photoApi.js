import axiosClient from "./axiosClient";


const photoApi = {
    getAll: (params) => {
        const url = '/photos'
        return axiosClient.get(url, {params})
    },
    getPhoto: (id) => {
        const url = `photos/${id}`;
        return axiosClient.get(url);
    },
    addPhoto: (photo) => {
        const url = '/photos';
        return axiosClient.post(url, photo);
    },
    editPhoto: (photo) => {
        const url = `photos/${photo.id}/`;
        return axiosClient.put(url, photo);
    },
    removePhoto: (id) => {
        const url = `photos/${id}/`;
        return axiosClient.delete(url);
    }
}
export default photoApi;