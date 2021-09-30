/*!
 * medium-editor-textcolor 0.1.3 (https://github.com/sonce/BTGrid)
 * API https://github.com/sonce/BTGrid/blob/master/doc/api.md
 * Copyright 2017-2020 sonce. All Rights Reserved
 * Licensed under MIT (https://github.com/sonce/BTGrid/blob/master/LICENSE)
 */

'use strict';

var AColorPicker = require('a-color-picker');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var AColorPicker__default = /*#__PURE__*/_interopDefaultLegacy(AColorPicker);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Builder = /** @class */ (function () {
    function Builder(ownerDocument, option, changeColorAction) {
        this.hide = function () {
            this._root.style.display = 'none';
        };
        this.show = function (currentColor, left) {
            this.colorPickerCtl.color = currentColor;
            this._root.style.display = 'block';
            this._root.style.left = left + 'px';
        };
        this.ownerDocument = ownerDocument;
        this.changeColor = changeColorAction;
        this.init(option);
    }
    Builder.prototype.init = function (option) {
        var _this = this;
        this.ownerDocument = this.ownerDocument || document;
        this._root = this.ownerDocument.createElement('div');
        this._root.style.display = 'none';
        this._root.style.position = 'absolute';
        this._root.style.top = '101%';
        this.colorPickerCtl = AColorPicker__default['default'].createPicker(this._root, option);
        this.colorPickerCtl.on('change', function (control, color) {
            _this.changeColor(color);
        });
        var newRow = document.createElement('div');
        newRow.classList.add('a-color-picker-row');
        newRow.classList.add('a-color-picker-empty');
        // newRow.classList.add('d-flex');
        // newRow.classList.add('justify-content-end');
        var emptyBtn = document.createElement('button');
        emptyBtn.classList.add('btn');
        emptyBtn.innerHTML = option.removeButtonContent;
        emptyBtn.title = option.removeButtonTitle;
        emptyBtn.addEventListener('click', function () {
            _this.changeColor('');
        });
        newRow.appendChild(emptyBtn);
        this.colorPickerCtl.element.appendChild(newRow);
    };
    Builder.prototype.getElement = function () {
        return this._root;
    };
    return Builder;
}());

var colorPicker = /** @class */ (function (_super) {
    __extends(colorPicker, _super);
    function colorPicker(option) {
        var _this = _super.call(this) || this;
        _this.defaultOption = {
            showHSL: false,
            showRGB: false,
            showHEX: true,
            showAlpha: false,
            color: '#ff0000',
            paletteEditable: false,
            useAlphaInPalette: 'auto',
            hueBarSize: [150, 11],
            slBarSize: [232, 150],
            contentDefault: '<b>TC</b>',
            aria: 'Set Text Color',
            contentFA: '<i class="fas fa-fill"></i>',
            removeButtonContent: '<i class="fas fa-eraser"></i>',
            removeButtonTitle: 'Remove Color Style'
        };
        _this.name = 'textcolor';
        _this.aria = 'Set Text Color';
        _this.action = 'textcolor';
        _this.contentDefault = '<b>TC</b>';
        _this.contentFA = '<i class="fas fa-fill"></i>';
        _this.handleClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.isActive()) {
                this.hide();
                return;
            }
            this.selectionState = this.base.exportSelection();
            // If no text selected, stop here.
            if (this.selectionState && this.selectionState.end - this.selectionState.start === 0) {
                return;
            }
            this.show();
        };
        _this.hide = function () {
            this.setInactive();
            this.builder.hide();
        };
        _this.show = function () {
            this.setActive();
            var range = MediumEditor.selection.getSelectionRange(this.document);
            var parentElement = MediumEditor.selection.getSelectedParentElement(range);
            this.builder.show(parentElement.style.color, this.button.offsetLeft);
        };
        _this.getForm = function () {
            var _this = this;
            if (!this.builder) {
                this.builder = new Builder(this.document, this.option, function (color) {
                    _this.base.importSelection(_this.selectionState, false);
                    _this.document.execCommand('styleWithCSS', false, 'true');
                    if (typeof color === 'undefined' || color == '')
                        _this.document.execCommand('removeFormat', false, 'foreColor');
                    else
                        _this.document.execCommand('foreColor', false, color);
                });
                this.base.subscribe('hideToolbar', function () {
                    _this.hide();
                });
            }
            return this.builder.getElement();
        };
        _this.option = __assign(__assign({}, _this.defaultOption), option);
        _this.aria = _this.option.aria;
        _this.contentDefault = _this.option.contentDefault;
        _this.contentFA = _this.option.contentFA;
        return _this;
    }
    colorPicker.createInstance = function (option) {
        if (option === void 0) { option = {}; }
        var colorPickerExtension = MediumEditor.extensions.form.extend(new colorPicker(option));
        var colorPickerEx = new colorPickerExtension();
        return colorPickerEx;
    };
    return colorPicker;
}(MediumEditor.Extension));

module.exports = colorPicker;
