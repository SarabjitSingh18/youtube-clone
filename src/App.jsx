import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './Pages/Home/Home'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Video from './Pages/video/Video'
import { Route, Routes } from 'react-router-dom' 


const App = () => {
  const [sidebar,setSidebar] = useState(false);
  return (
    <>
    <Navbar setSidebar={setSidebar}/>
    <Routes>
      <Route path='/' element={<Home sidebar={sidebar}/>}/>
      <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
     

    </Routes>
  
   
      
    </>
  )
}

export default App
