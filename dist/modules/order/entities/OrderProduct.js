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
exports.OrderProduct = void 0;
var Order_1 = require("@modules/order/entities/Order");
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var Product_1 = require("@modules/product/entities/Product");
var OrderProduct = /** @class */ (function (_super) {
    __extends(OrderProduct, _super);
    function OrderProduct() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function () { return Order_1.Order; }),
        typeorm_1.ManyToOne(function (type) { return Order_1.Order; }, {
            primary: true,
            eager: true,
        }),
        __metadata("design:type", Order_1.Order)
    ], OrderProduct.prototype, "order", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Product_1.Product; }),
        typeorm_1.ManyToOne(function (type) { return Product_1.Product; }, {
            primary: true,
            eager: true,
        }),
        __metadata("design:type", Product_1.Product)
    ], OrderProduct.prototype, "product", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Number; }),
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], OrderProduct.prototype, "qtt", void 0);
    OrderProduct = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Index(['order', 'product'], { unique: true }),
        type_graphql_1.ObjectType()
    ], OrderProduct);
    return OrderProduct;
}(typeorm_1.BaseEntity));
exports.OrderProduct = OrderProduct;
