import { ReactNode } from "react";

import CacheImage from "@/utils/CacheImage";

import members from "@/data/members.json";

import background from "@/assets/about/background.defer.webp";
import backgroundBlur from "@/assets/about/background.blur.webp";

import style from "./index.module.scss";
import MemberCard from "@/components/MemberCard";

export default function AboutPage(): ReactNode {
    return <div className={`page ${style.aboutPage}`}>
        <CacheImage
            src={background}
            blurImage={backgroundBlur}
            className={style.background}
        />
        <div className={style.box}>
            <div className={style.block}>
                <h2>活動宗旨</h2>
                <div className={style.context}>
                    <div>國立成功大學自立校以來，累積深厚學術與人文底蘊，孕育無數學子於專業殿堂及社會各處無私奉獻；歷來以社會參與為經營目標，形塑特殊使命與學生特質。冀透過本次活動，向大眾展示成功大學作為全臺綜合型大學所能提供的學習資源、師資設備、產學合作，以溫馨有感的豐富活動，做為全台高中生迷惘未來時之引路人。</div>
                    <h3>驅散名為迷惘的迷霧</h3>
                    <div>猶記得高三那年，一出學測考場，人生頓失方向。該讀哪間學校、報什麼學系？此起彼落的疑問，成了每個考生心中的困擾，也迴盪在每次與父母、導師的談話間。不管閱覽了多少網路資料，你仍然躊躇不前，甚至更加心焦——這樣的選擇是對的嗎？去了那裡會不會後悔？</div>
                    <br />
                    <div>已然進入所屬科系的我們，知道這樣的輪迴仍然不斷上演。所以我們自問，該如何消弭高中生們內心的不安。曾經籠罩我們的迷惘，就由我們來驅散。這份理念，就是單車節的初心。</div>
                </div>
            </div>
            <div className={style.block}>
                <h2>單車節緣起</h2>
                <div className={style.context}>
                    <div>成大單車節，以成大校園內最具有標誌性的交通工具命名，「縮小南北城鄉差距」與「彌平高中端與大學端的資訊落差」是我們的活動宗旨，更是我們的使命。</div>
                    <br />
                    <div>我們也都曾經是迷茫的高中生，在快速變遷的環境與課綱下，尋找屬於自己未來的人生方向；如今我們將化身為高中生們的引路人，帶領高中生們探索自我，構築屬於自己的大學藍圖！</div>
                    <h3>什麼是單車節？</h3>
                    <div>單車節為全台最豐富的大學科系博覽會，由成大的學生來組織活動並主導進行。活動當天會有許多科系攤位與各項專案活動，讓對未來志向有所迷茫的高中生能夠透過與科系最直接的接觸，探索自我、解決對科系的疑惑。</div>
                    <h3>為什麼以單車為命名？</h3>
                    <div>由於單車對於成大學生來說是生活中必不可少的，成大學生的共同回憶非屬騎單車上學莫屬，也成為了一個成大生的象徵，因此我們用單車作為成大的信物，藉此更能與「成大」本身做連結。</div>
                    <h3>舉辦單車節的初衷</h3>
                    <div>我們都曾是迷惘且不知所措的高中生，時常對於未來的不確定性感到不安。尤其在選擇科系的時候，因為不清楚、不瞭解科系。所以最常問的肯定是：「我適合這個科系嗎？」</div>
                    <br />
                    <div>這時候需要的就是一個引路人，幫忙解決困惑。為了幫助迷茫的高中生更瞭解這些科系，單車節這個活動因而誕生。希望藉由學長姐的親身經歷，讓高中生站在我們的肩膀上，能將前方的路看得更清楚，也能對自己將要面臨的選擇更加確定，這就是我們舉辦此活動的初衷！</div>
                </div>
            </div>
            <h2>認識籌備團隊</h2>
            <div className={style.members}>
                {
                    members.map(data => <MemberCard key={data.name} data={data} />)
                }
            </div>
        </div>
    </div>
}