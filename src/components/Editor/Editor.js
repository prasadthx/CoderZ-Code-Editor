import {useState, useEffect, useRef} from "react";
import { ResizableBox } from 'react-resizable';
import "prismjs/themes/prism-tomorrow.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AppTerminal from "./Terminal";

const Editor = () => {
    const [className, setClassName] = useState('flex flex-col h-full w-full bg-transparent');
    const [code, setCode] = useState('');
    const [lineNumbers, setLineNumbers] = useState(1);
    const displayLineNumbers = useRef();
    const codeArea = useRef();
    const codePre = useRef();
    const lineNumberScroll = useRef();

    useEffect(() => {
        codeArea.current.innerHTML = code.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
        hljs.highlightAll();
    }, [code]);

    useEffect(() => {
        displayLineNumbers.current.innerHTML += `${lineNumbers}<br/>`;
    },[lineNumbers,]);

    const sync_scroll = (element) => {
        codePre.current.scrollTop = element.scrollTop;
        lineNumberScroll.current.scrollTop = element.scrollTop;
        codePre.current.scrollLeft = element.scrollLeft;
    }

    const checkTab = (element, event) => {
        let code = element.value;
        if(event.key === "Enter"){
            setLineNumbers(lineNumbers + 1);
        }
        if(event.key === "Tab") {
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
            <div className={'Editor flex h-full text-white relative bg-transparent overflow-auto'}>
                <div ref={lineNumberScroll} className={'h-full w-7 bg-transparent my-2 border-r-2 border-slate-700 overflow-auto'}>
                    <div ref={displayLineNumbers} className={'py-5 overflow-auto'} style={{lineHeight:"1.87rem"}}>
                        {/*{lineNumbers}*/}
                    </div>
                </div>
                <div className={'h-full w-full relative'}>
                    <textarea onChange={(e)=>{setCode(e.target.value); sync_scroll(e.target)}} onScroll={(e) => sync_scroll(e.target)}
                               className={'text-transparent bg-transparent caret-red-600 w-full h-full resize-none absolute top-0 left-0 right-0 bottom-0 z-10 whitespace-pre-wrap m-0 p-7 border-0 text-xl font-mono outline-0 overflow-auto'}
                               spellCheck={false} style={{lineHeight:"1.87rem"}} resize={false} onKeyDown={(e) => checkTab(e.target, e)}
                    >

                    </textarea>

                    <pre className={'h-full w-full absolute bg-transparent top-0 left-0 bottom-0 right-0 whitespace-pre-wrap m-0 border-0 text-xl mono overflow-auto'}
                          style={{lineHeight:"1.87rem", margin: "0 0 0 0", background:"transparent", padding:"8px 8px 8px 8px", fontFamily: "monospace", fontSize: "1.25rem"}} ref={codePre}
                    >
                               <code ref={codeArea} className="language-javascript" style={{lineHeight:"1.87rem", background:'transparent', margin:"0px 0px 0px 0px"}}>
                                    {code}
                               </code>
                    </pre>
                </div>
            </div>

            <ResizableBox width='100%' height={200} className={"w-full h-full flex flex-col-reverse"}
                          minConstraints={[100, 100]} maxConstraints={["100%", 300]}
                          axis="y" resizeHandles={['n']} handle={
                              <div className="w-full bg-purple-900 font-bold text-slate-300 text-center cursor-row-resize">
                                Terminal
                              </div>
                          }
                    >
                    <AppTerminal/>
            </ResizableBox>

        </div>
    )
}

export default Editor;

// <textarea onChange={(e)=>{setCode(e.target.value); sync_scroll(e.target)}} onScroll={(e) => sync_scroll(e.target)}
//           className={'text-transparent bg-transparent caret-red-600 w-full h-full resize-none absolute top-0 left-0 z-10 whitespace-pre-wrap m-2 p-2 pl-7 pt-7 border-0 text-xl font-mono outline-0 overflow-auto'}
//           spellCheck={false} style={{lineHeight:"1.87rem"}} resize={false} onKeyDown={(e) => checkTab(e.target, e)}
// >
//                     Hello World
//                 </textarea>
// <pre className={'h-full w-full absolute bg-transparent top-0 left-0 whitespace-pre-wrap m-2 p-2 border-0 text-xl mono overflow-auto'}
//      style={{lineHeight:"1.87rem"}} ref={codePre}
// >
//                     <code ref={codeArea} className="language-javascript" style={{lineHeight:"1.87rem"}}>
//                         console.log("Hello")
//                         {code}
//                     </code>
//                 </pre>
