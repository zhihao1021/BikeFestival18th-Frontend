import { ReactNode } from "react";
import { Link } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";

import psychologicalTest from "@/assets/home/psychological_test.defer.webp";
import psychologicalTestBlur from "@/assets/home/psychological_test.blur.webp";

import style from "./index.module.scss";

export default function PsychologicalTest(): ReactNode {
    return <div className={style.psycTest}>
        <div className={style.box}>
            <CacheImage
                src={psychologicalTest.split("?")[0]}
                blurImage={psychologicalTestBlur.split("?")[0]}
            />
            <div className={style.content}>
                <div className={style.context}>
                    在尋找方向之前，要先知道自己是誰，才能知道自己適合什麼、想要什麼。<br />
                    但，你真的了解自己嗎？<br />
                    <br />
                    第十八屆成大單車節限定測驗！<br />
                    「在單車的世界裡，你的本體是...？」<br />
                    各式各樣的單車，你是哪一種單車呢？<br />
                    此外還有推薦的單車節行程、能力分析、好夥伴和壞夥伴們，等你來解鎖！
                </div>
                <Link
                    to="/psychological-test"
                >
                    <span className="ms">arrow_right_alt</span>
                    <span>前往測驗</span>
                </Link>
            </div>
        </div>
    </div>
}