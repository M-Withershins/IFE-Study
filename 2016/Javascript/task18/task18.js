var leftIn = document.getElementById('leftIn');
var leftOut = document.getElementById('leftOut');
var rightIn = document.getElementById('rightIn');
var rightOut = document.getElementById('rightOut');
var showDiv = document.getElementById('show');
var items = [];

var Queue = function (items) {
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
};
var testValue = function (value) {
    if (value >= 10 && value <= 100) {
        return true;
    } else {
        alert('输入的值处于10-100范围内');
    }
    return false;
};
var isEmpty = function (items) {
    if (items.length == 0) {
        alert('队列值为空');
        return false;
    }
    return true;
};
var showQueue = function (items) {
    showDiv.innerText = '';
    if (items) {
        for (var i = 0; i < items.length; i++) {
            var newLi = document.createElement('li');
            newLi.innerHTML = items[i];
            showDiv.appendChild(newLi);
        }
    }
};

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