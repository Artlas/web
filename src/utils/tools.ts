import { Category, Subcategory } from "../../types/category";
export function getRandomInt() {
    let min = 0,
        max = 10000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
