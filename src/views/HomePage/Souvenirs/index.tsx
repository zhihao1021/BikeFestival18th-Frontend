import { ReactNode } from "react";
import { Link } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import souvenirs from "@/data/souvenir.json";

import style from "./index.module.scss";

export default function Souvenirs(): ReactNode {
    return <div className={style.souvenirs}>
        <div className={style.box}>
            <div className={style.title}>
                <h2>紀念品小舖</h2>
            </div>
            <div className={style.content}>{
                souvenirs.map(data => <CacheImage
                    key={data.name}
                    src={data.imageURL[0].replace(".webp", ".defer.webp")}
                    blurImage={data.imageURL[0].replace(".webp", ".blur.webp")}
                />)
            }</div>
            <Link to="/souvenir" className={style.seeMore} onClick={scrollToTop} >
                <span className="ms">arrow_right_alt</span>
                <span>查看更多</span>
            </Link>
        </div>
    </div>
}