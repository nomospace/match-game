/**
 * ==========================================================================================
 * ������ӿ�ʵ���ļ�<br/>
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
var __trim  = /(?:^\s+)|(?:\s+$)/g, // space at start or end of string
    __empty = /^\s*$/,              // content is empty
    __remap = {a:{r:/\<|\>|\&|\r|\n|\s|\'|\"/g,'<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;','"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''}
              ,b:{r:/\&(?:lt|gt|amp|nbsp|#39|quot)\;|\<br\/\>/gi,'&lt;':'<','&gt;':'>','&amp;':'&','&nbsp;':' ','&#39;':"'",'&quot;':'"','<br/>':'\n'}
              ,c:{i:true,r:/\byyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s\b/g}
              ,d:{r:/\'|\"/g,"'":"\\'",'"':'\\"'}}; // encode map
// interface
P('U');
/*
 * ��Դ���ٽӿ�
 * @return {Void}
 */
U.__destroy = F;
/**
 * ��ʽ�����֣�<10�����ּ�0ǰ׺
 * @param  {Number} _number ����ʽ������
 * @return {String}         ��ʽ��������ִ�
 */
U._$number = function(_number){
    _number = parseInt(_number)||0;
    return (_number<10?'0':'')+_number;
};
/**
 * ����ַ������˵Ŀո�ԭ�ַ������ݲ���
 * @param  {String} _content ��������ַ���
 * @return {String}         ������˿ո���ַ���
 */
U._$trim = function(_content){
    return !!_content&&!!_content.replace
           &&_content.replace(__trim,'')||'';
};
/**
 * ��ȡָ�����ȵ��ַ���,���ĳ���Ϊ�����ַ�
 * @return {String} _content ��������������
 * @param  {Number} _length  ��ȡ����
 */
U._$subString = function(_content,_length){
    _content = _content||'';
    if (!_length) return _content;
    for(var i=0,k=0,l=_content.length;i<l;i++){
        k += _content.charCodeAt(i)>255?2:1;
        if (k>=_length) 
            return _content.substr(0,i+(k==_length?1:0));
    }
    return _content;
};
/**
 * �ж������Ƿ�ֻ�����ջ��߻س�
 * @param  {String} _content �������
 * @return {Boolean}         �Ƿ�Ϊ��
 */
U._$isEmpty = function(_content){
    return __empty.test(_content||'');
};
/**
 * �������һ��ָ����Χ������
 * @param  {Number} _min  ��������ޡ�������
 * @param  {Number} _max  ��������ޡ���������
 * @return {Number}       ������ɵ�����
 */
U._$rand = function(_min,_max){
    return Math.floor(Math.random()*(_max-_min)+_min);
};
/**
 * �������һ��ȫ��Ϊ���ֵ��ַ���
 * @param  {Number} _length ����ַ����ĳ���
 * @return {String}         ������ɵ��ַ���
 */
U._$randNumberString = function(_length){
    _length = Math.max(0,Math.min(_length||10,100));
    var _min = Math.pow(10,_length-1), _max = _min * 10;
    return U._$rand(_min,_max).toString();
};
/**
 * �ж������Ƿ�Ϊָ������
 * @param  {Variable} _data ���ж�����
 * @param  {String}   _type ��������
 * @return {Boolean}        �Ƿ�ָ������
 */
U._$isType = function(_data,_type){
    return Object.prototype.toString.
           call(_data).toLowerCase()==
           ('[object '+_type.toLowerCase()+']');
};
/**
 * ���Ҹ��������б��е�����ֵ
 * @param  {Array}    _list �������б�
 * @param  {Variable} _item ָ������Ϊfunction���ʾ���˽ӿ�
 * @return {Number}         ���������ڵ�λ����������0��ʼ��û�����-1
 */
U._$indexOf = function(_list,_item){
    var _isfunc = U._$isType(_item,'function');
    if (!!_list&&_list.length>0)
        for(var i=0,l=_list.length;i<l;i++)
            if (_isfunc?!!_item(_list[i]):_list[i]==_item)
                return i;
    return -1;
};
/**
 * �����ַ���
 * @param  {Object} _map     �������
 * @param  {String} _content ��������ִ�
 * @return {String}          �������ִ�
 */
U._$encode = function(_map,_content){
    if (!_map||!_content||!_content.replace) return _content||'';
    return _content.replace(_map.r,function($1){
               var _result = _map[!_map.i?$1.toLowerCase():$1];
               return _result!=null?_result:$1;
           });
};
/**
 * ����html���룬'<' -> '&lt;'
 * @param  {String} _content �����봮
 * @return {String}          �����Ĵ�
 */
U._$escape = function(_content){
    return U._$encode(__remap.a,_content);
};
/**
 * ������html���룬'&lt;' -> '<'
 * @param  {String} _content �����봮
 * @return {String}          �����Ĵ�
 */
U._$unescape = function(_content){
    return U._$encode(__remap.b,_content);
};
/**
 * �����ַ�������',"��ת�����
 * @param  {String} _content �����봮
 * @return {String}          �����Ĵ�
 */
