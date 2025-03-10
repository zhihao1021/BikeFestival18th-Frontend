import axios from "axios";
import localforage from "localforage";

import CacheVideoData from "@/schemas/cacheVideoData";

import forumCategory from "@/data/forumCategory.json";
import departments from "@/data/departments.json";
import articles from "@/data/articles.json";
import activities from "@/data/activities.json";
import members from "@/data/members.json";
import sponsors from "@/data/sponsors.json";
import partners from "@/data/partners.json";
import souvenir from "@/data/souvenir.json";
import psycResults from "@/data/psychological-result.json";

interface Module {
    default: string,
};

const incluedVideo: Array<string> = [
    "/video.mp4",
];

const includeList: Array<string> = [
    "/external/hotel-tainan-1.webp",
    "/external/hotel-tainan-2.webp",
    "/external/hotel-tainan-3.webp",
    "/external/hotel-tainan-4.webp"
];
includeList.push(...forumCategory.map(data => data.imageURL));
includeList.push(...departments.map(data => data.photoURL));
includeList.push(...articles.map(
    data => [
        ...data.imageURL.map(url => url.replace(".webp", ".blur.webp")),
        ...data.imageURL.map(url => url.replace(".webp", ".defer.webp"))
    ]
).reduce((v, v2) => [...v, ...v2]));
includeList.push(...activities.map(
    data => [
        data.imageURL.replace(".webp", ".blur.webp"),
        data.imageURL.replace(".webp", ".defer.webp")
    ]
).reduce((v, v2) => [...v, ...v2]));
includeList.push(...members.map(data => data.imageURL));
includeList.push(...sponsors.map(data => data.imageURL))
includeList.push(...partners.map(data => data.imageURL))
includeList.push(...souvenir.map(
    data => [
        ...data.imageURL.map(url => url.replace(".webp", ".blur.webp")),
        ...data.imageURL.map(url => url.replace(".webp", ".defer.webp"))
    ]
).reduce((v, v2) => [...v, ...v2]));
includeList.push(...psycResults.map(
    data => [
        data.imageUrl.replace(".png", ".blur.webp"),
        data.imageUrl.replace(".png", ".defer.png")
    ]
).reduce((v, v2) => [...v, ...v2]));


const cachedList: Array<string> = [];

async function fetchImage(
    data: {
        needUpdate: boolean,
        setProgress: (v: number) => void,
        addDefer: (v: string) => void,
    },
    importFunc?: () => Promise<Module>,
    url?: string
) {
    const { needUpdate, setProgress, addDefer } = data;

    const src = importFunc ? (await importFunc()).default.split("?")[0] : url;
    const requestSrc = src?.includes("?") ? src : `${src}?${BUILD_TIME}`;

    if (src === undefined || src.startsWith("data:")) {
        setProgress(1);
        return;
    }
    cachedList.push(src);

    if (needUpdate) {
        if (await localforage.getItem(src) === null) {
            if (src.includes(".defer")) addDefer(src);
            else try {
                console.debug(`Update: ${src}`);
                const response = await axios.get(requestSrc, {
                    responseType: "blob",
                    onDownloadProgress: event => setProgress(event.progress ?? 0),
                });
                await localforage.setItem(src, response.data);
            }
            catch { }
        }
    }

    setProgress(1);
}

async function fetchVideo(src: string) {
    let contentLength = 0;
    let mimeType = "";
    let existData = await localforage.getItem<CacheVideoData>(src);
    if (existData === null) {
        const headResponse = await axios.head(src)
        const headers = headResponse.headers;
        contentLength = parseInt(headers["Content-Length"] ?? headers["content-length"] ?? "0");
        mimeType = headers["Content-Type"] ?? headers["content-type"] ?? "";
    }

    const cacheData = existData ?? {
        contentLength: contentLength,
        chunkCount: Math.ceil(contentLength / CHUNK_SIZE),
        chunkSize: CHUNK_SIZE,
        mimeType: `${mimeType}; codecs="avc1.4d4028, mp4a.40.2"`,
    };

    await localforage.setItem(src, cacheData);

    const idList = Array.from(Array(cacheData.chunkCount)).map((_, index) => index);
    const worker = async () => {
        while (idList.length) {
            const index = idList.shift();
            if (index === undefined) return;

            const id = `${src}$${index}`;

            if (await localforage.getItem(id) === null) {
                const start = index * CHUNK_SIZE
                const end = Math.min(start + CHUNK_SIZE - 1, cacheData.contentLength - 1);

                const response = await axios.get(src, {
                    headers: {
                        Range: `bytes=${start}-${end}`,
                    },
                    responseType: "arraybuffer",
                })

                await localforage.setItem(id, response.data);
            }
        }
    }

    await Promise.all([
        ...Array.from(Array(2)).map(() => worker())
    ])
}

