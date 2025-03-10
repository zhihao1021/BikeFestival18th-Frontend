import CacheVideoData from "@/schemas/cacheVideoData";
import localforage from "localforage";
import {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";


type propsType = {
    src: string,
    muted: boolean,
    pauseVideo: boolean
};

const createdVideo: { [key: string]: string } = {};

function sleep(time: number): Promise<void> {
    return new Promise((res) => setTimeout(res, time));
}

async function getVideo(src: string, callback?: () => void): Promise<string> {
    // if (createdVideo[src]) return createdVideo[src];

    const videoData = await localforage.getItem<CacheVideoData>(src);
    if (videoData === null) {
        await sleep(200);
        return await getVideo(src, callback);
    };

    if (!window.MediaSource || !MediaSource.isTypeSupported(videoData.mimeType)) {
        console.log("Browser not support")
        return src
    };

    const mediaSource = new MediaSource();
    const url = URL.createObjectURL(mediaSource);
    createdVideo[src] = url;

    mediaSource.addEventListener("sourceopen", event => {
        const mediaSource = event.target as MediaSource;
        const sourceBuffer = mediaSource.addSourceBuffer(videoData.mimeType);

        const fetch = async (index: number) => {
            if (index >= videoData.chunkCount) {
                sourceBuffer.addEventListener("updateend", () => mediaSource.endOfStream());
                return;
            }
            const id = `${src}$${index}`;

            let buffer = await localforage.getItem<ArrayBuffer>(id);
            while (buffer === null) {
                buffer = await localforage.getItem<ArrayBuffer>(id);
                await sleep(100);
            }

            sourceBuffer.appendBuffer(buffer);
            await new Promise(res => sourceBuffer.addEventListener("updateend", res))
            fetch(index + 1);
        };
        fetch(0)
    })

    return url;
}

export default function CacheVideo(props: propsType): ReactNode {
    const {
        src,
        muted,
        pauseVideo
    } = props;

    const ref = useRef<HTMLVideoElement>(null);

    const [msSrc, setMsSrc] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
        getVideo(src, ref.current?.play).then(url => {
            setMsSrc(url)
        });
    }, [src]);

    useEffect(() => {
        if (ref.current?.readyState) {
            if (pauseVideo) ref.current?.pause();
            else ref.current?.play();
        }
    }, [pauseVideo, ref]);

    return <video
        ref={ref}
        src={msSrc}
        loop
        autoPlay
        muted={muted}
        onCanPlay={event => {
            if (!pauseVideo) (event.target as HTMLVideoElement).play()
        }}
        onPause={event => setCurrentTime((event.target as HTMLVideoElement).currentTime)}
        onPlay={event => (event.target as HTMLVideoElement).currentTime = currentTime}
    />
}