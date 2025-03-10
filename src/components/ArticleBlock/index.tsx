import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import ArticleData from "@/schemas/articleData";

import style from "./index.module.scss";

type propsType = Readonly<{
    data: ArticleData
}>;

export default function ArticleBlock(props: propsType): ReactNode {
    const {
        data
    } = props;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/forum/articles/category") navigate(
            "0",
            {
                replace: true,
                viewTransition: false
            }
        );
    }, [location, navigate]);

    return <div className={style.articleData}>
        <Link to={`/forum/articles/${data.id}`} onClick={scrollToTop} ><CacheImage
            src={data.imageURL[0].replace(".webp", ".defer.webp")}
            blurImage={data.imageURL[0].replace(".webp", ".blur.webp")}
        /></Link>
        <div className={style.detail}>
            <div className={style.categoryName}>{data.category}</div>
            <Link to={`/forum/articles/${data.id}`} onClick={scrollToTop} ><h2
                className={style.title}
            >{data.title}</h2></Link>
            <div className={style.description}>{data.content}</div>
        </div>
    </div>
}