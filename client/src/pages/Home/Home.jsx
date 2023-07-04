import React from 'react';
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'
import './Home.css'

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
        classname="h-auto max-w-full"
        src="https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/342891160_127035133686987_4188360982766614032_n.jpg?_nc_cat=104&cb=99be929b-3346023f&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1p9q7BNAOtIAX9_8LOq&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB_YN1eMWEmd-kCIspubdMku2xSN17IVSljBfbT7AKfxQ&oe=64AA1AE7"
        alt="image description"
        />
        <div class="relative w-12/14 mx-auto p-4 bg-gray-800 text-white rounded-xl justify-center mt-3">
        <p class="text-lg justify-center flex items-center">Velkommen til Idrettslaget Trond</p>
        <p class="text-ls mt-2 justify-center flex items-center">Artig-Inkluderende-Utviklende</p>
        </div>
        
        <div className="home">
        <div className="posts">
            {posts.map((post) => (
            <div className="post" key={post.id}>
                <div className="img">
                <img src={post.img} alt="" />
                </div>
                <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                </Link>
                <p>{post.desc}</p>
                <button>Read More</button>
                </div>
            </div>
            ))}
        </div>
        </div>
        </>
    )
}

export default Home