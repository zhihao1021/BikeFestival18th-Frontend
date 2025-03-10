import ArticleData from "@/schemas/articleData";

import articles from "@/data/articles.json";

const articleCategoryMap = articles.reduce((data, value) => {
    if (data[value.category] === undefined) data[value.category] = [value];
    else data[value.category].push(value);
    return data;
}, {} as { [key: string]: Array<ArticleData> });

export default articleCategoryMap;
