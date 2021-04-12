import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTgwMDM1ODEsIm5iZiI6MTYxODAwMzU4MSwiZXhwIjoxNjE4NjA4MzgxLCJkYXRhIjp7ImlkIjoyMTQyNX19.Sjsbp4DMHUkqrUZQct2JvRyiqYwgnWo0MBOd3PpB3Pg`;

axios.defaults.baseURL = 'https://api.folderit.com';
axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
export default axios;


async function getFolders() {
    let response = await axios.get('/search/folders');
    console.log(response);
    return response.data.folders;
}


async function uploadImage(folder_id) {
    var data = new FormData();
    data.append('folderId', folder_id);
    let filepath = `C:\\Users\\edsch\\Pictures\\leaning_tower.jpg`;
    data.append('file', fs.createReadStream(filepath));

    let response = await axios({
        method: "post",
        url: "/files",
        data: data,
        // headers: { "Content-Type": "multipart/form-data" },
        headers: {
            ...data.getHeaders()
        },
    })


}


async function mainline() {
    try {
        let folders = await getFolders();
        let folder_id = folders.filter(folder => folder.name === 'Tankwash_forms')[0].id;
        await uploadImage(folder_id)
    } catch (err) {
        console.log(err);
    }

}


mainline()