import React, { useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import 'react-quill/dist/quill.snow.css'
import { Label, TextInput, FileInput, Button } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import moment from 'moment'
import axios from 'axios'

const Write_News = () => {

    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.desc || "");
    const [file, setFile] = useState(null);

    const navigate = useNavigate()

    const upload = async () => {
        try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8800/api/upload", formData);
        return res.data;
        } catch (err) {
        console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${yourAuthToken}`, // Replace with your actual token
                }
              };

        state
            ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
                title,
                desc: value,
                img: file ? imgUrl : "",
            },config)
            : await axios.post(`http://localhost:8800/api/posts/`, {
                title,
                desc: value,
                img: file ? imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },config);
            navigate("/")
        } catch (err) {
        console.log(err);
        }
    };



    return(
        <div className='add'>
            <div className="content max-w-3xl mx-auto px-4">
                    <img 
                    className='w-100 h-auto mt-4 px-4'
                    src='https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/345151623_146524801584118_676052246615036439_n.jpg?_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=UTt9iWkn2pQAX8fOWk4&_nc_oc=AQn05ZgY9OJutvXAA_Nw4nW7YY4XhBWaUTlLQxcXi3f7lL8xDmPI2PmD7kMj9TdZm1I&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB7d15526W7TC96JqVPwVCDHfysHcJJGeX6QUCzqgumRw&oe=64AA470E' 
                    alt="" 
                    />
                    <div className="mb-2 block mt-10 px-20">
                    <Label htmlFor="base" value="Title"/>
                    </div>
                    <TextInput className="px-20" id="base" sizing="md" type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                    <div className="max-w-md px-20 mt-5" id="fileUpload">
                    <div className="mb-2 block">
                    <Label htmlFor="file" className='file' value="Upload picture"/>
                    </div>
                    <FileInput
                        helperText="Upload a picture"
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    </div>
                    
                    <div className="editorContainer h-60 max-h-100 overflow-y-scroll mt-8">
                        <ReactQuill className="mt-5 px-20 h-full" theme="snow" value={value} onChange={setValue} />
                    </div>
                    
                    <div className='mt-5 px-20'>
                    <Button color="dark" onClick={handleClick}>Publish</Button>
                    </div>
            </div>
        </div>
    )
}

export default Write_News