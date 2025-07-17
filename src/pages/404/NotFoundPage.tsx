import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import NotFound from "./NotFound";

const NotFoundPage = () => {

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <NotFound />
            </main>
            <Bar state={true} />
            <footer className="footer"></footer>
        </div>
    );
}

export default NotFoundPage; 