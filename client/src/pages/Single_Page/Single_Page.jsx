import React from 'react';
import editicon from '../../img/edit.png'
import deleteicon from '../../img/delete.png'
import Logo from '../../img/logo.png'
import { Link } from "react-router-dom"

const Single_Page = () => {
    return(
        <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-7 bg-gray-200">
        <div className='single'>
            <div className='content'>
                <img 
                className='w-100 h-auto mt-4 px-4'
                src='https://scontent.fosl3-2.fna.fbcdn.net/v/t39.30808-6/345151623_146524801584118_676052246615036439_n.jpg?_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=UTt9iWkn2pQAX8fOWk4&_nc_oc=AQn05ZgY9OJutvXAA_Nw4nW7YY4XhBWaUTlLQxcXi3f7lL8xDmPI2PmD7kMj9TdZm1I&_nc_ht=scontent.fosl3-2.fna&oh=00_AfB7d15526W7TC96JqVPwVCDHfysHcJJGeX6QUCzqgumRw&oe=64AA470E' 
                alt="" 
                />
            </div>
            <div className='user'>
                <div className='edit flex items-center mt-4 px-4'>
                    <img className="rounded-full" src={Logo} alt="" style={{ width: '80px', height: '50px' }}/>
                    <div>
                    <h1>Idrettslaget Trond</h1>
                    <h2>Posted 2 days ago</h2>
                    </div>
                    <Link to={`/write?edit=2`}>
                    <img className="w-10 h-10 cursor-pointer" src={editicon} alt="" />
                    </Link>
                    <img className="w-10 h-10 cursor-pointer" src={deleteicon} alt="" />
                </div>
            </div>
            <h1 className='flex items-center justify-center mt-4'>This is the title of this page</h1>
            <p className='text-black flex items-center justify-center mt-10 px-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis turpis vitae lacus placerat ultricies. Aenean purus libero, pulvinar nec justo vel, facilisis consequat ante. Aliquam ut diam velit. Curabitur lectus mi, aliquam sit amet fringilla non, fermentum vitae diam. Donec a est laoreet, bibendum nulla vitae, pulvinar neque. Integer interdum, ligula convallis mattis sodales, urna massa dapibus purus, eget finibus augue lectus ut felis. Cras dapibus libero orci, in dictum ex rutrum eu. Quisque faucibus dignissim mi, a elementum neque pretium quis. Vestibulum lobortis, nulla eu elementum mollis, diam risus posuere tortor, quis interdum lectus lectus eget eros. Cras tincidunt sodales posuere. Ut vitae porta urna. Etiam fermentum commodo justo, sit amet dapibus sapien condimentum quis. Etiam elementum leo felis, a venenatis felis volutpat vitae.

                Fusce dui elit, lacinia nec semper et, semper eget erat. Sed ornare egestas enim a porta. Suspendisse vestibulum lacus sem, nec imperdiet erat suscipit non. Praesent et lorem a ante varius egestas et id diam. Vivamus non posuere nisi. Proin lorem mauris, iaculis sit amet urna eget, finibus tristique purus. Donec aliquam quis purus eget mollis. Vivamus vestibulum ultricies ipsum et aliquet. Proin imperdiet quis velit a molestie. Phasellus aliquet fringilla ipsum et semper. Proin nec mollis ex, at sollicitudin arcu. Curabitur condimentum porta nisl, in posuere lacus condimentum eu. Integer suscipit sollicitudin leo, nec interdum magna finibus quis. Sed justo enim, pulvinar eu fringilla a, hendrerit eget ante. Vivamus vestibulum, tellus at condimentum porta, urna mauris ultrices orci, at porta felis magna sed est. Mauris congue orci massa.

                Curabitur eu odio facilisis, egestas dolor a, ultricies elit. Integer vitae risus ac lorem blandit porttitor. Nulla aliquam ex id metus gravida mattis. Quisque nec augue id tortor eleifend viverra. Proin posuere, lectus in cursus vestibulum, tortor urna suscipit orci, ac pulvinar justo metus ut est. Cras quis ipsum eu libero vulputate sodales a vel quam. In aliquet tellus vel hendrerit varius. Duis vitae tristique tortor. Duis non ultricies nisi. Morbi varius iaculis nunc et accumsan. Donec tempor lacus pretium neque faucibus, quis dictum ligula fermentum. In sit amet venenatis ligula. Mauris hendrerit lectus nisi. Sed vitae mi venenatis lectus porta lobortis. Pellentesque orci arcu, mollis nec nisi et, mollis tincidunt sapien.

                Duis at convallis erat. Cras vitae arcu risus. In sed cursus lectus. Cras eu mollis nisl, sed consequat felis. Mauris nunc nibh, porttitor a metus non, fringilla sodales eros. Vestibulum non suscipit dui. Nullam erat libero, auctor eu dictum id, mattis sit amet neque. Aenean venenatis risus imperdiet pretium bibendum. Pellentesque accumsan tempus pulvinar.

                Donec in diam non lectus pharetra consequat. Cras varius turpis tellus, id auctor ligula sodales vel. Curabitur convallis massa quis sem eleifend ultrices. Mauris non nunc id leo aliquet sodales a ac mi. Donec venenatis velit ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus quis augue neque. Nunc eu ultrices felis. Sed volutpat dui nec pulvinar convallis. Aliquam in neque at orci aliquet euismod. Praesent pretium nisl elit, ac hendrerit diam pretium eu. Integer sodales ipsum libero, ac malesuada mauris imperdiet posuere. Cras vehicula commodo pretium. Donec sagittis placerat magna, nec laoreet mauris blandit eu. Duis quis arcu sed tellus auctor molestie non at magna.
            </p>
        </div>
        </div>
        <div className="col-span-10 md:col-span-3 bg-gray-200">

        </div>
        </div>
    )
}

export default Single_Page