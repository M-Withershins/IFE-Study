var direction = [0, -40];
var position = [0, 0];
var angle = 0;
var block = document.getElementById("block");
var btn = document.getElementById('submit');

var swip = function (turnleft) {
    var r = (turnleft ? !!direction[0] : !!direction[1]) ? -1 : 1;
    direction[0] += direction[1];
    direction[1] = direction[0] * r - direction[1] * r;
    direction[0] = direction[0] * r - direction[1];
    angle += turnleft ? -90 : 90;
    block.style.transform = "rotate(" + angle + "deg)";
};
var setSwip = function () {
    if (direction[0] > 0) {
        angle = 90;
    }
    else if (direction[0] < 0) {
        angle = -90;
    }
    else {
        if (direction[1] > 0) angle = 180;
        else angle = 0;
    }
    block.style.transform = 'rotate(' + angle + 'deg)';
};
var go = function () {
    if (position[0] + direction[0] >= 0 && position[0] + direction[0] < 400)
        position[0] += direction[0];
    else alert('不能越出边界');
    if (position[1] + direction[1] >= 0 && position[1] + direction[1] < 400)
        position[1] += direction[1];
    else alert('不能越出边界');
    block.style.left = position[0] + "px";
    block.style.top = position[1] + "px";
};
var turnLeft = function () {
    swip(1);
};
var turnRight = function () {
    swip(0);
};
var turnBack = function () {
    direction[0] = -1 * direction[0];
    direction[1] = -1 * direction[1];
    angle += 180;
    block.style.transform = "rotate(" + angle + "deg)";
};
btn.addEventListener('click', function () {
    var value = document.getElementById('input').value;
    var left = Number(block.style.left.slice(0, -2)),
        top = Number(block.style.top.slice(0, -2));
    switch (value) {
        case ('GO'):
            go();
            break;
        case ('TUN LEF'):
            turnLeft();
            break;
        case ('TUN RIG'):
            turnRight();
            break;
        case ('TUN BAC'):
            turnBack();
            break;
        case ('TRA LEF'):
            if (left <= 0) {
                alert('不能越界');
                break;
            }
            block.style.left = Number(block.style.left.slice(0, -2)) - 40 + 'px';
            break;
        case ('TRA RIG'):
            if (left >= 400) {
                alert('不能越界');
                break;
            }
            block.style.left = Number(block.style.left.slice(0, -2)) + 40 + 'px';
            break;
        case ('TRA TOP'):
            if (top <= 0) {
                alert('不能越界');
                break;
            }
            block.style.top = Number(block.style.top.slice(0, -2)) - 40 + 'px';
            break;
        case ('TRA BOT'):
            if (top >= 400) {
                alert('不能越界');
                break;
            }
            block.style.top = Number(block.style.top.slice(0, -2)) + 40 + 'px';
            break;
        case ('MOV TOP'):
            direction = [0, -40];
            setSwip(direction);
            go();
            break;
        case ('MOV LEF'):
            direction = [-40, 0];
            setSwip(direction);
            go();
            break;
        case ('MOV RIG'):
            direction = [40, 0];
            setSwip(direction);
            go();
            break;
        case ('MOV BOT'):
            direction = [0, 40];
            setSwip(direction);
            go();
            break;
        default:
            alert('请输入上述八条命令');
    }
}, false);
