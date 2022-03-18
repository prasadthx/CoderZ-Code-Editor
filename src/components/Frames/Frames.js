import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {FcGoogle, FcOpenedFolder} from "react-icons/fc";
import {RiArrowLeftCircleFill} from "react-icons/ri";
import {IoLogoAndroid, IoLogoAngular} from "react-icons/io";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";
import Iframe from 'react-iframe'
import {ImStackoverflow} from "react-icons/im";
import './Frames.css';

const Frames = () => {
    const [frameClass, setFrameClass] = useState('w-0 h-full anim');
    const [frameUrl, setFrameUrl] = useState('https://www.google.com/webhp?igu=1');
    const setFrame = (url) => {
        if(url !== frameUrl){
            setFrameUrl(url);
        }
        if(frameClass === 'w-0 h-full anim'){
            setFrameClass('w-80 anim h-full bg-blue-500');
        }
        else {
            setFrameClass('w-0 h-full anim')
        }
    }
    return (
        <div className={'flex h-full'}>
            <div className={frameClass}>
                <iframe src={frameUrl} title="W3Schools Free Online Web Tutorials" className={'h-full w-full'}/>
                {/*<webview src={frameUrl}></webview>*/}
            </div>
            <div className={'flex flex-col text-2xl'}>
                <div className={'m-3 my-7'}>
                    <FcGoogle className={'cursor-pointer'} onClick={() => setFrame('https://www.google.com/webhp?igu=1')}/>
                    {/**/}
                </div>
                <div className={'m-3  my-7 text-white'}>
                    <FaGithub className={'cursor-pointer'} onClick={() => setFrame('https://www.github.com/webhp?igu=1')}/>
                </div>
                <div className={'m-3  my-7 text-gray-500'}>
                    <ImStackoverflow className={'cursor-pointer'} onClick={() => setFrame('https://www.stackoverflow.com/')}/>
                </div>
            </div>
        </div>
    )
}

export default Frames;
