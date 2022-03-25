import logo from './logo.svg';
import './App.css';
import FileSidebar from "./components/FileSidebar/FileSidebar";
import Editor from "./components/Editor/Editor";
import Frames from "./components/Frames/Frames";
import {useState} from "react";

function App() {
  const [path, setPath] = useState('');
  return (
    <div className="App">
        <div>
            <FileSidebar setPath={setPath}/>
        </div>
        <div className={'grow'}>
            <Editor path={path}/>
        </div>
        <div>
            <Frames/>
        </div>
    </div>
  );
}

export default App;
