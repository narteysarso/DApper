import logo from "../images/logo.png";
import { Menu} from "antd";
import { Link } from "react-router-dom";
import { routes } from "./Routes";

const Navbar = () => {
    return (
        <>
            <div className="branding">
                <img src={logo} alt="logo" width={64} /> <span> KryptoVers </span>
            </div>

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['4']} style={{ justifyContent: 'center', flexGrow: 1 }}>
                {[...routes].map((title, index) => {
                    const key = index + 1;
                    return <Menu.Item key={key} >
                        <Link to={`/${title.toLocaleLowerCase()}`}>
                            {title}
                        </Link>
                    </Menu.Item>;
                })}

            </Menu>


        </>
    )
}

export default Navbar;