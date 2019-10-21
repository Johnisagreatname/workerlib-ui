/*
 *  Nodepg Copyright (C) 2018 linlurui <rockylin@qq.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

define(function(require, exports, module) {

    require('jqvue')

    var $ = jQuery, _this = this, selector = '';

    exports.render = function (e, data, opts, callback) {

        if (!e)
            return;

        selector = e;

        //初始化组件
        $(selector).view('tree', function (vue) {

            exports.currentComponent = new vue({
                el: this.selector,
                data: { add: opts.add && $.isFunction(opts.add), buttonAddTitle: opts.buttonAddTitle },
                props: ['model'],
                methods: {
                    addOnClick: function (e) {
                        opts.add.call(this, e);
                    },
                },
                items: {},
                mounted: function () { //组件挂载完成

                    var selectCallback = function(model){
                        _this.currentComponent.items.currentModel = model;
                    };
                    if(opts.onselect && $.isFunction(opts.onselect)){
                        var callback = opts.onselect;
                        opts.onselect = function(model, data){
                            selectCallback.call(this, model, data);
                            callback.call(this, model, data);
                        }

                    } else {
                        opts.onselect = selectCallback;
                    }
                    this.items = require('m/tree-items').render($(selector).find('#site-items'), data, { canShowRoot: false, select:(opts && opts.select), onContextMenu: opts.onContextMenu, fileTypes: opts.fileTypes, onselect: opts.onselect });

                    if ($.isFunction(callback)) {
                        callback.call($(selector), this.model, _this.currentComponent);
                    }
                    else
                        require('m/layout').render();
                }
            });
        });

        return _this;
    };

    exports.getSelected = function () {

        if (!_this.currentComponent.items)
            return;

        return _this.currentComponent.items.currentModel;
    };

});
