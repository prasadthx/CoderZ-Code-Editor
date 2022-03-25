import {open} from '@tauri-apps/api/dialog'
import {useState} from 'react';
import {readDir, readTextFile} from "@tauri-apps/api/fs";

const FolderOptions = (props) => {
    const [path, setPath] = useState()

    const openFolder = async () => {
        const path = await open({directory:true, recursive:true, multiple:false, title:'Choose a Folder to open in CoderZ'})
        setPath(path);
        const folderName = path.split('\\')[ path.split('\\').length - 1 ]
        props.setFolderName(folderName);
        const contents = await readDir(path, {recursive:true});
        props.setContents(getData(contents, folderName))
        props.setShowOptions(false);
    }

    const openFile = async () => {
        const path = await open({directory:false, title:'Choose a File to open in CoderZ'})
        setPath(path);
        const fileName = path.split('\\')[ path.split('\\').length - 1 ]
        props.setFolderName(fileName);
        props.setPath(path);
        // const contents = await readTextFile(path);
        // console.log(contents);
        props.setShowOptions(false);
    }

    return (
        <div hidden={!props.show} className={'absolute top-7 left-7 bg-slate-900 z-30 rounded-lg'}>
            <ul className={'cursor-pointer'}>
                <li className={'p-2 rounded-lg hover:bg-black hover:font-bold'} onClick={async ()=>await openFolder()}> Open Folder </li>
                <li className={'p-2 rounded-lg hover:bg-black hover:font-bold'} onClick={async ()=>await openFile()}> Open File </li>
            </ul>
        </div>
    )
}

export default FolderOptions;

const getData = (rawData, rootName) => {
    const data = {};
    data.name = rootName;
    data.children = [];
    rawData.forEach( (element, index, arr) => {
        if(!element.children){
            data.children.push({name: element.name});
        }
        else{
            data.children.push(getData(element.children, element.name));
        }
    })
    return data;
}
