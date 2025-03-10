import { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";
import randomChoice from "@/utils/randomChoice";

import arrow from "@/assets/home/arrow.svg";

import articles from "@/data/articles.json";

import style from "./index.module.scss";
import ArticleBlock from "@/components/ArticleBlock";

export default function Articles(): ReactNode {
    const displayArticles = useMemo(() => {
        return randomChoice(articles, 2);
    }, []);

    return <div className={style.articles}>
        <div className={style.box}>
            <div className={style.title}>
                <CacheImage src={arrow} />
                <h2>專欄文章</h2>
            </div>
            <div className={style.content}>
                <div className={style.list}>
                    {
                        displayArticles.map(data => <ArticleBlock
                            key={data.id}
                            data={data}
                        />)
                    }
                </div>
                <Link to="/forum/articles" className={style.seeMore} onClick={scrollToTop} >
                    <span className="ms">arrow_right_alt</span>
                    <span>查看更多</span>
                </Link>
            </div>
        </div>
    </div>
}