import { ReactNode, useState } from "react";

import SouvenirBox from "@/components/SouvenirBox";

import souvenirs from "@/data/souvenir.json";

import style from "./index.module.scss";
import BigView from "@/components/BigView";

export default function SouvenirPage(): ReactNode {
    const [showImage, setShowImage] = useState<boolean>(false);
    const [showImageList, setShowImageList] = useState<Array<string>>([]);
    const [showImageIndex, setShowImageIndex] = useState<number>(0);

    return <div className={`${style.souvenir} page`}>
        <div className={style.box}>
            <h1>單車節限定紀念品</h1>
            <div className={style.list}>
                {
                    souvenirs.map(data => <SouvenirBox
                        key={data.name}
                        data={data}
                        showImage={(index: number) => {
                            setShowImageList(data.imageURL);
                            setShowImageIndex(index);
                            setShowImage(true);
                        }}
                    />)
                }
            </div>
        </div>
        <BigView
            show={showImage}
            imageUrl={showImageList[showImageIndex]?.replace(".webp", ".defer.webp")}
            blurImage={showImageList[showImageIndex]?.replace(".webp", ".blur.webp")}
            last={() => setShowImageIndex(v => v > 0 ? v - 1 : showImageList.length - 1)}
            next={() => setShowImageIndex(v => v < showImageList.length - 1 ? v + 1 : 0)}
            close={() => setShowImage(false)}
        />
    </div>
}