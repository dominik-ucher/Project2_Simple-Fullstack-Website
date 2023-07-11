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
        const res = await axios.post("http://localhost:8800/api/upload_nyhetbilde", formData);
        return res.data; // RETURNERER NULL SOM VERDI?
        } catch (err) {
        console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();        

        try {
        state
            ? await axios.put(`http://localhost:8800/api/nyheter/${state.id}`, {
                title,
                desc: value,
                img: file ? imgUrl : state.img , //imgURL BLIR NULL
            },{withCredentials: true,})
            : await axios.post(`http://localhost:8800/api/nyheter/`, {
                title,
                desc: value,
                img: file ? imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },{withCredentials: true,});
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
                    src={file && `http://localhost:5173/upload/Nyheter/Nyheter_Bilder/${file}`} 
                    alt="" 
                    />
                    <div className="mb-2 block mt-10 px-20">
                    <Label htmlFor="base" value="Title"/>
                    </div>
                    <TextInput className="px-20" id="base" sizing="md" type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
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
                    <Label htmlFor="file" className='file' value={`Currently selected image: ${file ? file.name : (state?.img || '')}`} />
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