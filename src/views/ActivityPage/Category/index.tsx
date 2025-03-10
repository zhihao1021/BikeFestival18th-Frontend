import { ReactNode } from "react";
import { Link } from "react-router-dom";

import activities from "@/data/activities.json";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import style from "./index.module.scss";

export default function Category(): ReactNode {
    return <div className={style.category}>
        <div className={style.box}>
            <h1>主題活動</h1>
            {
                activities.map(data => <Link
                    key={data.title}
                    to={data.href}
                    className={style.block}
                    onClick={scrollToTop}
                >
                    <CacheImage
                        src={data.imageURL.replace("webp", "defer.webp")}
                        blurImage={data.imageURL.replace("webp", "blur.webp")}
                    />
                    <div className={style.info}>
                        <h2>{data.title}</h2>
                        <div className={style.context}>
                            {data.brief}
                        </div>
                    </div>
                </Link>)
            }
        </div>
    </div>;
}