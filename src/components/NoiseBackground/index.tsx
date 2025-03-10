import { ReactNode } from "react";

import style from "./index.module.scss";

export default function NoiseBackground(): ReactNode {
    return <svg className={style.noiseBackground}>
        <filter id="noiseFilter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="1"
                stitchTiles="stitch"
                result="turbulence"
            />
            <feColorMatrix type="saturate" values="0" />
            <feGaussianBlur stdDeviation="1" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
}