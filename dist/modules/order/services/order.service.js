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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
var OrderService = /** @class */ (function () {
    function OrderService(orderRepository, orderProductRepository, productRepository, customerRepository, mailProvider) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.mailProvider = mailProvider;
    }
    OrderService.prototype.execute = function (reqOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var listProducts, idCustomer, installment, customer, prodIds, i, products, listProductStatus, orderSaved, testEmailUrl, orderProducts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listProducts = reqOrder.listProducts, idCustomer = reqOrder.idCustomer, installment = reqOrder.installment;
                        return [4 /*yield*/, this.customerRepository.findeById(idCustomer)];
                    case 1:
                        customer = _a.sent();
                        if (!customer) {
                            throw Error("Customer was not found.");
                        }
                        prodIds = [];
                        for (i = 0; i < listProducts.length; i += 1) {
                            prodIds.push(listProducts[i].id);
                        }
                        return [4 /*yield*/, this.productRepository.findByListIds(prodIds)];
                    case 2:
                        products = _a.sent();
                        listProductStatus = listProducts.map(function (prodInOrder) {
                            return _this.createListProductStatus(prodInOrder, products);
                        });
                        listProductStatus.forEach(function (prodStatus) {
                            if (!prodStatus.productDB) {
                                throw Error("Product " + prodStatus.prodId + " was not found.");
                            }
                            if (!prodStatus.hasInStock) {
                                throw Error("Product " + prodStatus.productDB.name + " out of stock.");
                            }
                        });
                        return [4 /*yield*/, this.orderRepository.createOrder(customer, installment)];
                    case 3:
                        orderSaved = _a.sent();
                        return [4 /*yield*/, this.sendEmailOrder(customer, orderSaved)];
                    case 4:
                        testEmailUrl = _a.sent();
                        return [4 /*yield*/, this.productRepository.updateStock(listProductStatus)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.orderProductRepository.createOrderProduct(orderSaved, listProductStatus)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.orderProductRepository.findByOrder(orderSaved)];
                    case 7:
                        orderProducts = _a.sent();
                        return [2 /*return*/, {
                                testEmailUrl: typeof testEmailUrl === 'string' ? testEmailUrl : '',
                                order: orderSaved,
                                products: orderProducts.map(function (orderProd) { return orderProd.product; }),
                            }];
                }
            });
        });
    };
    OrderService.prototype.createListProductStatus = function (prodInOrder, products) {
        var productDB = products.find(function (prod) { return prod.id === prodInOrder.id; });
        var hasInStock = this.checkSotckAvailable(prodInOrder, productDB);
        return {
            hasInStock: hasInStock,
            productDB: productDB,
            qttWanted: prodInOrder.qtt,
            prodId: prodInOrder.id,
        };
    };
    OrderService.prototype.sendEmailOrder = function (customer, order) {
        return __awaiter(this, void 0, void 0, function () {
            var email, resultMessateUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = customer.email;
                        return [4 /*yield*/, this.mailProvider.sendEmail(email, "Order approved " + order.id, "Order " + order.id)];
                    case 1:
                        resultMessateUrl = _a.sent();
                        return [2 /*return*/, resultMessateUrl];
                }
            });
        });
    };
    OrderService.prototype.checkSotckAvailable = function (prodInOrder, product) {
        if (!product) {
            return false;
        }
        var qttInStock = product.qttStock;
        var qttToBuy = prodInOrder.qtt;
        if (qttToBuy <= qttInStock) {
            return true;
        }
        return false;
    };
    return OrderService;
}());
exports.OrderService = OrderService;
