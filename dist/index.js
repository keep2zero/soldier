"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oneline/core");
const net = require("superagent");
const start = new core_1.Start();
function request() {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new Promise((resolve) => {
            net.get("https://www.youtube.com").end((err, resp) => {
                console.log(resp);
                resolve({ header: resp.header, html: resp.text });
            });
        });
        return promise;
    });
}
class Index {
    // url, query, method, body, header
    wall(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request();
            resp.setContentType("text/html");
            resp.send(result.html);
            return;
        });
    }
}
__decorate([
    core_1.Post("/wall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.HttpRequest, core_1.HttpResponse]),
    __metadata("design:returntype", Promise)
], Index.prototype, "wall", null);
start.start(parseInt(process.env.PORT || "5000") || 5000, "0.0.0.0", () => {
    console.log("启动成功");
});
