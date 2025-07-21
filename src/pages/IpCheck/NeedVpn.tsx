import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './needvpn.css'

const NeedVpn = () => {

    const navigate = useNavigate()

    return (
        <div className="main__ip">
            <div className="ip__icon">
                <img src="/img/no-internet.png" alt="" />
            </div>
            <h2 className="ip__subtitle">Нужен VPN</h2>
            <p className="ip__text">Посколько сервис Spotify не работает в России, для работы через аккаунт сервиса понадобиться прокси
            </p>
            <button onClick={() => window.location.reload()} className="ip__button">Обновить страницу</button>
            <Link className="ip__link" to={"/login"}>Или использовать локальный аккаунт</Link>
        </div>
    );
}

export default NeedVpn;