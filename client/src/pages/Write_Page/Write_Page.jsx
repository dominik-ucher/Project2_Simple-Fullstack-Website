// Write_Page.js
import React, { useState, useEffect } from 'react';
import { Label, TextInput, FileInput, Button, Select } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Write_Page = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.desc || '');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedSidebarId, setSelectedSidebarId] = useState(null);
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the sidebar menu items from the backend
    axios
      .get('http://localhost:8800/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:8800/api/upload_sidebilde', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = null;
    if (file) {
      imgUrl = await upload();
    }

    try {
      state
        ? await axios.put(
            `http://localhost:8800/api/sider/${state.id}`,
            {
              title,
              desc: value,
              img: file ? imgUrl : state.img,
              sidebar_id: selectedSidebarId,
            },
            { withCredentials: true }
          )
        : await axios.post(
            'http://localhost:8800/api/sider/',
            {
              title,
              desc: value,
              img: file ? imgUrl : '',
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
  

  return (
    <div className='add'>
      <div className='content max-w-3xl mx-auto px-4'>
        <img className='w-100 h-auto mt-4 px-4' src={fileUrl || `http://localhost:5173/upload/Sider/Sider_Bilder/${state?.img}`} alt='' />
        <div className='mb-2 block mt-10 px-20'>
          <Label htmlFor='base' value='Title' />
        </div>
        <TextInput className='px-20' id='base' sizing='md' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className='max-w-md px-20 mt-5' id='fileUpload'>
          <div className='mb-2 block'>
            <Label htmlFor='file' className='file' value='Upload picture' />
          </div>
          <FileInput
            helperText='Upload a picture'
            id='file'
            type='file'
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setFileUrl(URL.createObjectURL(selectedFile));
            }}
          />
          <Label htmlFor='file' className='file' value={`Currently selected image: ${file ? file.name : state?.img || ''}`} />
        </div>

        <div className='editorContainer h-60 max-h-100 overflow-y-scroll mt-8'>
          <ReactQuill className='mt-5 px-20 h-full' theme='snow' value={value} onChange={setValue} />
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

        {/* <div className='mb-2 block mt-5 px-20'>
          <Label htmlFor='base' value='Add a new main page' />
        </div>
        <TextInput className='px-20' id='base' sizing='md' type='text' /> */}

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
