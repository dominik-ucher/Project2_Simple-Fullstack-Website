import React from 'react';
import { Label, TextInput, Select, Textarea, Button } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import Logo from '../../img/logo.png'

const Contact = () => {
    return(
        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-5 bg-gray-200">
            <h1 className="underline decoration-2 text-center font-bold text-xl mt-5">Kontakt Oss</h1>

            <div className="mb-2 block px-4 mt-4">
            <Label htmlFor="base" value="Name"/>
            </div>
            <TextInput className='px-4' id="base" sizing="md" type="text" placeholder="Name"/>


            <div className="mt-4 px-4">
            <div className="mb-2 block">
            <Label htmlFor="email4" value="Your email"/>
            </div>
            <TextInput icon={HiMail} id="email4" placeholder="name@flowbite.com" required type="email"/>
            </div>

            <div className="mb-2 block mt-4 px-4">
            <Label htmlFor="base" value="Subject"/>
            <TextInput id="base" sizing="md" type="text" />
            </div>

            <div className="mt-4 px-4" id="select">
            <div className="mb-2 block">
            <Label htmlFor="countries" value="Select your country"/>
            </div>
            <Select id="kontakt" required >
            <option>Leder</option><option>Sportslig Leder</option><option>Drift</option><option>Kasserer</option>
            </Select>
            </div>

            <div className="mt-4 px-4" id="textarea">
            <div className="mb-2 block">
            <Label htmlFor="comment" value="Your message"/>
            </div>
            <Textarea id="comment" placeholder="Melding..." required rows={4}/>
            </div>

            <div className='px-4 mt-4'><Button className="px-4" color="dark" pill><p>Send</p></Button></div>



        </div>
        <div className="col-span-10 md:col-span-5 bg-gray-200">
            <h1 className='font-bold text-xl mt-4 px-4'>Besøksadresse:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Ibsens gate 8, 7015 Trondheim</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Postadresse:</h1>
            <h2 className='text-base mt-4 px-4 underline'>Postboks 9026 Rosenborg</h2>
            <h2 className='text-base px-4 underline'>7455 Rosenborg</h2>
            <h1 className='font-bold text-xl mt-4 px-4'>Parkering</h1>
            <h2 className='text-base mt-4 px-4'>Rundt Rosenborgbanen er det soneparkering døgnet rundt. Det betyr stor fare for bøter dersom man stiller seg i gata. Ved enden av banen i sør er det både betalingsplasser og gratisplasser. Det finnes også noen parkeringsplasser utenfor klubbhuset som ikke er sonebelagt.</h2>
            <img src={Logo} alt="" />
        </div>
        </div>
    )
}

export default Contact