import logo from './logo.svg';
import './App.css';
import FileSidebar from "./components/FileSidebar/FileSidebar";
import Editor from "./components/Editor/Editor";
import Frames from "./components/Frames/Frames";

function App() {
  return (
    <div className="App">
        <div>
            <FileSidebar/>
        </div>
        <div className={'grow'}>
            <Editor/>
        </div>
        <div>
            <Frames/>
        </div>
    </div>
  );
}

export default App;
