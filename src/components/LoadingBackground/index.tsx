import { CSSProperties, ReactNode, useEffect, useState } from "react";

import style from "./index.module.scss";

type propsType = Readonly<{
    text: string,
    replaceText?: boolean,
    noBackground?: boolean,
    color?: string
}>;

export default function LoadingBackground(props: propsType): ReactNode {
    const {
        text,
        replaceText,
        noBackground,
        color
    } = props;

    const [dotCount, setDotCount] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => setDotCount(v => (v + 1) % 4), 1000);
    }, [dotCount]);

    return <div
        className={style.loadingBackground}
        data-background={noBackground ? "0" : "1"}
        style={{ "--color": color ?? "#FFF" } as CSSProperties}
    >
        <div className={style.box}>
            <svg viewBox="0 0 192 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M60.0885 50.5947C60.3842 50.5396 60.6902 50.5676 60.9702 50.6795C61.673 50.9569 62.0357 51.4783 62.0095 52.0585C61.9771 52.8119 61.4595 53.2384 60.5259 53.2802C59.81 53.3134 58.7996 54.2565 58.5706 55.2617C58.4459 55.804 58.4005 56.1668 58.5439 56.9576C58.8899 58.8896 59.7466 60.4914 59.0302 60.6934C58.2872 60.9023 56.3967 60.4302 56.0107 57.6231C55.7815 54.9637 56.69 51.8274 59.0707 50.8562C59.4133 50.7148 59.7883 50.6441 60.0834 50.594L60.0885 50.5947Z" />
                <path
                    d="M115.525 34.9779C114.782 34.5657 114.885 32.9753 115.755 31.4256C116.626 29.876 117.934 28.9539 118.677 29.3661C119.42 29.7783 119.317 31.3687 118.447 32.9184C117.576 34.468 116.268 35.3901 115.525 34.9779Z" />
                <path
                    d="M123.328 37.5755C122.505 37.1196 122.578 35.4341 123.489 33.8108C124.4 32.1875 125.806 31.2412 126.628 31.6971C127.45 32.153 127.378 33.8384 126.467 35.4617C125.555 37.085 124.15 38.0313 123.328 37.5755Z" />
                <path
                    d="M146.6 86.2767C147.471 86.4472 148.209 85.6183 147.933 84.7801L137.597 56.5232C137.52 56.314 137.275 56.2116 137.073 56.304C134.898 57.2805 133.475 57.9365 131.199 58.9312C130.315 59.317 128.968 59.9057 128.28 58.6424C127.463 57.1327 129.434 56.5144 130.306 56.1374C132.804 55.0529 135.31 54.0309 137.788 52.8979C142.335 50.816 146.877 48.7284 151.424 46.6465L154.822 45.0862C155.293 44.8688 155.559 44.3494 155.431 43.8471C154.949 41.9698 152.944 43.9759 151.492 42.6783C151.293 42.4998 151.166 42.1154 151.199 41.8483C151.255 41.3998 151.43 41.0378 151.669 40.735C152.203 40.0546 151.513 39.0931 150.679 39.3265C149.504 39.6502 148.503 39.6988 148.793 38.1229C148.845 37.8275 149.232 37.3384 149.707 37.0807C150.051 36.8934 150.224 36.823 150.224 36.823C151.137 36.4102 150.372 34.697 149.443 35.077L123.92 45.5619C123.528 45.7228 123.073 45.6964 122.715 45.4623C121.384 44.6046 122.898 43.054 124.17 42.5326L135.095 38.0352C135.28 37.9611 135.372 37.7577 135.318 37.5718L128.221 14.0965C128.133 13.8091 127.767 13.7274 127.564 13.9477L77.1132 68.639C76.4448 69.364 75.7427 70.1103 74.8182 70.4501C73.8944 70.7848 72.8769 70.6727 71.8968 70.55L71.8765 70.5475C68.0564 69.8337 64.0901 69.5878 60.2296 69.1146C59.2241 68.9887 58.1298 68.8312 57.5871 67.8112C57.3989 67.4601 57.4012 67.0304 57.6231 66.7C58.5861 65.2697 60.512 67.3535 61.5821 65.604C61.8154 65.2237 61.9128 64.7753 61.9321 64.3324C62.0743 60.8494 61.892 62.3876 62.1412 60.3562C62.2125 59.7868 62.7447 59.3262 63.3166 59.4132C64.2992 59.5567 64.4401 60.3677 64.4996 61.0865C64.6181 62.4884 64.6121 63.8952 64.4881 65.2974C64.4195 66.0514 64.9157 66.7431 65.6501 66.9323C67.6282 67.4461 69.6803 67.698 71.724 67.6878C72.4723 67.6842 72.8539 67.0666 72.4167 66.2339C70.7972 63.1445 71.1703 58.5592 69.8524 56.439C69.1178 55.262 67.6206 52.6382 69.1744 51.8859C69.6578 51.6496 70.1851 52.2582 70.5135 52.6832C72.2104 54.8662 73.1115 57.3487 73.552 60.0091C73.823 61.6347 73.5098 64.7125 76.0688 64.7463C76.7638 64.7566 77.423 64.4348 77.8898 63.92L90.1909 50.2849C90.3767 50.0779 90.2844 49.7439 90.0159 49.6642L75.7271 45.2339C74.4956 44.8545 73.1033 44.3168 72.7038 43.0998C72.4538 42.3366 72.6862 41.511 72.9116 40.7407C73.551 38.5995 74.1905 36.4583 74.8243 34.3215C75.137 33.2654 75.5386 32.1589 76.6325 31.7022C77.661 31.2731 78.8779 31.5227 79.9266 31.7564C86.3329 33.1933 92.7436 34.6358 99.15 36.0727C99.687 36.1911 100.107 36.6276 100.178 37.1688C100.369 38.6155 98.6613 38.6986 97.5117 38.4471L79.3567 34.4949C78.9047 34.3974 78.582 34.8739 78.8159 35.2717C78.8413 35.3159 78.8667 35.36 78.8814 35.4079C78.9793 35.6556 79.0183 36.1262 78.6712 36.18C78.55 36.2007 78.4306 36.1652 78.3094 36.1449C77.5642 36.0004 76.8004 36.5394 76.6188 37.2486C76.4472 37.9181 76.7733 38.6089 77.1488 39.1524C77.389 39.4998 78.3142 40.1838 77.8195 40.6337C77.6851 40.7601 77.4845 40.7964 77.3049 40.7893C77.1253 40.7822 76.9393 40.7435 76.7546 40.7357C76.2113 40.7087 75.4543 41.0284 75.2758 41.5896C75.2504 41.6683 75.2448 41.7546 75.2715 41.8296C75.3255 41.9745 75.4881 42.0358 75.636 42.0902C77.5392 42.7482 79.4438 43.3962 81.3471 44.0542C83.2954 44.723 85.2482 45.3974 87.1965 46.0662C88.3336 46.4594 89.4712 46.8475 90.6082 47.2407L90.6971 47.2723C91.2462 47.4588 91.836 47.6503 92.4001 47.5111C92.9643 47.3719 93.3917 46.9239 93.7856 46.4972L127.498 9.98309C127.767 9.69424 128.127 9.49369 128.519 9.45571C129.6 9.34546 129.896 10.1553 130.111 10.8681C130.111 10.8681 136.891 33.0856 137.901 36.3854C137.967 36.5984 138.206 36.7102 138.412 36.6285C141.59 35.3476 144.753 34.0957 148.003 32.9416C149.967 32.2458 151.51 32.654 153.038 33.7103C154.216 34.5231 154.682 35.989 155.306 37.2239C157.119 40.8239 157.808 41.5447 157.992 43.8198C158.162 45.9651 156.561 47.3461 154.783 48.2393C150.837 50.2173 146.788 51.9929 142.657 53.5587C142.37 53.6661 142.094 53.8107 141.853 54.0006C140.223 55.2858 140.93 56.9712 141.728 59.3233C144.652 67.9399 147.825 76.8642 151.091 84.9709C151.287 85.4612 151.478 86.2886 151.485 86.8115C151.53 89.7858 149.346 89.9678 147.256 89.4809C137.613 87.2446 127.974 85.014 118.331 82.7777C117.489 82.5852 116.603 82.3669 116.125 81.5341C115.998 81.3084 115.939 81.04 115.987 80.7849C116.16 79.8495 117.098 79.7315 117.88 79.7476" />
                <path
                    d="M64.944 50.8239C62.3322 49.852 59.7675 48.9985 57.2832 47.9555C54.623 46.8342 52.1454 45.3673 50.1896 43.1928C49.0488 41.9239 48.215 40.5093 48.54 38.6972C48.8282 37.0955 49.93 36.1637 51.3068 35.507C53.4468 34.4801 55.7614 34.2837 58.0888 34.2731C62.3558 34.2598 66.4945 35.0647 70.5638 36.301C71.5078 36.5881 71.9246 37.2955 71.6853 38.0947C71.4707 38.8202 70.7956 39.1451 69.8637 38.926C67.9143 38.4721 65.9774 37.9173 64.0122 37.5484C61.0091 36.9829 57.9706 36.7407 54.9347 37.2613C54.0069 37.4215 53.0862 37.731 52.2309 38.1357C51.387 38.5316 51.0387 39.5424 51.4836 40.3556C52.2487 41.7412 53.4953 42.6599 54.7824 43.5018C57.5091 45.2865 60.4956 46.5204 63.6151 47.4331C64.9984 47.8366 66.4133 48.152 67.8131 48.5064C68.9728 48.8001 69.3157 49.8103 68.5846 50.7475L68.18 51.2599C61.6513 59.5732 55.1233 67.8815 48.5952 76.1897C48.3745 76.4692 48.1513 76.7688 47.8716 76.9846C47.3451 77.3998 46.7523 77.4381 46.2005 77.0261C45.6486 76.6141 45.52 76.035 45.788 75.4185C45.9395 75.0741 46.1798 74.7613 46.4138 74.4579C52.4162 66.8055 58.4287 59.1543 64.4362 51.5025C64.6264 51.2602 64.8014 51.0159 64.944 50.8239Z" />
                <path
                    d="M84.1968 73.6462C82.6894 72.7511 81.0414 72.2786 79.2759 72.4567C76.1414 72.7756 74.167 74.6627 72.8672 77.3405C71.5465 80.0618 71.1659 82.9776 71.3489 85.9639C71.6784 91.323 73.5042 96.1836 76.6478 100.528C79.5626 104.558 83.321 107.619 88.0481 109.326C92.3708 110.886 96.119 109.62 98.6569 105.828C99.4246 104.681 100.138 103.434 100.544 102.129C101.428 99.2707 102.163 96.3636 102.843 93.4494C103.928 88.8152 105.968 84.7611 109.647 81.6135C112.743 78.9661 116.224 76.9913 120.09 75.6943C122.006 75.0539 123.86 74.5798 126.031 74.8362C126.747 74.9258 127.283 74.5119 127.416 73.8632C127.549 73.2094 127.209 72.5116 126.467 72.3829C125.569 72.2243 125.126 72.1791 123.909 72.1752C123.538 72.1747 123.163 72.1995 122.794 72.2608C118.71 72.9573 114.977 74.5934 111.496 76.8189C106.556 79.9827 102.779 84.111 101.051 89.7959C100.182 92.6607 99.5913 95.6065 98.8419 98.5017C98.2325 100.856 97.3976 103.117 95.8294 105.054C93.4629 107.972 89.7821 107.67 86.677 105.654C87.6716 104.796 88.2337 103.684 88.4423 102.43C88.5996 101.462 88.7245 100.464 88.6553 99.4934C88.1878 92.9297 85.7711 87.1045 81.6362 81.9855C80.386 80.4368 78.9183 79.1014 76.9414 78.4956C76.4996 78.3584 76.0254 78.3143 75.557 78.225C76.676 75.632 79.2545 74.5218 81.7997 75.5314C84.0402 76.4211 85.6959 77.9847 86.8685 80.0713C87.1716 80.616 87.4399 81.1921 87.8109 81.689C88.213 82.2256 88.8148 82.3623 89.4341 82.0714C90.0584 81.7811 90.2808 81.2408 90.1629 80.576C90.1176 80.3196 90.0432 80.0492 89.8996 79.8367C88.827 78.2284 89.1711 76.6336 89.9062 75.0469C92.7052 68.9639 99.8308 65.4391 106.658 66.765C107.635 66.9539 108.353 66.578 108.541 65.7775C108.724 65.0173 108.264 64.3609 107.307 64.1437C105.351 63.6942 103.369 63.712 101.398 64.0027C95.8382 64.8266 91.2594 67.2064 88.3422 72.1743C87.7387 73.2042 87.2508 74.2998 86.7159 75.3589C85.8656 74.7764 85.0553 74.1631 84.1917 73.6455L84.1968 73.6462ZM85.5222 102.643C85.1644 103.647 84.5159 103.965 83.606 103.406C82.5958 102.783 81.6178 102.026 80.82 101.148C78.1141 98.1683 76.467 94.5994 75.2698 90.8156C74.6304 88.7957 74.1719 86.732 74.2326 84.6002C74.2592 83.7283 74.4166 82.8421 74.6515 81.9963C74.9136 81.0566 75.5411 80.823 76.4579 81.204C77.84 81.7814 78.8607 82.8151 79.7545 83.9558C83.2823 88.487 85.3976 93.5886 85.9241 99.3101C85.9676 99.7864 85.9229 100.267 85.9215 100.978C85.8291 101.386 85.7427 102.036 85.5279 102.638L85.5222 102.643Z" />
                <path
                    d="M3.31375 98.331C4.1578 91.5906 7.52577 85.4243 12.7304 81.0904C17.9349 76.7565 24.5838 74.5817 31.3202 75.0099C38.0565 75.4381 44.3726 78.4369 48.9794 83.3944C53.5862 88.3519 56.1365 94.8944 56.1098 101.687C56.0832 108.479 53.4817 115.009 48.8361 119.945C44.1905 124.88 37.8511 127.849 31.1115 128.245C24.372 128.641 17.7402 126.435 12.5697 122.076C7.3992 117.717 4.07963 111.535 3.28843 104.791L29.6079 101.624L3.31375 98.331Z"
                    stroke={color ?? "white"} style={{ transformOrigin: " 15.2% 65.8%" }} />
                <path
                    d="M133.203 129.252C131.212 122.759 131.774 115.752 134.774 109.659C137.775 103.566 142.987 98.8483 149.347 96.4674C155.707 94.0866 162.736 94.2226 168.999 96.8475C175.263 99.4725 180.289 104.389 183.051 110.593C185.813 116.797 186.104 123.821 183.864 130.232C181.624 136.643 177.022 141.958 170.997 145.092C164.972 148.225 157.978 148.942 151.443 147.095C144.907 145.248 139.323 140.977 135.83 135.153L158.694 121.438L133.203 129.252Z"
                    stroke={color ?? "white"} style={{ transformOrigin: " 82.2% 78%" }} />
            </svg>
            {
                replaceText ? <div>{text}</div> : <div>{`${text}${"‧".repeat(dotCount)}`}</div>
            }
        </div>
    </div>
}