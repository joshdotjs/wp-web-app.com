const set2arr = (set) => Array.from(set); 
const concatenate = (x) => arr(x).join(',');


const toMB = (filesize) => (filesize / 1e6).toFixed(2);

const trim = (str) => str.trim();
const singleSpace = (str) => trim(str).replace(/\s+/g, ' ');
// // https://futurestud.io/tutorials/remove-extra-spaces-from-a-string-in-javascript-or-node-js#:~:text=Use%20JavaScript's%20string.,any%20whitespace%20character%20is%20%5Cs%20.
const slug = (str) => singleSpace(str).toLowerCase().replaceAll(' ', '-');


export { set2arr, slug, singleSpace, toMB };