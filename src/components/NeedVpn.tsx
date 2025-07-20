import Nav from "./Nav";

import Sidebar from "./Sidebar";
import Bar from "./Bar";


const NeedVpn = () => {

    return (
        <div className="container">
            <main className="main">
                <Nav />


            </main>
            <Bar state={true} />
            <footer className="footer"></footer>
        </div>
    );
}

export default NeedVpn;