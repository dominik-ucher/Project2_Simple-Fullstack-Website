// Write_Page.js
import React, { useState, useEffect, useContext } from 'react';
import { Label, TextInput, FileInput, Button, Select, Spinner } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import moment from 'moment';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import 'quill-better-table/dist/quill-better-table.css'; // Import the table plugin CSS
import 'quill-better-table'; // Import the table plugin itself



const Write_Page = () => {
  const axiosInstance = axios.create({baseURL: import.meta.env.VITE_REACT_APP_API_URL,});
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.desc || '');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedSidebarId, setSelectedSidebarId] = useState(null);
  const [sidebarMenus, setSidebarMenus] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [insertedId, setInsertedId] = useState(null)
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/unauthorized_401');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (state) {
      setInsertedId(state?.id);
    }
  }, [state]);

  useEffect(() => {
    // Fetch the sidebar menu items from the backend
    axiosInstance
      .get('/api/sidebar/menus')
      .then((response) => {
        setSidebarMenus(response.data);
        // Set the selected menu if it exists in the state
        if (state?.sidebar_id) {
          setSelectedSidebarId(state.sidebar_id);
        }
      })
      .catch((error) => {
        console.error('Error fetching sidebar menu items:', error);
      });
  }, [state]);

  const uploadimg = async () => {
    try {
      const formData = new FormData();
      formData.append('file', image);
      const res = await axiosInstance.post('/api/upload_sidebilde', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const handleClick = async (e) => {
    setError(null)
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

    e.preventDefault();
    let imgUrl = null;
    if (image) {
      imgUrl = await uploadimg();
    }

    try {
      const response = insertedId
        ? await axiosInstance.put(
            `/api/sider/${insertedId}`,
            {
              title,
              desc: value,
              img: image ? imgUrl : state.img,
              sidebar_id: selectedSidebarId,
            },
            { withCredentials: true }
          )
        : await axiosInstance.post(
            '/api/sider/',
            {
              title,
              desc: value,
              img: image ? imgUrl : '',
              date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
              sidebar_id: selectedSidebarId,
            },
            { withCredentials: true }
          );
          const insertedId2 = response.data.id;
          if (insertedId === null){setInsertedId(insertedId2);}
          setIsLoading(false);
          setSuccess(<p>Siden har blitt publisert. Klikk {<Link className="underline hover:font-bold" to="/">her</Link>} for å komme til hjemmesiden</p>)
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
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'direction': 'rtl' }],
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'link': 'link' }], // Include the link option in the toolbar
      ['clean'],
    ],
  };

  const fetchFiles = async () => {
    try {
      const response = await axiosInstance.get(`/api/siderfiler/${insertedId}`);
      setFiles(response.data); // Assuming backend responds with an array of files
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  useEffect(() => {
    if (insertedId) {
      fetchFiles();
    }
  }, [insertedId]);

  // In the handleFileUpload function
  const handleFileUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
  
        const res = await axiosInstance.post('/api/upload_sidefile', formData);
        await axiosInstance.post('/api/siderfiler/', { filnavn: res.data, side_id: insertedId }, { withCredentials: true });
        await fetchFiles(); // Update file list immediately after upload
        setFile(null); // Reset file state after upload
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };
  
  
  const handleDelete = async (fileId) => {
    try {
      await axiosInstance.delete(`/api/siderfiler/${fileId}`);
      await fetchFiles(); // Update files immediately after deletion
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  };
  

  return (
    <div className='add'>
      <div className='content max-w-3xl mx-auto px-4'>
        <img className='w-100 h-auto mt-4 px-4' src={imageUrl || `/upload/Sider/Sider_Bilder/${state?.img}`} alt='' />
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

  {/* File upload section */}
  {insertedId ? (
  <div className='max-w-md px-20 mt-5' id='fileUpload'>
    <Label htmlFor='file' className='file' value='Upload File' />
    <FileInput
      type='file'
      id='file'
      onChange={(e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      }}
    />
    <Label htmlFor='file' className='file' value={`Currently selected file: ${file ? file.name : state?.file || ''}`} />
    <Button color='dark' onClick={handleFileUpload}>
      Upload File
    </Button>
  </div>
) : (<div className='mb-2 block'>
<div className='text-red-600 flex justify-center'>Du må publisere siden før du kan laste opp filer!</div>
</div>)}

{/* Display uploaded files */}
<div>
  {files && files.map((uploadedFile) => (
    <div key={uploadedFile.id} className='flex p-4 gap-4 px-20'>
      <span>{uploadedFile.filnavn.split("__")[1]}</span>
      <Button color='failure' size='xs' onClick={() => handleDelete(uploadedFile.id)}>Delete</Button>
    </div>
  ))}
</div>



        <div className='max-w-md mt-10 px-20 mb-2' id='select'>
          <div className='mb-2 block'>
            <Label htmlFor='sidebar' value='Select Sidebar Menu' />
          </div>
          <Select
            id='sidebar'
            required
            onChange={(e) => setSelectedSidebarId(e.target.value)}
            value={selectedSidebarId}
          >
            <option value={null}>None</option>
            {sidebarMenus && sidebarMenus.map((menu) => (
              <option value={menu.id} key={menu.id}>
                {menu.name}
              </option>
            ))}
          </Select>
        </div>


        <div className='mt-5 px-20'>
          <Button color='dark' onClick={handleClick} disabled={isLoading}>
          {isLoading ? (<Spinner aria-label="Spinner button example" />) : ('Publiser' )}
          </Button>
          {error && <p className='text-lg mt-5 text-red-500'>{error}</p>}
          {success && <p className='text-lg mt-5 text-green-500'>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Write_Page;
