import React, { useState } from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link } from "react-router-dom"
import  Sidebar  from '../../components/Sidebar/Sidebar.jsx'
import 'react-quill/dist/quill.snow.css'
import { Label, TextInput, FileInput, Button, Select } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const Write_Page = () => {

    const [value, setValue] = useState('');


    return(
        <div className='add'>
            <div className="content max-w-3xl mx-auto px-4">
                    <img 
                    className='w-100 h-auto mt-4 px-4'
                    src='https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/345151623_146524801584118_676052246615036439_n.jpg?_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=UTt9iWkn2pQAX8fOWk4&_nc_oc=AQn05ZgY9OJutvXAA_Nw4nW7YY4XhBWaUTlLQxcXi3f7lL8xDmPI2PmD7kMj9TdZm1I&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB7d15526W7TC96JqVPwVCDHfysHcJJGeX6QUCzqgumRw&oe=64AA470E' 
                    alt="" 
                    />

                    <div className="max-w-md mt-10 px-20 mb-2" id="select">
                    <div className="mb-2 block">
                    <Label htmlFor="countries" value="Velg hvor den skal"/>
                    </div>
                    <Select id="countries" required>
                    <option>Om Trond</option><option>Fotball</option><option>Lagene</option><option>Allidrett</option>
                    </Select>
                    </div>

                    <div className="mb-2 block mt-5 px-20">
                    <Label htmlFor="base" value="Legg til ny hovedside"/>
                    </div>
                    <TextInput className="px-20" id="base" sizing="md" type="text"/>

                    <div className="mb-2 block mt-5 px-20">
                    <Label htmlFor="base" value="Title"/>
                    </div>
                    <TextInput className="px-20" id="base" sizing="md" type="text"/>
                    <div className="max-w-md px-20 mt-5" id="fileUpload">
                    <div className="mb-2 block">
                    <Label htmlFor="file" value="Upload picture"/>
                    </div>
                    <FileInput
                        helperText="Upload a picture"
                        id="file"
                        accept="image/*"
                    />
                    </div>
                    <div className="editorContainer h-60 max-h-100 overflow-y-scroll mt-8">
                        <ReactQuill className="mt-5 px-20 h-full" theme="snow" value={value} onChange={setValue} />
                    </div>
                    <div className="max-w-md px-20 mt-8" id="fileUpload">
                    <div className="mb-2 block">
                    <Label htmlFor="file" value="Upload file"/>
                    </div>
                    <FileInput
                        helperText="Upload a file"
                        id="file"
                    />
                    </div>
                    <div className='mt-5 px-20'>
                    <Button color="dark">Upload</Button>
                    </div>
            </div>
        </div>
    )
}

export default Write_Page