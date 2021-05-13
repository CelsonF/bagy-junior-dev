"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        return _this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Object)
    ], Address.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "street", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "neighborhood", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "city", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "state", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "country", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "cep", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "number", void 0);
    Address = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Address);
    return Address;
}(typeorm_1.BaseEntity));
exports.Address = Address;
