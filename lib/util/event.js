/**
 * ==========================================================================================
 * �¼�����ӿ�ʵ���ļ�<br/>
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
(function(){
// private
var p = P(N.ut), // util namespace
    __proEvent;  // class prototype
// interface
/**
 * �¼��������
 * @constructor
 * @class �¼��������
 */
p._$$Event = C();
__proEvent = p._$$Event.prototype;
/**
 * �¼���������ʼ������
 * @return {Void}
 */
__proEvent._$initialize = function(){
    this.__events = {};
};
/**
 * ����¼�
 * @param  {String}   _type  �¼����ͣ������ִ�Сд
 * @param  {Function} _event �¼��������
 * @return {Void}
 */
__proEvent._$addEvent = function(_type,_event){
    if (!_type || !_event || 
        !U._$isType(_event,'Function')) return;
    this.__events[_type.toLowerCase()] = _event;
};
/**
 * ��������¼�
 * @param  {Object} _event �¼�����
 * @return {Void}
 */
__proEvent._$batEvent = function(_event){
    if (!_event) return;
    for(var p in _event)
        this._$addEvent(p,_event[p]);
};
/**
 * ɾ���¼�
 * @param  {String} _type �¼����ͣ������ִ�Сд
 * @return {Void}
 */
__proEvent._$delEvent = function(_type){
    if (!_type) return;
    delete this.__events[_type.toLowerCase()];
};
/**
 * ��ȡָ�����͵��¼�����
 * @param  {String} _type �¼����ͣ������ִ�Сд
 * @return {Function}     �¼�����
 */
__proEvent._$getEvent = function(_type){
    return this.__events[_type.toLowerCase()] || null;
};
/**
 * �����¼�
 * @param  {String}   _type �¼����ͣ������ִ�Сд
 * @param  {Variable} [arg0[,arg1...]] �¼��ɽ��ܲ���
 * @return {Void}
 */
__proEvent._$dispatchEvent = function(){
    if (!arguments.length) return;
    var _type  = Array.prototype.shift.apply(arguments),
        _event = this.__events[_type.toLowerCase()];
    if (!!_event) return _event.apply(window,arguments);
};
})();