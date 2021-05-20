"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var chai_1 = __importStar(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = require("../src/server");
chai_1.default.should();
chai_1.default.use(chai_http_1.default);
server_1.app.set("port", process.env.PORT || 3000);
describe("Server API", function () {
    // Case where we have no fields or parameters specified
    it("should render all fields when no parameters or fields are passed in", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(server_1.app).get("/")];
                    case 1:
                        res = _a.sent();
                        chai_1.expect(res.status).to.equal(200);
                        chai_1.expect(res.body).not.to.be.empty;
                        chai_1.expect(res.body).to.be.a("object"); // Person doesn't work but res.send sends a Person object ??
                        chai_1.expect(res.body).to.have.all.keys("jobs", "cell", "dob", "email", "gender", "id", "location", "login", "name", "nat", "phone", "picture", "registered");
                        return [2 /*return*/];
                }
            });
        });
    });
    // Case where we have fields specified but no parameters
    it("should render fields: jobs, email, gender and location when these fields are passed in with no parameters", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(server_1.app).get("?field=jobs,email,gender,location")];
                    case 1:
                        res = _a.sent();
                        chai_1.expect(res.status).to.equal(200);
                        chai_1.expect(res.body).not.to.be.empty;
                        chai_1.expect(res.body).to.be.a("object");
                        chai_1.expect(res.body).to.have.keys("jobs", "email", "gender", "location");
                        chai_1.expect(res.body).to.not.have.keys("cell", "dob", "id", "login", "name", "nat", "phone", "picture", "registered");
                        return [2 /*return*/];
                }
            });
        });
    });
    // Case where we have parameters but no fields
    it("should render all fields with gender set to female when parameter gender is set to female but no fields are specified", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(server_1.app).get("?gender=female")];
                    case 1:
                        res = _a.sent();
                        chai_1.expect(res.status).to.equal(200);
                        chai_1.expect(res.body).not.to.be.empty;
                        chai_1.expect(res.body).to.be.a("object");
                        chai_1.expect(res.body).to.have.all.keys("jobs", "cell", "dob", "email", "gender", "id", "location", "login", "name", "nat", "phone", "picture", "registered");
                        chai_1.expect(res.body).to.include({ gender: "female" });
                        return [2 /*return*/];
                }
            });
        });
    });
    // Case where we have parameters and fields
    it("should render fields: jobs, email, gender, location with gender set to female when these fields are passed in and parameter gender is set to female.", function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1.default(server_1.app).get("?field=jobs,email,gender,location&gender=female")];
                    case 1:
                        res = _a.sent();
                        chai_1.expect(res.status).to.equal(200);
                        chai_1.expect(res.body).not.to.be.empty;
                        chai_1.expect(res.body).to.be.a("object");
                        chai_1.expect(res.body).to.have.all.keys("jobs", "email", "gender", "location");
                        chai_1.expect(res.body).to.include({ gender: "female" });
                        chai_1.expect(res.body).to.not.have.keys("cell", "dob", "id", "login", "name", "nat", "phone", "picture", "registered");
                        return [2 /*return*/];
                }
            });
        });
    });
});
