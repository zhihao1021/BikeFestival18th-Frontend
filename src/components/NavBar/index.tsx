import {
    ReactNode,
    useCallback,
    useState
} from "react";
import { Link, useLocation } from "react-router-dom";

import NavBarDropDownMenu from "./NavBarDropDownMenu";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import navigations from "@/data/navigations.json";

import logo from "@/assets/logo.svg";

import style from "./index.module.scss"

type propsType = Readonly<{
    scrollDown: boolean
}>;

export default function NavBar(props: propsType): ReactNode {
    const {
        scrollDown
    } = props;


    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const location = useLocation();

    const switchMenu = useCallback(() => {
        setOpenMenu(v => !v);
    }, []);

    return <div
        className={style.navBar}
        data-scrolldown={scrollDown || location.pathname !== "/"}
    >
        <div className={style.content}>
            <Link to="/" className={style.logo} onClick={scrollToTop}>
                <CacheImage src={logo} />
            </Link>
            <div className={style.menu}>
                <label className={`ms-p ${style.menuSwitchButton}`}>
                    <input type="checkbox" checked={openMenu} onChange={switchMenu} />
                </label>
                <div className={style.menuContent}>
                    {
                        navigations.map(data => <NavBarDropDownMenu
                            key={data.title}
                            title={data.title}
                            href={data.href}
                            options={data.options}
                            closeTab={() => { setOpenMenu(false); scrollToTop(); }}
                        />)
                    }
                </div>
            </div>

            <a
                href="https://www.accupass.com/organizer/detail/2402190635111609133294"
                target="_blank"
                referrerPolicy="no-referrer"
                className={style.signUp}
            >即刻報名</a>
        </div>
    </div>
}