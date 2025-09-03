import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouterLink from './MainRouterLink'
import MainRouterLinkEn from './MainRouterLinkEn';

export default function RouterLink() {
    return (
        <BrowserRouter>
         
            <Routes>
           
                <Route path="/*" element={<MainRouterLink />} />
                <Route path="/english/*" element={<MainRouterLinkEn />} />
            </Routes>
        </BrowserRouter>
    )
}