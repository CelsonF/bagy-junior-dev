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
var FakeProductRepository_1 = require("@modules/product/repository/fakes/FakeProductRepository");
var FakeCustomerRepository_1 = require("@modules/customer/repository/fakes/FakeCustomerRepository");
var FakeMailProvider_1 = __importDefault(require("@shared/container/providers/MailProvider/fakes/FakeMailProvider"));
var FakeOrderProductRepository_1 = require("../repository/fakes/FakeOrderProductRepository");
var FakeOrderRepository_1 = require("../repository/fakes/FakeOrderRepository");
var order_service_1 = require("./order.service");
describe('Order Service', function () {
    var orderService;
    var fakeProductRepository;
    var fakeCustomerRepository;
    var fakeMailProvider;
    var generateCustomers = function () {
        fakeCustomerRepository.create({
            id: 1,
            street: 'Rua Necessio dos Santos',
            neighborhood: 'SJB',
            city: 'Belo Horizonte',
            state: 'MG',
            country: 'BR',
            number: '110',
            cep: '31515040',
        }, {
            id: 1,
            name: 'User Test 1',
            email: 'user@gmail.com',
            cpf: '12312312',
            dtBirth: '1991-02-11',
        });
    };
    var generateProducts = function () {
        fakeProductRepository.create({
            id: 1,
            name: 'Macbook',
            qttStock: 10,
            description: 'One Macbook',
            price: 5000,
            image: '',
            weight: 4,
        });
        fakeProductRepository.create({
            id: 2,
            name: 'Notebook Dell',
            qttStock: 10,
            description: 'OneNotebook Dell',
            price: 5000,
            image: '',
            weight: 4,
        });
    };
    beforeEach(function () {
        fakeProductRepository = new FakeProductRepository_1.FakeProductRepository();
        fakeCustomerRepository = new FakeCustomerRepository_1.FakeCustomerRepository();
        fakeMailProvider = new FakeMailProvider_1.default();
        generateProducts();
        generateCustomers();
        orderService = new order_service_1.OrderService(new FakeOrderRepository_1.FakeOrderRepository(), new FakeOrderProductRepository_1.FakeOrderProductRepository(), fakeProductRepository, fakeCustomerRepository, fakeMailProvider);
    });
    it('Should be create one order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var sendEmail, resOrder, resExpect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sendEmail = spyOn(fakeMailProvider, 'sendEmail');
                    return [4 /*yield*/, orderService.execute({
                            idCustomer: 1,
                            installment: 3,
                            listProducts: [
                                { id: 1, qtt: 2 },
                                { id: 2, qtt: 2 },
                            ],
                        })];
                case 1:
                    resOrder = _a.sent();
                    resExpect = {
                        testEmailUrl: '',
                        order: {
                            id: 1,
                            customer: { name: 'User Test 1', id: 1 },
                            installment: 3,
                            status: 'approved',
                            dtOrder: resOrder.order.dtOrder,
                        },
                        products: [
                            { id: 1, name: 'Macbook', qttStock: 8 },
                            { id: 2, name: 'Notebook Dell', qttStock: 8 },
                        ],
                    };
                    expect(sendEmail).toHaveBeenCalledWith('user@gmail.com', "Order approved " + resExpect.order.id, "Order " + resExpect.order.id);
                    expect(resOrder).toMatchObject(resExpect);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should be check if stock is not available given on quantity for one product', function () {
        var productIdOne = fakeProductRepository.products.find(function (fakeProd) { return fakeProd.id === 1; });
        var isAvailable = orderService.checkSotckAvailable({ id: 1, qtt: 12 }, productIdOne);
        expect(isAvailable).toBeFalsy();
    });
    it('Should be check if stock is available given on quantity for one product', function () {
        var productIdOne = fakeProductRepository.products.find(function (fakeProd) { return fakeProd.id === 1; });
        var isAvailableLess = orderService.checkSotckAvailable({ id: 1, qtt: 8 }, productIdOne);
        var isAvailableEqual = orderService.checkSotckAvailable({ id: 1, qtt: 10 }, productIdOne);
        expect(isAvailableLess).toBeTruthy();
        expect(isAvailableEqual).toBeTruthy();
    });
});
