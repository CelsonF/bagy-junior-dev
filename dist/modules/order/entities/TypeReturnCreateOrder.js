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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeReturnCreateOrder = void 0;
var Order_1 = require("@modules/order/entities/Order");
var type_graphql_1 = require("type-graphql");
var Product_1 = require("@modules/product/entities/Product");
var TypeReturnCreateOrder = /** @class */ (function () {
    function TypeReturnCreateOrder() {
    }
    __decorate([
        type_graphql_1.Field(function () { return Order_1.Order; }),
        __metadata("design:type", Order_1.Order)
    ], TypeReturnCreateOrder.prototype, "order", void 0);
    __decorate([
        type_graphql_1.Field(function () { return [Product_1.Product]; }),
        __metadata("design:type", Array)
    ], TypeReturnCreateOrder.prototype, "products", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        __metadata("design:type", String)
    ], TypeReturnCreateOrder.prototype, "testEmailUrl", void 0);
    TypeReturnCreateOrder = __decorate([
        type_graphql_1.ObjectType()
    ], TypeReturnCreateOrder);
    return TypeReturnCreateOrder;
}());
exports.TypeReturnCreateOrder = TypeReturnCreateOrder;
