"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
//Middleware for generating resized images 
var reader = function (req, res, next) {
    //Assigning request properties to variables
    var name = req.query.name;
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    //Building an output file with its own name
    var pathOutput = './images/full/sized/' + width + ',' + height + ',' + name + '.jpg';
    //Functon for generating a resized image with the previous properties to the defined output
    var fileResize = function (name, width, height) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //Using sharp and its structure
                return [4 /*yield*/, sharp_1.default('./images/full/' + name + '.jpg')
                        .resize(width, height)
                        .toFile(pathOutput)
                        .catch(function (err) {
                        throw err;
                    })];
                case 1:
                    //Using sharp and its structure
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    //Function wich allow processing only if the generated image already exists
    var toProcess = function (pathTo) { return __awaiter(void 0, void 0, void 0, function () {
        var files, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 6]);
                    return [4 /*yield*/, fs_1.promises.readFile(pathTo)];
                case 1:
                    files = _a.sent();
                    next();
                    return [3 /*break*/, 6];
                case 2:
                    err_1 = _a.sent();
                    if (!(err_1.code == 'ENOENT')) return [3 /*break*/, 4];
                    return [4 /*yield*/, fileResize(name, width, height)];
                case 3:
                    _a.sent();
                    next();
                    return [3 /*break*/, 5];
                case 4: throw err_1;
                case 5: return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    toProcess(pathOutput);
};
//Exporting to us as a Middleware
exports.default = reader;