import { ReactNode, useEffect, useState } from "react";

import CacheImage from "@/utils/CacheImage";

import results from "@/data/psychological-result.json";

import titleBg from "@/assets/psychological-test/resultTitle.svg";
import startButton from "@/assets/psychological-test/startButton.svg";
import resultStart from "@/assets/psychological-test/resultStar.svg";
import cursor from "@/assets/psychological-test/cursor.webp";

import style from "./index.module.scss";

type propsType = Readonly<{
    result: number,
    next: () => void
}>;

export default function ResultPage(props: propsType): ReactNode {
    const {
        result,
        next
    } = props;

    const [showText, setShowText] = useState<number>(0);
    const [hide, setHide] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShowText(v => v < results[result].description.length + 5 ? v + 1 : v);
        }, 100);
    }, [showText, result]);

    return <>
        <div className={style.title}>
            <CacheImage className={style.bg} src={titleBg} />
            <CacheImage className={style.star} src={resultStart} />
            <h2>! 快陶成功 !</h2>
        </div>
        <div className={style.description}>
            {results[result].description.slice(0, showText)}
        </div>
        <button
            className={style.seeResult}
            data-show={showText >= results[result].description.length + 5}
            onClick={() => {
                setHide(true);
                setTimeout(next, 1000);
            }}
        >
            <CacheImage className={style.resultButtonBg} src={startButton} />
            <CacheImage className={style.cursor} src={cursor} />
            <div data-text="點我解鎖你的神秘成就">點我解鎖你的神秘成就</div>
        </button>
        <div className={style.mask} data-show={hide}>
            <div />
        </div>
    </>
}