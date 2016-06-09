## 简易的前端路由

[demo展示](http://m-withershins.github.io/IFE-Study/other/router/test.html)  
[源码地址](https://github.com/M-Withershins/IFE-Study/blob/gh-pages/other/router/route.js)  

1. 路由初始化规则

```
    var routes = [{
        path:'/home',
        name:'string-one',
        params:[],
        hander:function(){alert('/home');}
    }];

    var myRouter = new Router(routes)
                        .add('/newadd',function(){
                            alert('/newadd');
                        })
                        .listen();  //必须进行listen()初始化
```

2. 支持正则输入匹配
3. 支持嵌套输入
4.  - add(path,name,hander)
        + @path:string,每一对"//"之间可以为regexp或string
        + @name:string,[*options*]
        + @hander:function

    - remove(name)
        + @name:string;可以为path

    - go(path)
        + @path：string；不可以为regexp

    - listen()
