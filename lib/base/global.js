/**
 * ==========================================================================================
 * ȫ��ͨ�ýӿ�ʵ���ļ�<br/>
 * ������д�淶������<br/>
 * <pre>
 *    ����/�ӿ�ǰ׺        ����                                           ����ʱ�Ƿ����
 * ------------------------------------------------------------------------------------------
 *    _                  �ӿ��ھֲ��������ߴ��ݵĲ���                            Y
 *    _$                 ������ɷ��ʵĽӿڻ�������                             Y/N
 *                       ����ӿڲ��������ַ�����ʽ����
 *                       �����Ŀ����js�ļ�һ��������Կ��ǻ���
 *    _$$                �����ͬ_$ǰ׺�Ĵ���                                Y/N
 *    __                 �����ⲻ�ɷ��ʵĽӿڻ�������                            Y
 *    ��                 û��ǰ׺�Ľӿڻ������Կ����ڶ��������                     N
 *                       �����п������ַ�������ʽ����
 *    X                  ������д��ĸ������ʾ������һЩͨ�õ����ԺͽӿڵĶ���
 *                       �����н�ֹ���ֵ�����д��ĸ�����ı���                      N
 * ------------------------------------------------------------------------------------------
 * </pre>
 * @version  1.0
 * @author   genify(caijf@163.org)
 * ==========================================================================================
 */
