import {useState} from "react";

const Editor = () => {
    const [className, setClassName] = useState('flex flex-col')
    return (
        <div className={className}>
            <div className={'Editor grow'}>

            </div>
            <div className={'IO'}>

            </div>
        </div>
    )
}

export default Editor;
