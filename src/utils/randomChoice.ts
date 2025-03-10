export default function randomChoice<T>(array: Array<T>, count: number): Array<T> {
    if (array.length < count) return array;
    const origin = Array.from(array);
    const results = [];
    for (let i = 0; i < count; i++) {
        let res = origin.sort(() => Math.random() - 0.5).pop();
        if (res === undefined) break;
        results.push(res);
    }
    return results;
};