(function(window,document){
// private
var __extflag = {};  // extend flag for avoid init when extending
/*
 * Ĭ�ϳ�ʼ������
 * @return {Void}
 */
var __initialize = function(){
    this._$super.apply(this,arguments);
};
/*
 * ģ��ʵ�ּ̳в��ԣ��ṩ���๹�캯�����ø��๹�캯���Ľӿ�
 * @param  {Function} _super  �������
 * @param  {Boolean}  _static �Ƿ�̳о�̬�ӿ�
 * @return {Object}           ���ԭ�Ͷ���
 */
var __extend = function(_super,_static){
    if (!_super||!U._$isType(_super,'function')
               ||!U._$isType(this,'function')) return;
    // extend static methods
    if (!!_static)
        for(var _method in _super)
            if (U._$isType(_super[_method],'function'))
                this[_method] = _super[_method];
    // extend instance properties and methods
    this._$super = _super;
    this._$supro = _super.prototype;
    this.prototype = new _super(__extflag);
    this.prototype.constructor = this;
    this.prototype._$initialize = __initialize;
    // for super initialize
    var _superp = _super;
    this.prototype._$super = function(){
        var _init = _superp.prototype._$initialize;
        _superp = _superp._$super||_super;
        return !!_init&&_init.apply(this,arguments);
    };
    return this.prototype;
};
/*
 * ģ��ʵ�ֶ�̳У���������Խӿڵ�ʵ�ֿ�������ǰ��
 * @param  {Function} _args �����࣬����ǰ�����ʵ�����ȼ���
 * @return {Object}
 */
var __implement = function(){
	var _this = this.prototype;
	for(var i=0,l=arguments.length,_class,_prototype;i<l;i++){
		_class = arguments[i];
		if (!U._$isType(_class,'function')) continue;
		_prototype = _class.prototype;
		for(var x in _prototype)
			if (U._$isType(_prototype[x],'function'))
			    _this[x] = _prototype[x];
	}
	return _this;
};
/*
 * �ӿڰ�
 * @param  {Object}   _object ��Ҫ����һ�µĶ���null��ʾwindow����
 * @param  {Variable} [argument0[,argument1 ...]] ��������ʱ��Ҫ�Ĳ���
 * @return {Function} ���ذ󶨺���¼�����
 */
var __bind = function() {
    var _function = this, _args = arguments,
        _object = Array.prototype.shift.call(arguments);
    return function(){
        Array.prototype.push.apply(arguments,_args);
        return _function.apply(_object||window,arguments);
    }
};
// interface
/**
 * ֻ���ն���ʵ��
 * @type Object
 */
window.O = {};
/**
 * �պ���ʵ��
 * @return {Void}
 */
window.F = function(){return false;};
/**
 * ����ָ���������ռ䣬������������½�һ�������ռ�<br/>
 * <pre>
 *   P("ui.package");
 *   P("window.ui.package");
 *   // �������߶������� window.ui, Ȼ�󷵻� window.ui.package
 * </pre>
 * ע�⣺�����ռ䲻Ҫʹ������������Ĺؼ���
 * @param  {String} _namespace �����ռ������
 * @return {Object}            ���ɵ������ռ����    
 */
window.P = function(_namespace){
    if (!_namespace||!_namespace.length) return null;
    var _package = window;
    for(var a=_namespace.split('.'),
            l=a.length,i=(a[0]=='window')?1:0;i<l;
            _package=_package[a[i]]=_package[a[i]]||{},i++);
    return  _package;
};
/**
 * ���������_$initialize��Ϊ������ĳ�ʼ�������������̳��������࣬
 * ���ʼ�������п���ʹ��this._$super([arg0[,arg1...]])���ø���ĳ�ʼ������
 * @return {Function} ���ش����������ʵ��
 */
window.C = function(){
    var _class = function(){
        // avoid call initialize when extending
        if (arguments[0]!=__extflag&&!!this._$initialize)
            return this._$initialize.apply(this,arguments);
    };
    _class._$extend = __extend;
	_class._$implement = __implement;
    return _class;
};
/**
 * �󶨽ӿڼ�������ʹ��ĵ��ö��󱣳�һ��
 * @param  {Object}   _object ��Ҫ����һ�µĶ���null��ʾwindow����
 * @param  {Variable} [argument0[,argument1 ...]] ��������ʱ��Ҫ�Ĳ���
 * @return {Function} ���ذ󶨺�ĺ���
 */
Function.prototype._$bind = function() {
    var _function = this, _args = arguments,
        _object = Array.prototype.shift.call(arguments);
    return function(){
        var _argc = Array.prototype.slice.call(_args,0);
        Array.prototype.push.apply(_argc,arguments);
        return _function.apply(_object||window,_argc);
    };
};
/**
 * �󶨽ӿڼ�������ʹ��ĵ��ö��󱣳�һ�£�
 * �ýӿ���_$bind�ӿڵĲ�����ڰ�ʱ�����͵���ʱ������˳��һ����
 * _$bind���ȴ����ʱ����
 * _$bind2���ȴ������ʱ����
 * @param  {Object}   _object ��Ҫ����һ�µĶ���null��ʾwindow����
 * @param  {Variable} [argument0[,argument1 ...]] ��������ʱ��Ҫ�Ĳ���
 * @return {Function} ���ذ󶨺���¼�����
 */
Function.prototype._$bind2 = __bind;
/**
 * ��Ϊ�¼��ӿڰ󶨣�ʹ���¼�������ʱ���ܱ��ֽӿڵ��ö����һ�£��¼�����Ϊ��һ��������
 * ��������ô˽ӿڣ�����ʹ��_$bind2�ӿ�
 * @deprecated
 * @param  {Object}   _object ��Ҫ����һ�µĶ���null��ʾwindow����
 * @param  {Variable} [argument0[,argument1 ...]] ��������ʱ��Ҫ�Ĳ���
 * @return {Function} ���ذ󶨺���¼�����
 */
Function.prototype._$bindAsEventListener = __bind;
// init config
var p = P('N');
p.rc = p.rc||{};               // root config
p.xd = p.xd||[];               // crossdomain list
p.tm = p.tm||O;                // ui theme config
p.ui = p.ui||'ntes.ui';        // ui namespace
p.ut = p.ut||'ntes.util';      // util namespace
p.gb = p.gb||'ntes.global';    // global namespace
p.gw = p.gw||'ntes.widget';    // global widget namespace
p.fw = p.fw||'ntes.framework'; // framework namespace
// init root config
p.rc.r = p.rc.r||'http://b.bst.126.net/common/'; // resource base url
p.rc.s = p.rc.s||'/common/storage.swf';          // flash storage url (relative path)
p.rc.u = p.rc.u||'/common/upload.swf';           // flash uploader url (relative path)
if (p.rc.s.indexOf('?')<0) p.rc.s += '?t='+new Date().getTime();
})(this,document);