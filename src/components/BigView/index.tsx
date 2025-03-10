import { MouseEvent, ReactNode } from "react";

import style from "./index.module.scss";
import CacheImage from "@/utils/CacheImage";

type propsType = Readonly<{
    show: boolean,
    imageUrl: string,
    blurImage?: string,
    next: () => void,
    last: () => void,
    close: () => void
}>;

export default function BigView(props: propsType): ReactNode {
    const {
        show,
        imageUrl,
        blurImage,
        next,
        last,
        close
    } = props;

    return <div data-show={show} className={style.bigView} onClick={(event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains(style.bigView)) close();
    }}>
        <div className={style.displayBox}>
            <div
                className={style.last}
                onClick={last}
            ><span className="ms">keyboard_arrow_left</span></div>
            <div
                className={style.next}
                onClick={next}
            ><span className="ms">keyboard_arrow_right</span></div>
            <CacheImage
                src={show ? imageUrl : undefined}
                blurImage={show ? blurImage : undefined}
            />
        </div>
    </div>;
}