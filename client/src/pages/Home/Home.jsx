import React from 'react';
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react';

  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

const Home = () => {
    return(
        <>
        <img
        className="object-cover h-auto w-1024"
        src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
        alt="image description"
        />
        <div className="relative w-12/14 mx-auto p-4 bg-gray-800 text-white rounded-xl justify-center mt-3">
        <p className="text-lg justify-center flex items-center">Velkommen til Idrettslaget Trond</p>
        <p className="text-ls mt-2 justify-center flex items-center">Artig-Inkluderende-Utviklende</p>
        </div>

        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-6 bg-gray-200">
          {/* Left Column */}
          {posts.map((post,index) => (
          <div key={post.id} className={`p-4 flex items-center justify-between ${index % 2 === 0 ? 'flex-row':'flex-row-reverse'} `}>
            {/* First iteration - Image on the right, text on the left */}
            <div className="w-1/2">
              {/* Image content */}
              <img src={post.img} alt="" className='h-48 w-48 mt-3'/>
            </div>
            <div className="w-1/2">
              {/* Text content */}
              <h1 className='text-lg underline decoration-1 font-bold'>{post.title}</h1>
              <h2>{post.desc}</h2>
              <Button gradientDuoTone='redToYellow' outline className="flex items-center justify-center"><h2>Les mer</h2></Button>
            </div>
          </div>
          ))}
        </div>
        <div className="col-span-4 bg-gray-300">
          {/* Right Column */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Row */}
              <div className="col-span-2">
                {/* Content for the first row */}
                <div className="relative w-12/14 mx-auto p-4 bg-blue-500 text-white rounded-xl justify-center mt-3">
                <p className="text-lg justify-center flex items-center">Følg oss på Facebook</p>
                </div>
              </div>
              {/* Second Row */}
              <div className="col-span-2">
                {/* Content for the second row */}
                <h1 className="text-xl font-bold justify-center flex items-center">Nyttig Informasjon</h1>
              </div>
              {/* Third Row */}
              <div className="col-span-2">
                {/* Content for the third row */}
                <img
                className="object-cover"
                src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
                alt="image description"
                />
              </div>
              {/* Fourth Row */}
              <div className="col-span-2">
                {/* Content for the Fourth row */}
                <img
                className="object-cover"
                src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
                alt="image description"
                />
              </div>
              {/* Additional Rows */}
              {/* Add more div elements with the desired content for additional rows */}
            </div>
          </div>
        </div>
      </div>










        {/* <div className='flex home_page mt-3'>
          <div className='news_list flex-5 mt-3'>
            {posts.map((posts) => (
            <div className='news box-border h-auto w-auto p-4 border-4' key={posts.id}>
              <div className='img'>
                <img className="object-right object-scale-down h-48 w-full" src={posts.img} alt="" />
              </div>
              <div className='content'>
                <Link className='link' to={posts.id}>
                  <h1>{posts.title}</h1>
                </Link>
                <p>{posts.desc}</p>
                <button>Read More</button>
              </div>
            </div>
            ))}
          </div>
          <div className='flex-2 menu'>
            <div className="relative w-12/14 mx-auto p-4 bg-blue-500 text-white rounded-xl justify-center mt-3">
            <p className="text-lg justify-center flex items-center">Følg oss på Facebook</p>
            </div>
            <h1 className='info'>Nyttig Informasjon</h1>
            {posts.map((post) => (
            <div className="post" key={post.id}>
              <img className='menu_img' src={post.img} alt="" />
              <h2>{post.title}</h2>
              <button>Read More</button>
            </div>
            ))}
          </div>
        </div> */}
        </>
    )
}

export default Home