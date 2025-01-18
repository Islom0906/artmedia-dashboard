import axios from '../auth/axios'

const apiService = {

    async getData(url) {
        const {data} = await axios.get(url);
        return data;
    },

    async getDataByID(url, id) {
        const {data} = await axios.get(`${url}/${id}`);
        return data;
    },

    async postData(url, formData) {
        const {data}= await axios.post(url, formData);
        return data
    },

    async editData(url, formData, id) {

        if (id){
        const {data}= await axios.put(`${url}/${id}/`, formData)
        return data
        }else {
            const {data}= await axios.put(`${url}/`, formData)
            return data
        }
    },
    async editDataPatch(url, formData, id) {


        const {data} = await axios.patch(`${url}/${id}/`, formData)
        return data

    },

    async deleteData(url, id) {
        await axios.delete(`${url}/${id}`);
    },

    async deleteImages(url, ids) {
        await axios.delete(url, {data:ids});
    },
};
export default apiService;