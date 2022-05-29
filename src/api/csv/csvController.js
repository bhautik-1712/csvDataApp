const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const createResponse = require('../../utils/response');
const cavService = require('./csvService');
const csvwriter = require('csv-writer');

const fetchCSVData = catchAsync(async (req, res) => {
    const authorData = await cavService.fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv');
    const magazineData = await cavService.fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv');
    const bookData = await cavService.fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv');
    createResponse(res, httpStatus.OK, 'Fetch CSV Data Successfully.', { bookData, magazineData, authorData });
});

const searchBooksMagazines = catchAsync(async (req, res) => {
    const response = await cavService.searchBooksMagazines(req.query);
    createResponse(res, httpStatus.OK, 'Search Book and Magazine Successfully.', response);
});

const sortBooksMagazines = catchAsync(async (req, res) => {
    const response = await cavService.sortBooksMagazines();
    createResponse(res, httpStatus.OK, 'Get Book and Magazine Successfully.', response);
});

const updateCSV = catchAsync(async (req, res) => {
    const createCsvWriter = csvwriter.createObjectCsvWriter
    const bookData = await cavService.fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv');
    const magazineData = await cavService.fetchCSVData('https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv');
    const body = {
        title: req.body.title,
        isbn: req.body.isbn,
        authors: req.body.authors,
    };
    if (req.body.publishedAt) {
        body['publishedAt'] = req.body.publishedAt
        magazineData.push(body);
        const csvWriter = createCsvWriter({
            path: 'magazine_data.csv',
            header: [
                { id: 'title', title: 'title' },
                { id: 'isbn', title: 'isbn' },
                { id: 'authors', title: 'authors' },
                { id: 'publishedAt', title: 'publishedAt' }
            ]
        });
        await csvWriter.writeRecords(magazineData);
    }
    if (req.body.description) {
        body['description'] = req.body.description
        bookData.push(body);
        const csvWriter = createCsvWriter({
            path: 'book_data.csv',
            header: [
                { id: 'title', title: 'title' },
                { id: 'isbn', title: 'isbn' },
                { id: 'authors', title: 'authors' },
                { id: 'description', title: 'description' }
            ]
        });
        await csvWriter.writeRecords(bookData);
    }
    createResponse(res, httpStatus.OK, 'add Data to CSV File SuccessFully.', {})
})

const findKnightMoves = catchAsync(async (req, res) => {
    const x = req.body.xPosition
    const y = req.body.yPosition

    let knightMoves = [
        { x: 2, y: -1 }, { x: 2, y: 1 }, { x: 1, y: -2 }, { x: 1, y: 2 },
        { x: -2, y: -1 }, { x: -2, y: 1 }, { x: -1, y: -2 }, { x: -1, y: 2 }
    ]

    let possibleMoves = []
    for (let m of knightMoves) {
        let row = String.fromCharCode(x + m.x + 64)
        let column = y + m.y
        possibleMoves.push(row + "" + column)
    }
    createResponse(res, httpStatus.OK, 'Here Are all Moves Of Knight.', possibleMoves)
})

module.exports = {
    fetchCSVData,
    searchBooksMagazines,
    sortBooksMagazines,
    updateCSV,
    findKnightMoves
}