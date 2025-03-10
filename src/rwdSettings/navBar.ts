import navigations from "../data/navigations.json";

const logoWidth = 2.4 * 172 / 47;
// height: 4rem
// padding: 0.8rem * 2

const navBarTextCount = navigations.map(data => {
    let max = data.title.length;
    if (data.options.length > 0) {
        max += 1.75;
        // icon 1.25rem
        // gap: 0.5rem
        max = Math.max(max, ...data.options.map(d => d.name.length));
    }
    return max + 0.5;
    // padding: 0.25rem * 2
}).reduce((pv, v) => pv + v);

const gaps = 0.5 * (navigations.length + 1);

const signUpButton = 6.5 + 1;
// width: 6.5rem
// margin-left: 1rem

const navBarMaxWidth = ((navBarTextCount + gaps + logoWidth + signUpButton) / 0.95) + 0.1;
// max-width: 95vw

export default navBarMaxWidth;
