import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>          
          {/* Profile Page */}
          <Route path="/" exact element={<Home/>}/>
          <Route path="/chat/:name" exact element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