export default async function cacheAll(setProgress?: (v: number) => void) {
    if (setProgress) setProgress(0);

    const buildTime = await localforage.getItem<string>("BUILD_TIME");
    const fullLoaded = await localforage.getItem<boolean>("LOADED");
    const newRelease = buildTime !== BUILD_TIME || import.meta.env.DEV;
    const needUpdate = newRelease || !fullLoaded;

    console.debug(`Last build: ${buildTime}, Static last change ${STATIC_LAST_CHANGE}`);
    if (newRelease) {
        let removeKeys = await localforage.keys();
        // removeKeys = removeKeys.filter(k => !includeList.includes(k));
        // removeKeys = removeKeys.filter(k => !incluedVideo.includes(k.split("$")[0]))
        if (!import.meta.env.DEV && buildTime && parseInt(buildTime) >= STATIC_LAST_CHANGE)
            removeKeys = removeKeys.filter(k => !includeList.includes(k));
        if (!import.meta.env.DEV && buildTime && parseInt(buildTime) >= VIDEO_LAST_CHANGE)
            removeKeys = removeKeys.filter(k => !incluedVideo.includes(k.split("$")[0]))

        await Promise.all(removeKeys.map(k => localforage.removeItem(k)));
        await localforage.setItem("BUILD_TIME", BUILD_TIME);
        await localforage.setItem("BASE_URL", import.meta.env.BASE_URL);
        await localforage.setItem("ORIGIN", window.location.origin);
    }
    const urls = Object.values(import.meta.glob("../assets/**/*"));

    const progressValue = Array.from(Array(urls.length + includeList.length)).map(() => 0);
    const updateProgress = () => {
        if (!setProgress) return;

        const value = progressValue.reduce((v, v2) => v + v2) / progressValue.length;
        if (value < 1) setTimeout(updateProgress, 100);
        setProgress(value);
    }
    updateProgress();

    const deferUrls: Array<string> = [];

    if (urls.length > 0 || includeList.length > 0) await Promise.all([
        ...urls.map((v, index) => fetchImage({
            needUpdate: needUpdate,
            setProgress: v => progressValue[index] = v,
            addDefer: v => deferUrls.push(v)
        }, v as () => Promise<Module>)),
        ...includeList.map((v, index) => fetchImage({
            needUpdate: needUpdate,
            setProgress: v => progressValue[urls.length + index] = v,
            addDefer: v => deferUrls.push(v)
        }, undefined, v)),
    ])

    const jobs = [
        ...incluedVideo.map(src => () => fetchVideo(src)),
        ...deferUrls.map(src => async () => {
            const response = await axios.get(
                src?.includes("?") ? src : `${src}?${BUILD_TIME}`,
                { responseType: "blob" }
            );
            await localforage.setItem(src, response.data);
        }),
    ];

    const worker = async () => {
        while (jobs.length) {
            const job = jobs.shift();
            if (job === undefined) return;
            await job();
        }
    }

    Promise.all([
        ...Array.from(Array(5)).map(() => worker())
    ]).then(() => {
        localforage.setItem("LOADED", true);
    }).then(() => {
        if (window.navigator.serviceWorker) {
            const BASE_URL = `${import.meta.env.BASE_URL}${import.meta.env.BASE_URL.endsWith("/") ? "" : "/"}`;
            window.navigator.serviceWorker.register(
                `${BASE_URL}sw.js?${BUILD_TIME}`,
                { scope: BASE_URL }
            );
        }
    });
}

export { cachedList };