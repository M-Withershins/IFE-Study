/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 9; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart(chartArr, graTime) {
    /*
     charArr是需要被渲染的一组数据,
     graTime有三个值,day,week,month判断类型,即li宽度
     */
    var chartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
    //if (document.getElementsByTagName('ul')!==[]) {
    //    chartWrap.removeChild(document.getElementsByTagName('ul'));
    //}
    var chartUl = document.createElement('ul');
    chartWrap.appendChild(chartUl);

    for (var i = 0; i < chartArr.length; i++) {
        var chartLi = document.createElement('li');
        chartUl.appendChild(chartLi);
        chartLi.setAttribute('class', graTime);
        chartLi.style.height = chartArr[i];
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(chartArr, radiobox) {
    // 确定是否选项发生了变化

    // 设置对应数据
    var timeForm = radiobox.getElementsByTagName('input');
    for (var i = 0; i < timeForm.length; i++) {
        if (timeForm[i].checked) {
            pageState.nowGraTime = timeForm[i].value;
        }
    }
    initAqiChartData();
    // 调用图表渲染函数
    renderChart(chartArr, pageState.nowGraTime);
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据
    var city = document.getElementById('city-select').value;
    pageState.nowSelectCity = city;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart(chartData, pageState.nowGraTime);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radiobox = document.getElementById('form-gra-time');
    radiobox.addEventListener('click', function (e) {
        if (e.target || e.targetName == 'INPUT') {
            graTimeChange(chartData, radiobox);
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var selectCity = document.getElementById('city-select');
    for (city in aqiSourceData) {
        var newOpt = document.createElement('option');
        newOpt.innerHTML = city;
        selectCity.appendChild(newOpt);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var select = document.getElementsByTagName('select')[0];
    select.addEventListener('change', citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = [];
    for (elem in aqiSourceData[pageState.nowSelectCity]) {
        //chartData[elem] = (aqiSourceData[pageState.nowSelectCity][elem]);
        chartData.push(aqiSourceData[pageState.nowSelectCity][elem]);

    }
    return chartData;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
