import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../../client/src/pages/Home'
import Messages from '../../client/src/pages/Messages'
import Friends from '../../client/src/pages/Friends'
import Logout from '../../client/src/pages/Logout'
import Login from '../../client/src/pages/Login'


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages"></Route>
        <Route path="/friends" ></Route>
        <Route path="/logout"></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
