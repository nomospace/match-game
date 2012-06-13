/**
 * UI控件基类实现文件
 */
define(function(require, exports, module) {
    var Class = require('class');
    var Events = require('events');
    var $ = require('$');
    var proto;  // class prototype
    var _style; // ui style pool
    var _uispace = /\#\<.*?\>/gi; // RegExp of ui space holder
    var $body = $('body');

    /**
     * 添加控件样式
     * @param  {String} _style 样式
     * @param  {String} _space 样式空间
     * @return {Void}
     */
    function pushStyle(_style, _space) {
        if (!_style || !_style.replace) return null;
        if (!_style) _style = [];
        if (!!_space)
            _style = _style.replace(_uispace, '.' + _space);
        _style.push(_style);
    }

    /**
     * 激活控件样式
     * @return {Void}
     */
    function dumpStyle() {
        if (!_style) return null;
        _parseStyle(_style.join(''));
        _style = null;
    }

    function _parseStyle(_css, _style) {
        !$.msie ? _style.innerText = _css
            : _style.styleSheet.cssText = _css;
    }

    /**
     * UI控件基类对象
     * @constructor
     * @class   UI控件基类对象
     * @extends #<N.ut>._$$Event
     * @param   {String|Node} _parent  控件所在的父节点ID或者对象
     * @param   {Object}      _options 可选配置参数，已处理的参数如下：
     *                                 class           [String]   - 控件关联样式
     *                                 group           [String]   - 控件分组标识，同一分组仅允许存在一个实例
     *                                 before          [Boolean]  - 控件是否插入父节点的起始位置
     *                                 hackhover       [Boolean]  - 是否需要HACK HOVER效果，仅IE有效
     *                                 onbeforedestroy [Function] - 控件销毁前回调函数
     */
    var Widget = Class();
    proto = Widget.extend(Events);

    /**
     * 分配控件实例
     * @param  {String|Node} _parent   控件所在的父节点ID或者对象
     * @param  {Object}      _options  可选配置参数
     * @return {#<N.ui>.Widget} 控件实例
     */
    Widget.allocate = function(_parent, _options) {
        _options = _options || {};
        _options.group = !!_options.singleton &&
            '__singleton__' || _options.group;
        var _instance;
        // allocate from group
        if (!!_options.group) {
            this._group = this._group || {};
            _instance = this._group[_options.group];
        }
        // allocate from pool
        if (!_instance) {
            this._pool = this._pool || [];
            _instance = this._pool.shift();
        }
        if (!!_instance) {
            _instance.destroy(true);
            _instance.reset(_parent, _options);
        } else {
            _instance = new this(_parent, _options);
        }
        if (!!_options.group)
            this._group[_options.group] = _instance;
        return _instance;
    };
    /**
     * 回收控件实例
     * @param  {#<N.ui>.Widget} _instance 控件实例
     * @return {Void}
     */
    Widget.recycle = function(_instance) {
        if (!(_instance instanceof this) ||
            _instance.destroyed()) return null;
        var _group = _instance.group();
        if (!!_group && !this._group[_group]) return null;
        _instance.destroy();
        if (!!_group) delete this._group[_group];
        this._pool = this._pool || [];
        this._pool.push(_instance);
        return null;
    };
    /**
     * UI控件基类对象初始化函数
     * @param  {String|Node} _parent  控件所在的父节点ID或者对象
     * @param  {Object}      _options 可选配置参数
     * @return {Void}
     */
    proto.initialize = function(_parent, _options) {
        this.superClass();
        dumpStyle();
        this._body = document.cloneElement('div', this._getSpace());
        this._body.innerHTML = this._getXhtml() || '';
        this._intXnode();
        this.reset(_parent, _options);
    };
    /**
     * 销毁控件
     * @param  {Boolean} _redestroy 是否来自重回收
     * @return {Void}
     */
    proto.destroy = function(_redestroy) {
        if (!this.getEvent('onbeforedestroy')) return null;
        this.dispatchEvent('onbeforedestroy');
        this.delEvent('onbeforedestroy');
        this._recycleBody();
        this._body.removeClass(this._class);
        delete this._class;
    };
    /**
     * 重置控件
     * @param  {String|Node} _parent  控件所在的父节点ID或者对象
     * @param  {Object}      _options 可选配置参数
     * @return {Void}
     */
    proto.reset = function(_parent, _options) {
        _options = _options || O;
        this._group = _options.group;
        this.resetOption(_options);
        this.appendToParent(_parent, !!_options.before);
    };
    /**
     * 重置控件可选配置
     * @param  {Object} _options 控件可选配置
     * @return {Void}
     */
    proto.resetOption = function(_options) {
        _options = _options || O;
        this._class = _options['class'] || '';
        this._body.addClass(this._class);
        this._hhack = $.msie && !!_options.hackhover;
        this.addEvent('onbeforedestroy', _options.onbeforedestroy || F);
    };
    /**
     * 获取控件节点对象
     * @return {Node} 控件节点对象
     */
    proto.getBody = function() {
        return this._body;
    };
    /**
     * 将控件节点添加到父节点中
     * @param  {String|Node} _parent 父节点ID或者对象
     * @param  {Boolean}     _before 是否在父节点的第一个位置
     * @return {Void}
     */
    proto.appendToParent = function(_parent, _before) {
        if (!this._body) return null;
        _parent = $(_parent);
        if (!_parent) return null;
        this._parent = _parent == document.documentElement ? $body : _parent;
        this._revertBody(_before);
    };
    /**
     * 取控件分组
     * @return {Void}
     */
    proto.group = function() {
        return this._group || null;
    };
    /**
     * 判断控件是否已经销毁
     * @return {Boolean} 是否已经销毁
     */
    proto.destroyed = function() {
        return !this._used;
    };
    /**
     * 回收控件节点
     * @return {Void}
     */
    proto._recycleBody = function() {
        this._used = false;
        this._hhack ? this._body.style.display = 'none'
            : this._body.empty();
    };
    /**
     * 恢复控件节点
     * @param  {String|Node} _parent 父节点ID或者对象
     * @param  {Boolean}     _before 是否在父节点的第一个位置
     * @return {Void}
     */
    proto._revertBody = function(_before) {
        if (!this._parent || !this._body) return null;
        !_before ? this._parent.append(this._body)
            : this._parent.insertBefore(this._body);
        if (this._hhack) this._body.style.display = '';
        this._used = true;
    };
    /**
     * 获取控件样式的命名空间，子类实现具体内容
     * @return {String} 控件样式的命名空间
     */
    proto._getSpace = F;
    /**
     * 获取控件结构代码，子类实现具体内容
     * @return {String} 结构代码
     */
    proto._getXhtml = F;
    /**
     * 初始化控件节点，子类实现具体内容
     * @return {Void}
     */
    proto._intXnode = F;

    exports.Widget = Widget;
    exports.pushStyle = pushStyle;
    exports.dumpStyle = dumpStyle;
});
