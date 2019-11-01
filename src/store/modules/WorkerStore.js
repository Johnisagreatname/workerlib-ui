var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
import { Module, VuexModule } from 'vuex-module-decorators';
import store from "../index";
var WorkerStore = /** @class */ (function (_super) {
    __extends(WorkerStore, _super);
    function WorkerStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.peoples = [
            { name: '裴灏杰', sex: '男', age: '25', phone: '13059267735', cards: '430***********8744', profession: '资料员', state: '在职' },
            { name: '范佳超', sex: '男', age: '28', phone: '15278953355', cards: '330***********5432', profession: '资料员', state: '在职' },
            { name: '林陆锐', sex: '男', age: '29', phone: '15977565653', cards: '462***********2518', profession: '资料员', state: '在职' },
            { name: '陈吕', sex: '男', age: '25', phone: '15688539953', cards: '356***********5686', profession: '资料员', state: '在职' }
        ];
        return _this;
    }
    WorkerStore = __decorate([
        Module({
            namespaced: true,
            stateFactory: true,
            dynamic: true,
            name: "WorkerStore",
            store: store,
        })
    ], WorkerStore);
    return WorkerStore;
}(VuexModule));
export default WorkerStore;
//# sourceMappingURL=WorkerStore.js.map