U._$string = function(_content){
    return U._$encode(__remap.d,_content);
};
/**
 * ��ʽ��ʱ�䣬yyyy|yy|MM|M|dd|d|HH|H|mm|ms|ss|m|s
 * @param  {Number|String|Date} _time   ʱ��
 * @param  {String}             _format ��ʽ
 * @return {String}                     ָ����ʽ��ʱ�䴮
 */
U._$format = function(_time,_format){
    if (!_time||!_format) return '';
    if (U._$isType(_time,'string'))
        _time = new Date(Date.parse(_time));
    if (!U._$isType(_time,'date'))
        _time = new Date(_time);
    var _map = __remap.c;
    _map['yyyy'] = _time.getFullYear();
    _map['yy']   = (''+_map['yyyy']).substr(2);
    _map['M']    = _time.getMonth()+1;
    _map['MM']   = U._$number(_map['M']);
    _map['d']    = _time.getDate();
    _map['dd']   = U._$number(_map['d']);
    _map['H']    = _time.getHours();
    _map['HH']   = U._$number(_map['H']);
    _map['m']    = _time.getMinutes();
    _map['mm']   = U._$number(_map['m']);
    _map['s']    = _time.getSeconds();
    _map['ss']   = U._$number(_map['s']);
    _map['ms']   = _time.getMilliseconds();
    return U._$encode(_map,_format);
};
/**
 * ���л�
 * @param  {Variable} _data �����л�����
 * @return {Variable}       ���л�������
 */
U._$serialize = function(_data){
    if (U._$isType(_data,'number'))  return _data;
    if (U._$isType(_data,'date'))    return _data.getTime();
    if (U._$isType(_data,'boolean')) return !!_data?'true':'false';
    if (U._$isType(_data,'string'))  return "'"+U._$string(_data)+"'";
    if (!_data) return 'null';
    if (U._$isType(_data,'array')){
        var _arr = [];
        for(var i=0,l=_data.length;i<l;
            _arr.push(U._$serialize(_data[i])),i++);
        return '['+_arr.join(',')+']';
    }
    if (U._$isType(_data,'object')){
        var _arr = [];
        for(var p in _data)
            _arr.push(U._$serialize(p)+':'+
                      U._$serialize(_data[p]));
        return '{'+_arr.join(',')+'}';
    }
    return 'null';
};
/**
 * �����л���
 * @param  {String}  _content �������л���
 * @return {Variable}         �����л��������
 */
U._$deserialize = function(_content){
    try{return !_content?null:(new Function('return '+_content))();}catch(e){return null;}
};
/**
 * ��json������Ϊ����
 * @param  {String}  _content �������л���
 * @return {Variable}         �����л��������
 */
U._$parseJSON = !!window.JSON?JSON.parse:U._$deserialize;
/**
 * ����Ϊjson��
 * @param  {Variable} _data �����л�����
 * @return {Variable}       ���л�������
 */
U._$toJSONString = !!window.JSON?JSON.stringify:U._$serialize;
/**
 * ��ȡȫ�����ԣ�ȡ�����Ժ�ɾ��ȫ�����ã��������������ظ������豣������
 * @param  {String} _key ��������
 * @return {Variable}    ����ֵ
 */
U._$getGValue = function(_key){
    var _value = window[_key];
    try{if (!delete window[_key])throw '';}catch(e){window[_key]=undefined;}
    return _value;
};
/**
 * �����userNameת���������û����� ������email��ַ
 * ���username    <-->     fullName
 * mmlhorse2@163.com				   qatest@163.com            
 * qatest@126			   qatest@126.com		
 * qatest@188 			   qatest@188.com 	 
 * qatest.popo             qatest@popo.163.com
 * qatest.vip              qatest@vip.163.com
 * qatest@yeah			   qatest@yeah.net
 * qatest@game             qatest@game.163.com
 * test60@vip.126.com      test60@vip.126.com �������������䴦��
 * qatest@gmail.com 	   qatest@gmail.com	(��������)   	
 * @param  {String} _userName ���userName
 * @return {Variable}    ����ֵ
 */
U._$getFullName = function(_userName){
	if (_userName.substr(-4) === "@126")
		return _userName.replace("@126", "@126.com");
	else if (_userName.substr(-4) === "@188")
		return _userName.replace("@188", "@188.com");
	else if (_userName.substr(-5) === "@popo")
		return _userName.replace(".popo", "@popo.163.com");
	else if (_userName.substr(-4) === ".vip")
		return _userName.replace(".vip", "@vip.163.com");
	else if (_userName.substr(-5) === "@yeah")
		return _userName.replace("@yeah", "@yeah.net");
	else if (_userName.substr(-5) === "@game")
		return _userName;
	else if (_userName.indexOf('@') >= 0) {
		return _userName;// �������� �� vip.126.com
	} else {
		return _userName + "@163.com";
	}
};
})(this,document);