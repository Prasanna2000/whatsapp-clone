import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './css/App.css';
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Home from "./components/Home";
import { useStateValue } from "./state/StateProvider";


function App() {

  const { user } = useStateValue()[0];
  return (
    <div className="app">
      {!user ? (
        <Login />
      )
        : <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<h1>Invalid Route</h1>} />
            </Routes>
          </Router>
        </div>}
    </div>
  );
}

export default App;
