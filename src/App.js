import logo from './logo.svg';
import './App.css';
import GetPosts from './Posts/PostsList';
import {
  BrowserRouter as Router, Routes,
  Route,
  NavLink
} from "react-router-dom";
import DisplayPosts from './Posts/DisplayPosts';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<GetPosts />} />
            <Route path="/display" element={<DisplayPosts />} />
          </Routes>
        </div>
        
      </Router>
    </>
  );
}

export default App;