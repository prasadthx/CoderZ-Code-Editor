import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {FcGoogle, FcOpenedFolder} from "react-icons/fc";
import {RiArrowLeftCircleFill} from "react-icons/ri";
import {IoLogoAndroid, IoLogoAngular} from "react-icons/io";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";

const Frames = () => {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <ProSidebar className={'text-white'} collapsed={collapsed} rtl={true} >
            <SidebarHeader className={'inline-flex items-center justify-evenly'}>
                {
                    collapsed ? (
                        <FcOpenedFolder onClick={()=>setCollapsed(false)} className={'cursor-pointer text-2xl'} />
                    ) : (
                        <>
                            <h1> Folder Name </h1>
                            <RiArrowLeftCircleFill onClick={() => setCollapsed(true)} className={'cursor-pointer text-2xl'} />
                        </>
                    )
                }
            </SidebarHeader>
            <SidebarContent>
                {/**
                 *  You can add the content of the sidebar ex: menu, profile details, ...
                 */}
                <Menu iconShape="square">
                    <MenuItem icon={<FcGoogle/>}>Dashboard</MenuItem>
                    <MenuItem icon={<FaGithub/>}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<IoLogoAngular />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                {/**
                 *  You can add a footer for the sidebar ex: copyright
                 */}
            </SidebarFooter>
        </ProSidebar>
    )
}

export default Frames;
