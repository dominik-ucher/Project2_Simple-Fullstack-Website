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
        <div className='text-red-600 flex items-center justify-center text-lg mt-10'>Hvis du finner en feil, eller har forslag til forbedringer send e-post til dominikucher@hotmail.com</div>
        <div className="grid grid-cols-10 gap-4">
            <div className="col-span-10 md:col-span-5 bg-white-200 flex flex-col items-center mt-20">
            <Link to="/register">
            <Card className="max-w-sm hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }} >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Legg til ny bruker</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>For å legge til nye brukere på nettsiden.</p>
                </p>
            </Card>
            </Link>
            <Link to ="/write_news">
            <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Legg til ny nyhet</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>For å legge til nye nyheter.</p>
                </p>
            </Card>
            </Link>
            <Link to="/navbar_edit">
            <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger NavBar</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>For å redigere menyen øverst på siden (Navigation Bar).</p>
                </p>
            </Card>
            </Link>
            <Link to="/homepagepic_edit">
            <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger Forside Bilde</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>For å redigere det store bildet som ses på forsiden.</p>
                </p>
            </Card>
            </Link>
            <Link to="/user_edit">
            <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Rediger brukere</p>
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Oversikt over alle brukere. Kan redigere og slette brukere.</p>
                </p>
            </Card>
            </Link>
            <Link to="/sidebarmenu_edit">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Rediger Meny</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Redigere Side Menyen. Legges til eller slette faner.</p>
                    </p>
                </Card>
            </Link>
                    
            </div>
            <div className="col-span-10 md:col-span-5 bg-white-200 flex flex-col items-center mt-20">
                <Link to="/write_page">
                <Card className="max-w-sm hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Legg til ny side</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>For å legge til en nye sider</p>
                    </p>
                </Card>
                </Link>
                <Link to="/homepagemenu_edit">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Redigere forside meny</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Oversikt over menyene på Forsiden. Kan legges til, redigeres eller slettes.</p>
                    </p>
                </Card>
                </Link>
                <Link to="/sponsor_edit">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Rediger Sponsorer</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Oversikt over alle sponsorene. Kan legges til eller slettes</p>
                    </p>
                </Card>
                </Link>
                <Link to="/personeredit">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>Legg til Personer</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>For å legge til grupper og personer til gruppene</p>
                    </p>
                </Card>
                </Link>
                <Link to="/paymentcreate">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>!! IKKE I BRUK !! Opprette en faktura</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>For å opprette og sende faktura</p>
                    </p>
                </Card>
                </Link>
                <Link to="/paymentedit">
                <Card className="max-w-sm mt-5 hover:bg-gray-200" style={{ minWidth: "385px", minHeight: "170px" }}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>!! IKKE I BRUK !! Redigere betalinger</p>
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>Oversikt og mulighet til å redigere faktura som har blitt sendt</p>
                    </p>
                </Card>
                </Link>
                
            </div>
        </div></>
    )
}

export default Admin