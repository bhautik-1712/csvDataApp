const csv = require("csvtojson");
const request = require('request');

const fetchCSVData = async (url) => {
    const data = [];
    await csv().fromStream(request.get(url))
        .subscribe(
            (json) => {
                const params = {};
                const objectKeys = Object.keys(json)[0].split(';');
                if (Object.keys(json).length > 1) {
                    const objectValues = Object.values(json).toString().split(';')
                    params[`${objectKeys[0]}`] = objectValues[0];
                    params[`${objectKeys[1]}`] = objectValues[1];
                    params[`${objectKeys[2]}`] = objectValues[2].split(',');
                    params[`${objectKeys[3]}`] = objectValues[3];
                } else {
                    const objectValues = Object.values(json)[0].split(';');
                    params[`${objectKeys[0]}`] = objectValues[0];
                    params[`${objectKeys[1]}`] = objectValues[1];
                    params[`${objectKeys[2]}`] = [objectValues[2]];
                    if (objectKeys.length > 3) {
                        params[`${objectKeys[3]}`] = objectValues[3];
                    }
                }
                data.push(params);
            }
        );
    return data;
};

const searchBooksMagazines = async (query) => {
    const book = await fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv');
    const magazines = await fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv');
    const response = book.concat(magazines);
    if (query.isbn) {
        return response.filter(item => item.isbn === query.isbn);
    }
    if (query.author) {
        return response.filter(item => item.authors.includes(query.author));
    }
    return [];
};

const sortBooksMagazines = async () => {
    const book = await fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv');
    const magazines = await fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv');
    const response = book.concat(magazines);
    const sortedObjs = response.sort((a, b) => {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    return sortedObjs;
}

module.exports = {
    fetchCSVData,
    searchBooksMagazines,
    sortBooksMagazines
}