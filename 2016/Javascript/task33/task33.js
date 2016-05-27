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
        default:
            alert('请输入上述八条命令');
    }
}, false);
