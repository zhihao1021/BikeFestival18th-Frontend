import {
    CSSProperties,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import style from "./index.module.scss";
import ActivityData from "@/schemas/activityData";
import CacheImage from "@/utils/CacheImage";

type propsType = Readonly<{
    data: ActivityData
}>;

export default function HomeEventBox(props: propsType): ReactNode {
    const {
        data
    } = props;

    const contextRef = useRef<HTMLDivElement>(null);

    const [contextHeight, setContextHeight] = useState<number>(0);

    const updateHeight = useCallback(() => {
        setContextHeight(v => contextRef.current?.clientHeight ?? v);
    }, [contextRef]);

    useEffect(() => {
        updateHeight();
    }, [data, updateHeight]);

    return <div className={style.homeEventBox}>
        <CacheImage
            src={data.imageURL.replace(".webp", ".defer.webp")}
            blurImage={data.imageURL.replace(".webp", ".blur.webp")}
        />
        <div className={style.filter} />
        <div className={style.content}>
            <h3>{data.title}</h3>
            <div className={style.mask} style={{
                "--height": `${contextHeight}px`
            } as CSSProperties}>
                <div
                    ref={contextRef}
                    className={style.context}
                >{data.brief}</div>
            </div>
        </div>
    </div>
}