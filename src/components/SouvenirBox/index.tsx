import { CSSProperties, ReactNode, useEffect, useState } from "react";

import SouvenirData from "@/schemas/souvenirData";

import style from "./index.module.scss";
import CacheImage from "@/utils/CacheImage";

type propsType = Readonly<{
    data: SouvenirData,
    showImage: (index: number) => void
}>;

export default function SouvenirBox(props: propsType): ReactNode {
    const {
        data,
        showImage
    } = props;

    const [, setLastChange] = useState<number>(0);
    const [imageIndex, setImageIndex] = useState<number>(-1);

    useEffect(() => {
        setLastChange(Date.now())
        setTimeout(() => {
            setLastChange(v => {
                if (Date.now() - v < 5000) return v;

                setImageIndex((imageIndex + 1) % data.imageURL.length);
                return Date.now();
            })
        }, 5000);
    }, [imageIndex, data]);

    useEffect(() => setImageIndex(0), []);

    return <div className={style.souvenirBox}>
        <h2>{data.name}</h2>
        <div className={style.imageList}>
            <div
                className={style.imageBox}
                data-mult={data.imageURL.length > 1}
                style={{
                    "--index": imageIndex,
                    "--len": data.imageURL.length
                } as CSSProperties}
            >
                {
                    data.imageURL.map((url, index) => <CacheImage
                        key={url}
                        src={url.replace(".webp", ".defer.webp")}
                        blurImage={url.replace(".webp", ".blur.webp")}
                        onClick={() => showImage(index)}
                    />)
                }
            </div>
        </div>
        <div className={style.imageIndex}>
            {
                Array.from(Array(data.imageURL.length)).map((_, index) => <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    data-selected={imageIndex === index}
                />)
            }
        </div>
        <div className={style.description}>{data.description}</div>
        <div className={style.price}>{data.price}</div>
    </div>;
}