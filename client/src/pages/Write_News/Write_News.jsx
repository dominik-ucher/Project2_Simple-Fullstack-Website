import React, { useContext, useEffect, useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import 'react-quill/dist/quill.snow.css'
import { Label, TextInput, FileInput, Button, Spinner } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import moment from 'moment'
import axios from 'axios'
import { AuthContext } from '../../context/authContext';

const Write_News = () => {
    const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});

    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || "");
    const [value, setValue] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) {
          navigate('/unauthorized_401');
        }
      }, [currentUser, navigate]);


    const upload = async () => {
        try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axiosInstance.post("/api/upload_nyhetbilde", formData);
        return res.data; 
        } catch (err) {
        console.log(err);
        }
    };

    const handleClick = async (e) => {
        setError(null);
        setIsLoading(true);
        if (title === ""){
            setIsLoading(false);
            setError("Tittel feltet er tom!")
            return
        }
        if (value === ""){
            setIsLoading(false);
            setError("Tekst feltet er tom!")
            return
        }
        if (file === null && state.img === null){
            setIsLoading(false);
            setError("Bilde feltet er tom!")
            return
        }

        e.preventDefault();
        let imgUrl = null;
        if (file) {
            imgUrl = await upload();
        }      

        try {
        state
            ? await axiosInstance.put(`/api/nyheter/${state.id}`, {
                title,
                desc: value,
                img: file ? imgUrl : state.img , //imgURL BLIR NULL
            },{withCredentials: true,})
            : await axiosInstance.post(`/api/nyheter/`, {
                title,
                desc: value,
                img: file ? imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },{withCredentials: true,});
            setIsLoading(false);
            setSuccess("Nyhet har blitt publisert. Du blir sendt til hjemmesiden.")
            setTimeout(()=>{
                navigate("/")
              }, 1000)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setIsLoading(false);
                setError(err.response.data.error);
            } else {
                setIsLoading(false);
                setError("En uforventet feil har skjedd!");
            }
            console.log(err);
        }
    };

    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'direction': 'rtl' }],                         // text direction
          [{ 'header': [1, 2, 3, 4, false] }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
          [{ 'link': 'link' }],
          ['clean'] 
        ],
      };

    return(
        <div className='add'>
            <div className="content max-w-3xl mx-auto px-4">
                    <img 
                    className='w-100 h-auto mt-4 px-4'
                    src={fileUrl || `/upload/Nyheter/Nyheter_Bilder/${state?.img}`} 
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
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                        setFileUrl(URL.createObjectURL(selectedFile));
                    }}
                    />
                    <Label htmlFor="file" className='file' value={`Currently selected image: ${file ? file.name : (state?.img || '')}`} />
                    </div>
                    
                    <div className="editorContainer h-60 h-screen mt-8">
                        <ReactQuill className="mt-5 px-20 h-3/4" theme="snow" modules={modules} value={value} onChange={setValue} />
                    </div>
                    
                    <div className='mt-5 px-20'>
                    <Button color="dark" onClick={handleClick} disabled={isLoading}>{isLoading ? (<Spinner aria-label="Spinner button example" />) : ('Publish' )}</Button>
                    {error && <p className='text-lg mt-5 text-red-500'>{error}</p>}
                    {success && <p className='text-lg mt-5 text-green-500'>{success}</p>}
                    </div>
                    
            </div>
        </div>
    )
}

export default Write_News;
