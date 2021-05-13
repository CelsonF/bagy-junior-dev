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
exports.Order = void 0;
var Customer_1 = require("@modules/customer/entities/Customer");
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        return _this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.ID; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Object)
    ], Order.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Order.prototype, "dtOrder", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Number; }),
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Order.prototype, "installment", void 0);
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Order.prototype, "status", void 0);
    __decorate([
        type_graphql_1.Field(function () { return Customer_1.Customer; }),
        typeorm_1.ManyToOne(function (type) { return Customer_1.Customer; }, function (customer) { return customer.orders; }),
        __metadata("design:type", Customer_1.Customer)
    ], Order.prototype, "customer", void 0);
    Order = __decorate([
        typeorm_1.Entity(),
        type_graphql_1.ObjectType()
    ], Order);
    return Order;
}(typeorm_1.BaseEntity));
exports.Order = Order;
