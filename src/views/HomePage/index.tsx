import {
    Dispatch,
    ReactNode,
    SetStateAction,
} from "react";

import CacheImage from "@/utils/CacheImage";

import lineIcon from "@/assets/home/line.svg";
import bottomImage from "@/assets/home/key-visual-bottom.webp";

import Landing from "./Landing";
import About from "./About";
import Events from "./Events";
import PsychologicalTest from "./PsychologicalTest";
import Articles from "./Articles";
import Souvenirs from "./Souvenirs";
import Partners from "./Partners";
import Emergency from "./Emergency";

import style from "./index.module.scss";

type propsType = Readonly<{
    pauseVideo: boolean,
    setPauseVideo: Dispatch<SetStateAction<boolean>>
}>;

export default function HomePage(props: propsType): ReactNode {
    const {
        pauseVideo,
        setPauseVideo
    } = props;

    return <>
        <Landing pauseVideo={pauseVideo} setPauseVideo={setPauseVideo} />
        <About />
        <Events />
        <div className={style.line}>
            <CacheImage src={lineIcon} />
            <div>
                加入LINE官方帳號，<br />
                活動通知不漏接！
            </div>
            <a
                href="https://lin.ee/7Y8Zdu0"
                target="_blank"
                referrerPolicy="no-referrer"
            >加入好友</a>
        </div>
        <PsychologicalTest />
        <Articles />
        <Souvenirs />
        <Partners />
        <Emergency />
        <div className={style.bottom}>
            <CacheImage src={bottomImage} />
            <h3>邀請你踏上探索科系的旅程！</h3>
        </div>
    </>
}