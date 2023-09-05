import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
'use client'
import {Card} from 'flowbite-react'
import { Link } from 'react-router-dom';


const Admin = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        if (!currentUser){
            navigate('/unauthorized_401');
        }
    }, [currentUser, navigate]);

    return(
        <><div className='font-bold flex items-center justify-center text-4xl mt-10'>Velkommen til Admin Side</div>
        <div className="grid grid-cols-10 gap-4 ">
            <div className="col-span-10 md:col-span-5 bg-white-200 flex flex-col items-end mt-20">
            <Link to="/register">
            <Card className="max-w-sm" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Legg til ny bruker</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Klikk her for å komme til registrer siden og legge til ny bruker</p>
                </p>
            </Card>
            </Link>
            <Link to ="http://localhost:5173/write_news">
            <Card className="max-w-sm mt-5" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Legg til ny nyhet</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </p>
            </Card>
            </Link>
            <Link to="http://localhost:5173/navbar_edit">
            <Card className="max-w-sm mt-5" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger NavBar</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </p>
            </Card>
            </Link>
            <Link to="http://localhost:5173/homepagepic_edit">
            <Card className="max-w-sm mt-5" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger Forside Bilde</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </p>
            </Card>
            </Link>
            <Link to="http://localhost:5173/user_edit">
            <Card className="max-w-sm mt-5" href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger brukere</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </p>
            </Card>
            </Link>
                    
            </div>
            <div className="col-span-10 md:col-span-5 bg-white-200 flex flex-col items-front mt-20">
                <Link to="http://localhost:5173/write_page">
                <Card className="max-w-sm" href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Legg til ny side</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </p>
                </Card>
                </Link>
                <Link to="http://localhost:5173/homepagemenu_edit">
                <Card className="max-w-sm mt-5" href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Redigere forside meny</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </p>
                </Card>
                </Link>
                <Link to="http://localhost:5173/sponsor_edit">
                <Card className="max-w-sm mt-5" href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Rediger/Legg til Sponsor</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </p>
                </Card>
                </Link>
                <Card className="max-w-sm mt-5" href="#">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Legg ut varsel (IKKE I BRUK)</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </p>
                </Card>
                <Link to="http://localhost:5173/sidebarmenu_edit">
                <Card className="max-w-sm mt-5">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Rediger Sidebar</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </p>
                </Card>
                </Link>
            </div>
        </div></>
    )
}

export default Admin