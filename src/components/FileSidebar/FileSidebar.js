import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import react, {useState} from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {IoLogoAngular, IoLogoAndroid} from "react-icons/io";
import {RiArrowLeftCircleFill} from "react-icons/ri";
import {FcOpenedFolder} from 'react-icons/fc'
import {VscFolder} from 'react-icons/vsc';
import FolderOptions from "./FolderOptions";
import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import ShowFiles from "./ShowFiles";

const FileSidebar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [contents, setContents] = useState({});
    const [folderName, setFolderName] = useState('Open a Folder');
    const onTreeStateChange = (state, event) => console.log(state, event);


    return (
        <ProSidebar className={'text-white'} collapsed={collapsed} width={350}>
            <SidebarHeader className={'inline-flex items-center justify-evenly'}>
                {
                    collapsed ? (
                        <FcOpenedFolder onClick={()=>setCollapsed(true)} className={'cursor-pointer text-2xl'} />
                    ) : (
                        <>
                            <VscFolder className={'relative cursor-pointer'} onClick={()=>setShowOptions(showOptions !== true)}/>
                            <FolderOptions show={showOptions} setPath={props.setPath} setShowOptions={setShowOptions} setContents={setContents} setFolderName={setFolderName}/>
                            <h1 className={'font-bold text-md p-3'}> {folderName} </h1>
                            <RiArrowLeftCircleFill onClick={() => setCollapsed(false)} className={'cursor-pointer text-2xl'} />
                        </>
                    )
                }
            </SidebarHeader>
            <SidebarContent>
                {/**
                 *  You can add the content of the sidebar ex: menu, profile details, ...
                 */}
                {/*<Menu iconShape="square">*/}
                {/*    <MenuItem icon={<IoLogoAndroid />}>Dashboard</MenuItem>*/}
                {/*    <SubMenu title="Components" icon={<IoLogoAngular />}>*/}
                {/*        <MenuItem>Component 1</MenuItem>*/}
                {/*        <MenuItem>Component 2</MenuItem>*/}
                {/*    </SubMenu>*/}
                {/*</Menu>*/}

                <ShowFiles data={contents}/>

            </SidebarContent>
            <SidebarFooter>
                {/**
                 *  You can add a footer for the sidebar ex: copyright
                 */}
            </SidebarFooter>
        </ProSidebar>
    )
}

export default FileSidebar;
