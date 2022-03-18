import {useState} from "react";
import { ResizableBox } from 'react-resizable';

const Editor = () => {
    const [className, setClassName] = useState('flex flex-col h-full w-full')
    return (
        <div className={className}>
            <div className={'Editor grow'}>

            </div>
            {/*<div className={'IO'}>*/}

            {/*</div>*/}

            <ResizableBox width='100%' height={200} className={"bg-blue-600 w-full"}
                          minConstraints={[100, 100]} maxConstraints={["100%", 300]}
                          axis="y" resizeHandles={['n']} handle={<div className="foo w-full bg-red-500 h-2" />}
            >

            </ResizableBox>
        </div>
    )
}

export default Editor;
