import localforage from "localforage";
import {
    DetailedHTMLProps,
    ImgHTMLAttributes,
    ReactNode,
    useEffect,
    useMemo,
    useState
} from "react";

import { cachedList } from "../cacheAll";

import style from "./index.module.scss";

const createdImage: { [key: string]: string } = {};

type propsType = {
    blurImage?: string,
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

function getCacheSrc(src: string, callback?: (v: string) => void) {
    if (!cachedList.includes(src)) createdImage[src] = src;
    if (createdImage[src] !== undefined) {
        if (callback) callback(createdImage[src]);
        return;
    }

    localforage.getItem<Blob>(src).then(value => {
        if (value) {
            const objectUrl = URL.createObjectURL(value);
            createdImage[src] = objectUrl
            if (callback) callback(objectUrl);
        }
        else setTimeout(() => getCacheSrc(src, callback), 250);
    })
}

export default function CacheImage(props: propsType): ReactNode {
    const {
        src,
        blurImage,
    } = props;

    const [dataSrc, setDataSrc] = useState<string | undefined>();
    const [dataBlurSrc, setDataBlurSrc] = useState<string | undefined>();

    const newProps = useMemo(() => {
        const replaceSrc = createdImage[props.src ?? ""] ?? dataSrc ?? dataBlurSrc ?? undefined;
        // const replaceSrc = undefined;
        const result = Object.assign(
            Object.fromEntries(Object.entries(props)),
            {
                className: [props.className, style.cacheImage].join(" ").trim(),
                src: cachedList.includes(props.src ?? "") ? replaceSrc : props.src
            }
        );

        delete result["blurImage"];

        return result;
    }, [props, dataSrc, dataBlurSrc]);

    useEffect(() => {
        if (src) getCacheSrc(src, setDataSrc);
    }, [src]);

    useEffect(() => {
        if (blurImage) getCacheSrc(blurImage, setDataBlurSrc);
    }, [blurImage]);

    if (props.blurImage) return <img
        {...newProps}
        data-loaded={(dataSrc?.startsWith("blob:") || dataSrc?.startsWith("data:")) ?? false}
        loading="lazy"
        style={dataBlurSrc ? {
            backgroundImage: `url(${dataBlurSrc})`,
        } : undefined}
    />
    return <img {...newProps} />
}