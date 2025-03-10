import { CSSProperties, ReactNode, useCallback } from "react";
import { Link } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";

import navigations from "@/data/navigations.json";

import logoWhite from "@/assets/logo-white.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import youtubeIcon from "@/assets/icons/youtube.svg";
import signupIcon from "@/assets/icons/signup.svg";

import style from "./index.module.scss";

const maxTextCount = Math.max(...navigations.map(v => v.title.length));

export default function BottomBar(): ReactNode {
    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return <div className={style.bottomBar} style={{
        "--max-text-count": maxTextCount
    } as CSSProperties}>
        <div className={style.content}>
            <div className={style.logoBox}>
                <CacheImage className={style.logo} src={logoWhite} />
                <div className={style.name}>第18屆大學科系博覽會</div>
                <div className={style.socials}>
                    <a
                        href="https://www.facebook.com/NCKUbikefestival"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    ><CacheImage src={facebookIcon} /></a>
                    <a
                        href="https://www.instagram.com/nckubike_official"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    ><CacheImage src={instagramIcon} /></a>
                    <a
                        href="https://www.youtube.com/channel/UC8Tbi8GpnYx3vQl0kjEcCFQ"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    ><CacheImage src={youtubeIcon} /></a>
                    <a
                        href="https://www.accupass.com/organizer/detail/2402190635111609133294"
                        target="_blank"
                        referrerPolicy="no-referrer"
                    ><CacheImage src={signupIcon} /></a>
                </div>
            </div>
            <div className={style.links}>
                {Array.from(Array(navigations.length / 2)).map((_, index) => <div
                    key={index}
                    className={style.linkGroup}
                >
                    <Link
                        to={navigations[index * 2].href}
                        onClick={scrollToTop}
                    >{navigations[index * 2].title}</Link>
                    <hr />
                    <Link
                        to={navigations[index * 2 + 1].href}
                        onClick={scrollToTop}
                    >{navigations[index * 2 + 1].title}</Link>
                </div>)}
            </div>
        </div>
    </div>
}