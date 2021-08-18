"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//            ===================================
//
//Description :
//            This work respond to the Project : Image Processing API
//       of the first lesson of Becoming a Full Stack JavaScript Developer entitled :
//       Backend Development with Node.js and mostly follow the attended steps.
//       see : Guide.ipynb
//
//Example of usable endpoint :
//            /api/images?name=fjord&width=500&height=500
//
//            ====================================
//
//Importing express package an the middleware "reader.ts"
var express_1 = __importDefault(require("express"));
var reader_1 = __importDefault(require("./utilities/reader"));
var path_1 = __importDefault(require("path"));
//Selecting a port and initializing app
var app = express_1.default();
var port = 3000;
//Display the picture (name) with the needed dimensions specified in the url (width, height)
app.get('/api/images', reader_1.default, function (req, res) {
    res.sendFile(path_1.default.resolve('images/full/sized') +
        '/' +
        req.query.width +
        ',' +
        req.query.height +
        ',' +
        req.query.name +
        '.jpg');
});
//Print the port when the server is ready to use
app.listen(port, function () {
    console.log('listening to port : ' + port);
});
//Exporting app for endpoint test
exports.default = app;
