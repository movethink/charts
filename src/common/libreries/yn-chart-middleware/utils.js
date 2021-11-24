import NP from "number-precision";
/**
 * 格式化数据，保留小数点后两位或者改为千分位显示
 * @param {*} value 值
 * @param {*} formater 单位
 * @param {*} decimal 保留位数
 * @param {*} type 千分位（如果不需要千分位显示可不传入）
 */
function numFormate(value, formater, decimal, type) {
  if (decimal) {
    decimal = parseInt(decimal);
  }
  if (!isNaN(value)) {
    if (value) {
      if (formater == "百分比" || formater === "%") {
        value = NP.times(value, 10000);
        value = NP.divide(value, 100);
        value = NP.round(value, decimal);
        value = value + "%";
      } else {
        value = NP.round(value, decimal);
        if (type === "thousand") {
          // 千分位表示方法
          value = formatNum(value);
        }
      }
    }
  }
  return value;
}

/**
 * 转换数字为千分位显示
 * @param {} num 数字
 */
const formatNum = (num) => {
  if (isNaN(num)) {
    throw new TypeError("num is not a number");
  }
  var groups = /([\-\+]?)(\d*)(\.\d+)?/g.exec("" + num),
    mask = groups[1], //符号位
    integers = (groups[2] || "").split(""), //整数部分
    decimal = groups[3] || "", //小数部分
    remain = integers.length % 3;
  var temp = integers
    .reduce(function (previousValue, currentValue, index) {
      if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
        return previousValue + currentValue + ",";
      } else {
        return previousValue + currentValue;
      }
    }, "")
    .replace(/\,$/g, "");
  return mask + temp + decimal;
};

/**
 * 求笛卡尔积
 * [
    [1, 2, 3],
    [4, 5, 6]
  ]
 * @param {*} data
 */
const cartesian = (data) => {
  data.unshift([[]]);
  const l = data.length;
  for (let i = 0; i < l - 1; i++) {
    let curLeft = data[0];
    let curRight = data[1];
    let lastData = data.slice(2, l);
    let curCartes = [];
    curLeft.map((itemL) => {
      curRight.map((itemR) => {
        curCartes.push([...itemL, ...[itemR]]);
      });
    });
    data = [...[curCartes], ...lastData];
  }
  return data[0];
};

export { numFormate, cartesian };
