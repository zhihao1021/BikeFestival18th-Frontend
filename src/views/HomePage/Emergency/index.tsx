import { ReactNode } from "react";

import style from "./index.module.scss";

export default function Emergency(): ReactNode {
    return <div className={style.emergency}>
        <div className={style.box}>
            <span>成大駐警隊</span>
            <span>：06-2757575 #66666</span>
        </div>
        <div className={style.box}>
            <span>成大醫院急診部</span>
            <span>：06-2353535 #2237、06-2359562</span>
        </div>
        <div className={style.box}>
            <span>地址</span>
            <span>：70146 臺南市北區勝利路138號</span>
        </div>
        <span>如病情或受傷狀況宜由專業人員照護者，應打119專線申請專業單位救護。</span>
        <a
            href="https://linktr.ee/nckubikefestival2024"
            target="_blank"
            referrerPolicy="no-referrer"
        >成大單車節資訊傳送門</a>
    </div>
}