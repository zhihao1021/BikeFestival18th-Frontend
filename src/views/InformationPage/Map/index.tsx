import { ReactNode } from "react";

import CacheImage from "@/utils/CacheImage";

import mapData from "@/data/mapData.json";

import map from "@/assets/info/map/map.defer.webp";
import mapBlur from "@/assets/info/map/map.blur.webp";

import style from "./index.module.scss";

export default function Map(): ReactNode {
    return <div className={style.map}>
        <a
            href={`${import.meta.env.BASE_URL}/map.full.png`.replace("//", "/")}
            download="map.png"
            className={style.download}
        >
            <span>點此下載</span>
            <span className="ms">download</span>
        </a>
        <CacheImage src={map} blurImage={mapBlur} />
        <div className={style.boothLocation}>
            {
                mapData.map(data => <div
                    key={data.location}
                    className={style.block}
                >
                    <h3>{data.location}</h3>
                    <hr />
                    {
                        data.booths.map(booth => <div
                            key={booth.code}
                            className={style.booth}
                        >
                            <span>{booth.code}</span>
                            <span>{booth.name}</span>
                        </div>)
                    }
                </div>)
            }
        </div>
    </div>
}