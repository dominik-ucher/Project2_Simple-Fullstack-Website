import React from 'react'
import Background from '../../img/background.jpg';
import Hosting from '../../img/Hosting.png';
import Domain from '../../img/Domain.png';
import Design from '../../img/Design.png';
import team_coding from '../../img/team_coding.jpg'
import { Helmet } from 'react-helmet';

export default function About() {


    return(
        <div className='bg-gray-900'>
            <Helmet>
            <title>Om Oss</title>
            <meta name="title" content="Om Oss" />
            <meta name="description" content="Våre tjenester innen digital markedsføring er utformet for å hjelpe deg med å nå din målgruppe og øke din bedrifts vekst. Vi tilbyr et bredt spekter av tjenester, inkludert søkemotoroptimalisering (SEO), markedsføring på sosiale medier, e-postmarkedsføring og mer." />
            <meta name="keywords" content="Raindrop Coding, RaindropCoding, digital, markedsføring, digitalmarkedsføring, nettside, kjøpe nettside" />
            <meta name="robots" content="index, follow" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            </Helmet>
{/* Third Section */}
<div className='bg-gray-900 bg-pattern pt-16'>
  <div className='w-full text-center pt-10 pb-10'>
    <h2 className='sm:text-5xl text-3xl font-medium title-font text-white mb-4'>Om Oss</h2>
    <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto mb-8'></div>
    <div className='flex flex-wrap items-center justify-center text-gray-300'>
      <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden p-4">
        <img alt="raindropcoding website design" className="object-cover object-center h-auto w-full rounded-lg shadow-lg" src={team_coding} />
      </div>

      <div className="lg:w-1/2 w-full px-6 py-6">
        <div className="flex flex-col lg:py-6 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-white text-2xl title-font font-medium mb-3">Digital Markedsføring</h2>
              <p className="leading-relaxed text-lg text-gray-300">
                Våre tjenester innen digital markedsføring er utformet for å hjelpe deg med å nå din målgruppe og øke din bedrifts vekst. Vi tilbyr et bredt spekter av tjenester, inkludert søkemotoroptimalisering (SEO), markedsføring på sosiale medier, e-postmarkedsføring og mer.
              </p>
            </div>
          </div>

          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-white text-2xl title-font font-medium mb-3">Nettside Utvikling</h2>
              <p className="leading-relaxed text-lg text-gray-300">
                Vi spesialiserer oss på å lage skreddersydde nettsidedesign som er tilpasset dine forretningsbehov. Vårt team av designere vil samarbeide med deg for å skape en nettside som både er visuelt tiltalende og brukervennlig. Vi bruker de nyeste designtrendene og teknologiene for å sikre at nettsiden din er oppdatert og møter kundenes behov.
              </p>
            </div>
          </div>

          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  </div>
</div>



<div className='flex flex-wrap items-center justify-center bg-gray-900 text-gray-300 pt-10 pb-16'>
  <div className='w-full text-center'>
    <h2 className='sm:text-5xl font-medium title-font text-white mb-4'>Hva gjør vi?</h2>
    <div className='w-16 h-1 rounded-full bg-orange-400 mx-auto'></div>
  </div>

  <div className='grid grid-cols-3 gap-10 px-10 mt-10'>
    <div className='flex justify-center text-center md:col-span-1 col-span-3'>
      <div className="flex-grow">
        <img src={Hosting} alt="" className='rounded w-60 mx-auto' />
        <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Digital Markedsføring</h2>
        <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
        <p className="leading-relaxed text-lg mt-5">Med vår tjeneste for digital markedsføring kan vi hjelpe deg med å øke din rekkevidde og popularitet, samt styrke din digitale tilstedeværelse.</p>
      </div>
    </div>
    <div className='flex justify-center text-center md:col-span-1 col-span-3'>
      <div className="flex-grow">
        <img src={Design} alt="" className='rounded w-60 mx-auto' />
        <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Nettside Bygging</h2>
        <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
        <p className="leading-relaxed text-lg mt-5">Vi spesialiserer oss på nettsidedesign som er skreddersydd dine behov. Vi lager brukervennlige nettsider som både er tiltalende og enkle å bruke.</p>
      </div>
    </div>
    <div className='flex justify-center text-center md:col-span-1 col-span-3'>
      <div className="flex-grow">
        <img src={Domain} alt="" className='rounded w-60 mx-auto' />
        <h2 className="text-white text-2xl title-font font-medium mb-3 pt-10">Digital Håndtering    </h2>
        <div className='w-32 h-1 rounded-full bg-orange-400 mx-auto mt-5'></div>
        <p className="leading-relaxed text-lg mt-5">Vi forenkler prosessen med å administrere nettsiden din og andre digitale prosesser ved å holde øye med alt for deg! Slik at du kan bruke tiden din mer effektivt.</p>
      </div>
    </div>
  </div>
        </div>
        </div>
    )
}