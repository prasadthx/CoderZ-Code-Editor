import {open} from '@tauri-apps/api/dialog'

const FolderOptions = (props) => {
    const openFolder = async () => {
        const path = await open({directory:true, recursive:true, multiple:false, title:'Choose a Folder to open in CoderZ'})
        console.log(path)
    }
    return (
        <div hidden={props.show} className={'absolute top-7 left-7 bg-slate-900 z-30 rounded-lg'}>
            <ul className={'cursor-pointer'}>
                <li className={'p-2 rounded-lg hover:bg-black hover:font-bold'} onClick={async ()=>await openFolder()}> Open Folder </li>
                <li className={'p-2 rounded-lg hover:bg-black hover:font-bold'}> Open File </li>
            </ul>
        </div>
    )
}

export default FolderOptions;
