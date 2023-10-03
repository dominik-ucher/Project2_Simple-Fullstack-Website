// Write_Page.js
import React, { useState, useEffect, useContext } from 'react';
import { Label, TextInput, FileInput, Button, Select } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import 'quill-better-table/dist/quill-better-table.css'; // Import the table plugin CSS
import 'quill-better-table'; // Import the table plugin itself



const Write_Page = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.desc || '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedSidebarId, setSelectedSidebarId] = useState(null);
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Fetch the sidebar menu items from the backend
    axios
      .get('/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  }, []);

  const uploadimg = async () => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      const res = await axios.post('/api/upload_sidebilde', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadfile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload_sidefile', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = null;
    let fileUrl = null;
    if (image) {
      imgUrl = await uploadimg();
    }
    if (file) {
      fileUrl = await uploadfile();
    }

    try {
      state
        ? await axios.put(
            `/api/sider/${state.id}`,
            {
              title,
              desc: value,
              img: image ? imgUrl : state.img,
              file: file ? fileUrl : state.file,
              sidebar_id: selectedSidebarId,
            },
            { withCredentials: true }
          )
        : await axios.post(
            '/api/sider/',
            {
              title,
              desc: value,
              img: image ? imgUrl : '',
              file: file ? fileUrl : '',
              date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
              sidebar_id: selectedSidebarId,
            },
            { withCredentials: true }
          );
      navigate('/');
    } catch (err) {
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
    
      ['clean'] 
    ],
  };
  

  return (
    <div className='add'>
      <div className='content max-w-3xl mx-auto px-4'>
        <img className='w-100 h-auto mt-4 px-4' src={imageUrl || `http://localhost:5173/upload/Sider/Sider_Bilder/${state?.img}`} alt='' />
        <div className='mb-2 block mt-10 px-20'>
          <Label htmlFor='base' value='Title' />
        </div>
        <TextInput className='px-20' id='base' sizing='md' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className='max-w-md px-20 mt-5' id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='image' className='image' value='Upload picture' />
          </div>
          <FileInput
            helperText='Upload a picture'
            id='image'
            type='image'
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setImage(selectedFile);
              setImageUrl(URL.createObjectURL(selectedFile));
            }}
          />
          <Label htmlFor='image' className='image' value={`Currently selected image: ${image ? image.name : state?.img || ''}`} />
        </div>

        <div className='editorContainer h-60 h-screen mt-8'>
          <ReactQuill className='mt-5 px-20 h-3/4' theme='snow' modules={modules} value={value} onChange={setValue} />
        </div>

        <div className='max-w-md px-20 mt-5' id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='file' className='file' value='Upload File' />
          </div>
          <FileInput
            helperText='Upload a file'
            id='file'
            type='file'
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setFileUrl(URL.createObjectURL(selectedFile));
            }}
          />
          <Label htmlFor='file' className='file' value={`Currently selected file: ${file ? file.name : state?.file || ''}`} />
        </div>

        <div className='max-w-md mt-10 px-20 mb-2' id='select'>
          <div className='mb-2 block'>
            <Label htmlFor='sidebar' value='Select Sidebar Menu' />
          </div>
          <Select id='sidebar' required onChange={(e) => setSelectedSidebarId(e.target.value)}>
            <option value={null}>None</option>
            {sidebarMenus.map((menu) => (
              <option value={menu.id} key={menu.id}>
                {menu.name}
              </option>
            ))}
          </Select>
        </div>

        <div className='mt-5 px-20'>
          <Button color='dark' onClick={handleClick}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Write_Page;
