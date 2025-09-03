import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouterLink from './MainRouterLink'


export default function RouterLink() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainRouterLink />} />
            </Routes>
        </BrowserRouter>
    )
}