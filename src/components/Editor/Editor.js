import {useState, useEffect, useRef} from "react";
import { ResizableBox } from 'react-resizable';
import ContentEditable from "react-contenteditable";
import Prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Editor = () => {
    const [className, setClassName] = useState('flex flex-col h-full w-full');
    const [code, setCode] = useState('');
    const codeArea = useRef();
    const codePre = useRef();
    useEffect(() => {
        codeArea.current.innerHTML = code.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
        hljs.highlightAll();
    }, [code]);

    const sync_scroll = (element) => {
        codePre.current.scrollTop = element.scrollTop;
        codePre.current.scrollLeft = element.scrollLeft;
    }

    const checkTab = (element, event) => {
        let code = element.value;
        if(event.key == "Tab") {
            /* Tab key pressed */
            event.preventDefault(); // stop normal
            let before_tab = code.slice(0, element.selectionStart); // text before tab
            let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
            let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
            element.value = before_tab + "\t" + after_tab; // add tab char
            // move cursor
            element.selectionStart = cursor_pos;
            element.selectionEnd = cursor_pos;
            setCode(element.value); // Update text to include indent
        }
    }

    return (
        <div className={className}>
            <div className={'Editor grow text-white relative'}>
                <textarea onChange={(e)=>{setCode(e.target.value); sync_scroll(e.target)}} onScroll={(e) => sync_scroll(e.target)}
                          className={'text-transparent bg-transparent caret-red-600 w-full h-full resize-none absolute top-0 left-0 z-10 whitespace-pre-wrap m-2 p-2 pl-7 pt-7 border-0 text-xl font-mono outline-0 overflow-auto'}
                          spellCheck={false} style={{lineHeight:"1.87rem"}} resize={false} onKeyDown={(e) => checkTab(e.target, e)}
                >
                    Hello World
                </textarea>
                <pre className={'h-full w-full absolute bg-transparent top-0 left-0 whitespace-pre-wrap m-2 p-2 border-0 text-xl mono overflow-auto'}
                     style={{lineHeight:"1.87rem"}} ref={codePre}
                >
                    <code ref={codeArea} className="language-javascript" style={{lineHeight:"1.87rem"}}>
                        console.log("Hello")
                        {code}
                    </code>
                </pre>
            </div>

            <ResizableBox width='100%' height={200} className={"bg-blue-600 w-full"}
                          minConstraints={[100, 100]} maxConstraints={["100%", 300]}
                          axis="y" resizeHandles={['n']} handle={<div className="foo w-full bg-red-500 h-2" />}
            >

            </ResizableBox>
        </div>
    )
}

export default Editor;

