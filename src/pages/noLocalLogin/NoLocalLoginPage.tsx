import React, { useState, useEffect } from "react";
import Bar from '../../components/Bar';
import Nav from '../../components/Nav';
import NoLocalLogin from "./NoLocalLogin";

const NoLocalLoginPage = () => {

    return (
        <div className="container">
            <main className="main">
                <Nav />
                <NoLocalLogin />
            </main>
            <Bar state={true} />
            <footer className="footer"></footer>
        </div>
    );
}

export default NoLocalLoginPage; 