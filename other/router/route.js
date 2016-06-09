/*
@参数形式
var myrouter = [{
	path:new RegExp(path),
	name:'post',
	params:[],
	hander:function(){alert('/');}
},{
	path:new RegExp(path),
	name:'get',
	params:[],
	hander:function(){alert('/maiske');}
}];
*/


/*help function*/

/*
@path:string
没有前面的‘#’
将接受到的path-string转化为每一项都为Regexp类型的repath数组
*/
function _toPath(path){
	console.log(path);
	var patharr = path.slice(1).split('/'),
		repath = [];
	for(var i=0;i<patharr.length;i++){
		repath.push(new RegExp(patharr[i]));
	}
	return 	repath;
}

/*
@path:string
当前hash除去“#”符号的string
在myrouter中进行查找与url匹配的项
*/

/*  "/home"  */
function _match(path){
	var router = this.myrouter;
	var urlarr = path.slice(1).split('/');
	var count = 0;
	for(var j=0;j<router.length;j++){
		for(var i=0;i<urlarr.length;i++){
			if(urlarr[i].search(router[j].path[i]) != -1){
				count++;
				if(count == urlarr.length){
					return router[j];
				}
			}
		}	
	}
	return 'default';
};

/*兼容性绑定事件*/
function _addEvent(obj,event,hander){
	if(obj.addEventListener){
		obj.addEventListener(event,hander,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+event,hander);
	}else{
		obj['on'+event] = hander;
	}
}

/*构造函数*/
var Router = function(routes){
	this.myrouter = [];
	for(var i=0;i<routes.length;i++){
		this.add(routes[i].path,routes[i].name,routes[i].hander);
	}
	return this;
}

/*
@path:string,每一对"//"之间可以为regexp或string
@name:string,[*options*]
@hander:function
*/
Router.prototype.add = function(path,name,hander) {
	var route = {};

	if(typeof(name) == 'function'){
		hander = name;
		name = path;/*name可选参数*/
	}

	route.name = name;
	route.hander = hander;
	route.path = _toPath(path);
	route.params = hander.arguments;

	this.myrouter.push(route);
	return this;
};

/*
@name:string;可以为path
*/
Router.prototype.remove = function(name) {
	var router = this.myrouter;
	for(var i=0;i<router.length;i++){
		if(router[i].name == name){
			router.splice(i,1);
		}
	}
	return this;
};

/*
@path：string；不可以为regexp
*/
Router.prototype.go = function(path){
	window.location.hash = path;
};

Router.prototype.listen = function(){
	var _self = this;
	_addEvent(window,'hashchange',function(){
		var path = location.hash.replace(/^#/,'');
		var url = _match.call(_self,path);
		if(url == 'default'){
			alert('default');
		}else{
			url.hander(url.params);
		}
	})
	return this;
};