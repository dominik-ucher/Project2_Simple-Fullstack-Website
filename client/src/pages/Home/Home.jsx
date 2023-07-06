import React from 'react';
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import { Button, Card } from 'flowbite-react';

  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
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
        alt="image description" /><div className="relative w-12/14 mx-auto p-4 bg-gray-800 text-white rounded-xl justify-center mt-3">
          <p className="text-lg justify-center flex items-center">Velkommen til Idrettslaget Trond</p>
          <p className="text-ls mt-2 justify-center flex items-center">Artig-Inkluderende-Utviklende</p>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-10 md:col-span-7 bg-white-200 px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((posts,index) => (
                <Link to="">
                <div key={posts.id}>
                <Card className="max-w-sm mt-10" href="#">
                <img className="object-cover h-48 w-96" src={posts.img} alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p className='line-clamp-3'>{posts.title}</p>
                </h5>
                <p className="line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
                <p>{posts.desc}</p>
                </p>
                <Button gradientDuoTone='redToYellow' outline className="flex"><h2>Les mer</h2></Button>
                </Card>
                </div>
                </Link>
            ))};

              </div>
            {/* Left Column */}
            {/* {posts.map((post, index) => ( */}
              {/* <div key={post.id} className={`border-solid border-2 border-gray-800 bg-emerald-300 rounded-lg p-4 mt-5 flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} `}> */}
                {/* First iteration - Image on the right, text on the left */}
                {/* <div className="w-1/2"> */}
                  {/* Image content */}
                  {/* <div className='mr-4 px-4 p-4 object-center'> */}
                    {/* <img src={post.img} alt="" className='object-cover w-full rounded-md' /> */}
                  {/* </div> */}
                {/* </div> */}
                {/* <div className=" w-1/2"> */}
                  {/* Text content */}
                  {/* <h1 className='text-lg underline decoration-1 line-clamp-3 font-bold'>{post.title}</h1> */}
                  {/* <h2 className='max-w-full flex-grow line-clamp-6' style={{ height: '100%' }}>{post.desc}</h2> */}
                  {/* <div className='mt-5 flex items-end justify-end'><Button gradientDuoTone='redToYellow' outline className="flex"><h2>Les mer</h2></Button></div> */}
                {/* </div> */}
              {/* </div> */}
            {/* ))}; */}
          </div>
          <div className="col-span-10 md:col-span-3 bg-white-300">
            {/* Right Column */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Row */}
                <div className="col-span-2">
                  {/* Content for the first row */}
                  <div className="relative w-12/14 mx-auto p-4 text-white rounded-xl justify-center mt-3 bg-blue-500 hover:bg-blue-900">
                    <Link to="https://www.facebook.com/iltrondfotball" className='pointer'><p className="text-lg justify-center flex items-center">Følg oss på Facebook</p></Link>
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
                    className="object-cover rounded-lg"
                    src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
                    alt="image description" />
                </div>
                {/* Fourth Row */}
                <div className="col-span-2">
                  {/* Content for the Fourth row */}
                  <img
                    className="object-cover rounded-lg"
                    src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
                    alt="image description" />
                </div>
                {/* Additional Rows */}
                {/* Add more div elements with the desired content for additional rows */}
              </div>
            </div>
          </div>
        </div>
        </>
      

    )
}

export default Home