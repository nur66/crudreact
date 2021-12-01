import ReactDOM from 'react-dom'

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tambah from './pages/Tambah'
import Nav from './layouts/Nav'
// import 'bootstrap/dist/css/bootstrap.min.css'


const Nur = () => {
    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/tambah" element={<Tambah/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Nur

if(document.getElementById('lisa')){
    ReactDOM.render(<Nur/>, document.getElementById('lisa'))
}
