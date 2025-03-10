import { ReactNode } from "react";
import { Link } from "react-router-dom";

import forumCategory from "@/data/forumCategory.json";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import style from "./index.module.scss";

export default function Category(): ReactNode {
    return <div className={style.category}>
        <div className={style.box}>
            <h1>知識論壇</h1>
            {
                forumCategory.map(data => <Link
                    key={data.title}
                    to={data.href}
                    className={style.block}
                    onClick={scrollToTop}
                >
                    <CacheImage src={data.imageURL} />
                    <div className={style.info}>
                        <h2>{data.title}</h2>
                        <div className={style.context}>
                            {data.description}
                        </div>
                    </div>
                </Link>)
            }
        </div>
    </div>;
}