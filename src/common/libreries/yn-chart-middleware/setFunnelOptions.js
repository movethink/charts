//漏斗图echarts数据格式
const getStaticOption = ()=>{
    return  {
        default: false,
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}"
        },
        series: [
          {
            name: "left",
            type: "funnel",
            label: {
              position: "left",
              formatter: "{b}",
              color: "#000"
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              opacity: 1
            },
            legendHoverLink: false
          },
          {
            name: "center",
            type: "funnel",
            silent: true,
            label: {
              position: "inside",
              formatter: "{c}",
              color: "#fff"
            },
            itemStyle: {
              opacity: 0,
              borderColor: "none",
              borderWidth: 0
            },
            labelLine: {
              show: false
            }
          },
          {
            name: "right",
            type: "funnel",
            silent: true,
            label: {
              position: "rightBottom",
              formatter: () => {
                return "转化率";
              },
              padding: [30, 24, 24, 5],
              color: "#000"
            },
            itemStyle: {
              opacity: 0,
              borderColor: "none",
              borderWidth: 0
            },
            labelLine: {
              show: false
            }
          }
        ]
    }
}
//转换数据格式函数
const formatFunnelChart = (type, data)=> {
    let funnelChartOption = getStaticOption();
    let optionData = { ...data };
    let yAxisMeasure = optionData.yAxis.measure;
    let resultData = optionData.resultData;
    Array.isArray(yAxisMeasure) &&
      yAxisMeasure.forEach((v, i) => {
        if (i === 0) {
          funnelChartOption.series.forEach(seriesV => {
            seriesV.data = [];
          });
          funnelChartOption.legend = { data: [] };
        }
        funnelChartOption.legend.data.push(v.measureName);
        funnelChartOption.series.forEach(seriesV => {
          seriesV.data.push({
            name: v.measureName,
            id: v.measureId,
            value: resultData[0][v.measureName]
          });
        });
      });
    //将data中的数据根据数值从大到小排序虽然展示层echarts会处理但是后面的计算转化率需要的数据是数据是顺序的
    Array.isArray(funnelChartOption.series) &&
      funnelChartOption.series.forEach(v => {
        let data = v.data;
        if (data && Array.isArray(data)) {
          data.sort((a, b) => {
            return b.value - a.value;
          });
        }
      });
    let rightSeries = funnelChartOption.series.find(
      fv => fv.name === "right"
    );
    if (rightSeries) {
      let rightData = rightSeries.data;
      Array.isArray(rightData) &&
        rightData.forEach((dataV, dataVIndex) => {
          if (dataVIndex === rightData.length - 1) {
            dataV.label = {
              position: "rightBottom",
              formatter: () => {
                return "";
              }
            };
          } else {
            dataV.label = {
              position: "rightBottom",
              formatter: v => {
                return `转化率:${ConversionRate(
                  rightData[dataVIndex + 1].value,
                  v.value
                )}`;
              }
            };
          }
        });
    }
    return funnelChartOption;
  }
//计算漏斗图转化率函数
const ConversionRate=(num1, num2)=> {
        let formatNum = "";
        if (num1 && num2 && num1 !== "" && num2 !== "") {
          formatNum = ((num1 / num2) * 100).toFixed(2) + "%";
        }
        //  else if (num1 === 0 && num2 === 0) {
        //   formatNum = 0 + "%";
        // } 
        else if (num1 === 0 || num2 === 0) {
          formatNum = 0 + "%";
        }
        return formatNum;
}
export {formatFunnelChart}