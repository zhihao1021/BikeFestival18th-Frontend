import { ReactNode } from "react";

import sponsors from "@/data/sponsors.json";

import style from "./index.module.scss";
import PartnerBox from "@/components/PartnerBox";

export default function Partners(): ReactNode {
    return <div className={style.partners}>
        <div className={style.box}>
            <div className={style.title}>
                {/* <CacheImage src={arrow} /> */}
                <h2>特別感謝</h2>
            </div>
            <div className={style.content}>{
                sponsors.map(data => <PartnerBox key={data.name} data={data} />)
            }</div>
        </div>
    </div>
}