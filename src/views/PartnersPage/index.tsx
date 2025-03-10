import { ReactNode } from "react";

import PartnerBox from "@/components/PartnerBox";
import CacheImage from "@/utils/CacheImage";

import sponsors from "@/data/sponsors.json";
import partners from "@/data/partners.json";

import gdgLogo from "@/assets/gdg-logo.svg";

import style from "./index.module.scss";

export default function PartnersPage(): ReactNode {
    return <div className={`${style.partners} page`}>
        <div className={style.box}>
            <h1>贊助廠商</h1>
            <div className={style.clickToSeeMore}>點開以查看更多資訊</div>
            <div className={style.partnerList}>
                {sponsors.map(data => <PartnerBox key={data.name} data={data} />)}
            </div>
            <h1>網站開發團隊</h1>
            <a
                className={style.support}
                href="mailto:contact@chih-hao.xyz?subject=單車節官網問題回報"
                target="_blank"
                referrerPolicy="no-referrer"
            >發現問題？</a>
            <a
                className={style.devTeam}
                href="https://gdg.community.dev/gdg-on-campus-national-cheng-kung-university-tainan-city-taiwan/"
                target="_blank"
                referrerPolicy="no-referrer"
            >
                <CacheImage src={gdgLogo} />
            </a>
            <h1>合作夥伴</h1>
            <div className={style.clickToSeeMore}>點開以查看更多資訊</div>
            <div className={style.partnerList}>
                {partners.map(data => <PartnerBox key={data.name} data={data} />)}
            </div>
        </div>
    </div>
}