import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import ArticleBlock from "@/components/ArticleBlock";
import BigView from "@/components/BigView";

import CacheImage from "@/utils/CacheImage";
import randomChoice from "@/utils/randomChoice";

import ArticleData from "@/schemas/articleData";

import articleCategoryMap from "../articleCategoryMap";

import style from "./index.module.scss";

type propsType = Readonly<{
    data: ArticleData
}>;

export default function ArticleContent(props: propsType): ReactNode {
    const {
        data
    } = props;

    const [bigView, setBigView] = useState<boolean>(false);
    const [viewIndex, setViewIndex] = useState<number>(0);

    const relateArticles = useMemo(() => randomChoice(
        articleCategoryMap[data.category].filter(v => v.id !== data.id), 2
    ), [data]);

    useEffect(() => {
        setViewIndex(0);
        setBigView(false);
    }, [data]);

    return <div className={style.articleContent}>
        <Link
            to={`/forum/articles/${Object.keys(articleCategoryMap).indexOf(data.category)}`}
            className={style.categoryLink}
        ><h2>{data.category}</h2></Link>
        <h1>{data.title}</h1>
        <CacheImage
            className={style.titleImg}
            src={data.imageURL[0].replace(".webp", ".defer.webp")}
            blurImage={data.imageURL[0].replace(".webp", ".blur.webp")}
        />
        <div className={style.textBlock}>
            <div className={style.info}>
                <div className={style.infoBlock}>
                    <span>撰稿人</span>
                    <span className={style.author}>{data.author}</span>
                </div>
                <div className={style.infoBlock}>
                    <span>發布於</span>
                    <span>{data.uploadDate}</span>
                </div>
            </div>
            <div className={style.description}>
                {data.content.split("\n").map((str, index) => <div
                    key={index}
                >{str}</div>)}
            </div>
        </div>
        <div className={style.imgList}>
            {
                data.imageURL.slice(1).map((src, index) => <CacheImage
                    key={index}
                    src={src.replace(".webp", ".defer.webp")}
                    blurImage={src.replace(".webp", ".blur.webp")}
                    onClick={() => {
                        setViewIndex(index + 1);
                        setBigView(true);
                    }}
                />)
            }
        </div>
        <h3>更多相關文章</h3>
        <div className={style.relateArticles}>
            {
                relateArticles.map(
                    data => <ArticleBlock key={data.id} data={data} />
                )
            }
        </div>
        <BigView
            show={bigView}
            imageUrl={data.imageURL[viewIndex]?.replace(".webp", ".defer.webp")}
            blurImage={data.imageURL[viewIndex]?.replace(".webp", ".blur.webp")}
            last={() => setViewIndex(v => v > 1 ? v - 1 : 1)}
            next={() => setViewIndex(v => v < data.imageURL.length - 1 ? v + 1 : data.imageURL.length - 1)}
            close={() => setBigView(false)}
        />
    </div>
}