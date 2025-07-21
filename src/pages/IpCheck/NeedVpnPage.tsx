import NeedVpn from "./NeedVpn";
import Bar from "../../components/Bar";


const NeedVpnPage = () => {

    return (
        <div className="container">
            <main className="main">
                {/* <Nav /> */}
                <NeedVpn />
            </main>
            <Bar state={true} />
            <footer className="footer"></footer>
        </div>
    );
}

export default NeedVpnPage;