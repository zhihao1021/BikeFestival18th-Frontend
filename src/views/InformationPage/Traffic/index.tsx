import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoadingBackground from "@/components/LoadingBackground";
import LoadIFrame from "@/components/LoadIFrame";

import style from "./index.module.scss";

export default function Traffic(): ReactNode {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/info") navigate(
            "traffic",
            {
                replace: true,
                viewTransition: false
            }
        );
    }, [location, navigate]);

    return <div className={style.traffic}>
        <h2>開車</h2>
        <h3>南下</h3>
        <div>
            走中山高速公路南下 → 於永康交流道下高速公路 → 走中正南路(西向)往台南市區 → 轉中華東路 → 達小東路口右轉(西向)直走便可抵成大校區。
        </div>
        <h3>北上</h3>
        <div>
            走中山高速公路北上 → 於仁德交流道下高速公路 → 走東門路(西向)往台南市區 → 直走遇長榮路右轉(北向)可抵自強、成功、敬業、建國校區 → 東門路過長榮路遇勝利路右轉(北向)直走可抵光復校門口。
        </div>
        <h2>大眾交通</h2>
        <div>
            台南火車站下車後，往後站方向，出口正對面即為大學路，大學路直走左手邊可見光復校門口。
        </div>
        <div>
            搭乘客運在台南火車站前站下車者， 可經由火車站天橋前往後站，後站出口左手側即為成大光復校區。
        </div>
        <div className={style.mapBox}>
            <LoadIFrame
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.7352112843873!2d120.21427611117872!3d22.996762479105048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e76ed290820d3%3A0xe0ee028be207a19e!2z5ZyL56uL5oiQ5Yqf5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1708309170975!5m2!1szh-TW!2stw"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <LoadingBackground text="地圖載入中" />
        </div>
    </div>
}