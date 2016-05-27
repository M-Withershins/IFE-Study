//ES6需要编译
(function () {
    var leftIn = document.getElementById('leftIn');
    var leftOut = document.getElementById('leftOut');
    var rightIn = document.getElementById('rightIn');
    var rightOut = document.getElementById('rightOut');
    var showDiv = document.getElementById('show');
    var radomNumber = document.getElementById('radomNumber');
    var sort = document.getElementById('sort');
    var items = [];

//模拟队列
    function Queue(items) {
        var items = (items) ? items : [];
        this.leftIn = function (element) {
            items.unshift(element);
        };
        this.leftOut = function () {
            return items.shift();
        };
        this.rightIn = function (element) {
            items.push(element);
        };
        this.rightOut = function () {
            return items.pop();
        };
        this.returnItem = function () {
            return items;
        };
    }

//测定传值在10~100之内
    function testValue(value) {
        if (value >= 10 && value <= 100) {
            return true;
        } else {
            alert('输入的值处于10-100范围内');
        }
        return false;
    }

//测定是否为空
    function isEmpty(items) {
        if (items.length == 0) {
            alert('队列值为空');
            return false;
        }
        return true;
    }

//渲染队列dom
    function showQueue(items) {
        showDiv.innerText = '';
        if (items) {
            for (let i = 0; i < items.length; i++) {
                var newLi = document.createElement('li');
                newLi.innerHTML = items[i];
                newLi.style.height = (parseInt(items[i]) + 100) + 'px';
                showDiv.appendChild(newLi);
            }
        }
    }

//产生10-100随机数
    function setRandom() {
        var items = [];
        for (let i = 0; i <= 60; i++) {
            items.push(Math.floor(Math.random() * 100));
        }
        return items;
    }

//排序算法
    function setClass(index, classname) {
        var ele = showDiv.children[index];
        if (ele.getAttribute('class')) {
            if (classname == 'swapli') {
                ele.setAttribute('class', 'swapli');
            } else {
                ele.removeAttribute('class');
            }
        } else {
            ele.setAttribute('class', classname);
        }
    }

    function swap(array, index1, index2) {
        var aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    }

    function* iinter(items, j) {
        if (items[j] > items[j + 1]) {
            setClass(j, 'swapli');
            setClass(j + 1, 'swapli');
            yield swap(items, j, j + 1);
            showQueue(items);
        }
    }

    function* inter(count, i, items) {
        for (let j = 0; j < count - i - 1; j++) {
            yield setClass(j, 'light');
            yield setClass(j + 1, 'light');
            yield* iinter(items, j);
            setClass(j);
            setClass(j + 1);
        }
    }

    function* bubbleSort(items) {
        var count = items.length;

        for (let i = 0; i < count; i++) {
            yield* inter(count, i, items);
        }

        return items;
    }

//分别绑定事件
    var queue = new Queue(items);

    leftIn.addEventListener('click', function () {
        var value = document.getElementById('input').value;
        if (testValue(value)) {
            queue.leftIn(value);
            items = queue.returnItem();
            showQueue(items);
        }
    });
    leftOut.addEventListener('click', function () {
        items = queue.returnItem();
        if (isEmpty(items)) {
            queue.leftOut();
            showQueue(items);
        }
    });
    rightIn.addEventListener('click', function () {
        var value = document.getElementById('input').value;
        if (testValue(value)) {
            queue.rightIn(value);
            items = queue.returnItem();
            showQueue(items);
        }
    });
    rightOut.addEventListener('click', function () {
        items = queue.returnItem();
        if (isEmpty(items)) {
            queue.rightOut();
            showQueue(items);
        }
    });

//绑定产生随机数值事件
    radomNumber.addEventListener('click', function () {
        items = setRandom();
        showQueue(items);
    }, false);

//绑定排序事件
    sort.addEventListener('click', function () {
        var gen = bubbleSort(items);
        setInterval(function () {
            gen.next();
        }, 300);
    }, false);
}())
