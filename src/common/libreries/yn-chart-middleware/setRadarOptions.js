const setRadarOptions = (type,data)=> {
    let optionData = { ...data };
    let radaroptions = {
      radar: {
        shape: "circle",
        axisLine: {
          //*刻度线配置*/
          show: true, //是否显示刻度线
          lineStyle: {
            color: "rgba(83, 179, 28, 1)",
            type: "dashed",
            width: 1
          }
        },
        axisTick: {
          //坐标轴刻度
          show: true //是否显示坐标轴刻度
        },
        axisLabel: {
          //*刻度值配置*/
          show: true, //是否显示刻度值
          color: "rgba(67, 15, 15, 1)",
          fontSize: 12,
          fontFamily: "sans-serif",
          verticalAlign: "middle" //数据标签的显示位置只有上、中、下
        }
      }
    };
    let legendItemID =
    optionData.legend.dim.length > 0
      ? optionData.legend.dim[0].elementId
      : [];
    let { dimensionName } =
    optionData.legend.dim[0] && optionData.legend.dim[0];
    legendItemID.forEach((id, i) => {
    let v = optionData.resultData.find(
      resItem => resItem[dimensionName] === id
    );
    if (i === 0) {
      radaroptions.series = [];
      radaroptions.legend = {
        data: []
      };
    }
    let legendItem = optionData.legend.dim[0].element;
    let val = optionData.yAxis.measure.map(yv => {
      let name = yv.measureName;
      let keyArr = Object.keys(v);
      if (keyArr.find(kv => kv === name)) {
        return v[name];
      }
    });
    let legendDimMemberName = null; //系列置入的成员名称
    let legendDimMemberKey = null; //系列置入的成员ID
    if (Array.isArray(legendItemID)) {
      for (let i = 0; i < legendItemID.length; i++) {
        for (let key in v) {
          let memberKey = v[key];
          if (memberKey === legendItemID[i]) {
            legendDimMemberKey = legendItemID[i];
            legendDimMemberName = legendItem[i];
            break;
          }
        }
      }
    }
    radaroptions.series.push({
      name: legendDimMemberName,
      type: "radar",
      data: [
        {
          value: val,
          name: legendDimMemberName,
          id: legendDimMemberKey
        }
      ]
    });
    radaroptions.legend.data.push(legendDimMemberName);
  });
  optionData.yAxis.measure.forEach((name, index) => {
    if (index === 0) {
      radaroptions.radar.indicator = [];
    }
    radaroptions.radar.indicator.push({
      name: name.measureName
    });
  });
  return radaroptions;
  }
  export {setRadarOptions}