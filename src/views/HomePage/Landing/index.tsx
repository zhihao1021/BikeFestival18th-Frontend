import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useState,
} from "react";

import CacheVideo from "@/utils/CacheVideo";

import style from "./index.module.scss";

type propsType = Readonly<{
    pauseVideo: boolean,
    setPauseVideo: Dispatch<SetStateAction<boolean>>
}>;

export default function Landing(props: propsType): ReactNode {
    const {
        pauseVideo,
        setPauseVideo
    } = props;

    const [mute, setMute] = useState<boolean>(true);

    const switchMute = useCallback(() => {
        setMute(v => !v);
    }, []);

    return <div
        className={style.landing}
    >
        <div className={style.content}>
            {/* <iframe
            src="https://www.youtube.com/embed/KHHyFl_vx30?si=VpxSVRKh8ctG1tkt?autoplay=1&controls=0"
            allow="autoplay;encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> */}
            <CacheVideo
                src="/video.mp4"
                muted={mute}
                pauseVideo={pauseVideo}
            />
            <label className={`ms-p ${style.volume}`}>
                <input
                    type="checkbox"
                    checked={mute}
                    onChange={switchMute}
                />
            </label>
            <label className={`ms-p ${style.playState}`}>
                <input
                    type="checkbox"
                    checked={pauseVideo}
                    onChange={() => setPauseVideo(v => !v)}
                />
            </label>
            {/* <div className={style.loading} data-show={!loaded}>高畫質影片載入中...</div> */}
            <h1 className="hosr">
                NCKU<br />
                BIKE<br />
                FESTIVAL
            </h1>
            <h2>
                成大單車節<br />
                一同構築屬於自己的大學藍圖
            </h2>
            <h3>
                2025年3月8~9日<br />
                @成功大學光復校區
            </h3>
        </div>
    </div>
}