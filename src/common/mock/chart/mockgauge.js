let mockgauge = {
	data: {
		tableId: '5766a7cb9dd741408d8b17080940b15f',
		chartType: 'gaugeChart',
		legend: { dim: [] },
		xAxis: { dim: [] },
		yAxis: {
			measure: [
				{
					measureId: '6b2a0c11a81648a199788bf52f266583',
					measureName: '厨电',
					showType: '',
					measureUnit: '',
					max: '',
					decimal: 3,
					position: 'left'
				},
				{
					measureId: 'd38daa7cd97543519ae38611c510748e',
					measureName: '海尔链群',
					showType: '',
					measureUnit: '',
					max: '',
					decimal: 3,
					position: ''
				},
				{
					measureId: '09bec977b46344b682961c1d73e3ec8b',
					measureName: '统帅链群',
					showType: '',
					measureUnit: '',
					max: '',
					decimal: 3,
					position: ''
				},
				{
					measureId: 'b09de845f6e1491c9c49c83b94dc44cd',
					measureName: '卡萨帝链群',
					showType: '',
					measureUnit: '',
					max: '',
					decimal: 3,
					position: ''
				}
			]
		},
		resultData: [
			{
				'海尔-期间': 'bcee99dbb4414d769f198ade332fc3ed',
				'海尔-科目': '701c1ecbfd4849a1a0e53529f89b1736',
				'海尔-维度备用': '8ad112e838c04a0e8baddb376642a341',
				厨电: 8505.0,
				卡萨帝链群: 2249.0,
				统帅链群: 3782.0,
				海尔链群: 2474.0
			}
		],
		switchChartTypes: null,
		recommendChartType: ''
	}
}

import * as echarts from 'echarts'
const getOption = (value, total) => {
	//如果值大于总数，显示100%
	if (value > total) {
		value = value
		total = value
	}
	let floatValue = 0
	// value = 4.8;
	if (total != 0) {
		floatValue = Math.ceil((value * 100) / total) / 100
	}
	floatValue = floatValue.toFixed(2)
	let offsetAngle = -20
	let totalAngle = 220
	let split = 20
	let startAngle = totalAngle + offsetAngle
	let endAngle = startAngle - Math.floor(floatValue * totalAngle)
	if (floatValue == 1) {
		endAngle = -20
	}
	let option = {
		series: [
			{
				type: 'gauge',
				center: ['50%', '70%'], // 仪表位置
				radius: '120%', //仪表大小
				startAngle: startAngle, //开始角度
				endAngle: offsetAngle, //结束角度
				axisLine: {
					lineStyle: {
						// 属性lineStyle控制线条样式
						color: [
							[
								floatValue,
								new echarts.graphic.LinearGradient(
									0,
									0,
									1,
									0,
									[
										{
											offset: 1,
											color: '#1E88E5' // 50% 处的颜色
										},
										{
											offset: 0,
											color: '#15CAE8' // 0% 处的颜色
										}
									],
									false
								)
							], // 100% 处的颜色
							[
								1,
								new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{
											offset: 0.2,
											color: '#FFF' // 92% 处的颜色
										},
										{
											offset: 0,
											color: '#FFF' // 90% 处的颜色
										}
									],
									false
								)
							]
						],
						width: 15,
						shadowColor: 'rgba(0, 0, 0, 0.2)',
						shadowBlur: 5
					}
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				detail: {
					show: false
				}
			},
			{
				type: 'gauge',
				center: ['50%', '70%'], // 默认全局居中
				splitNumber: 4, // 分割段数，默认为5
				radius: '95%',
				startAngle: startAngle,
				endAngle: endAngle,
				axisLine: {
					lineStyle: {
						// 属性lineStyle控制线条样式axisTick
						color: [
							//表盘颜色
							[0.5, '#FFF'], //0-50%处的颜色
							[0.7, '#FFF'], //51%-70%处的颜色
							[0.9, '#FFF'], //70%-90%处的颜色
							[1, '#FFF'] //90%-100%处的颜色
						],
						width: 0 //表盘宽度
					},
					show: false
				},
				splitLine: {
					//分割线样式（及10、20等长线样式）
					length: 10,
					lineStyle: {
						// 属性lineStyle控制线条样式
						width: 2,
						color: '#1E88E5'
					},
					show: false
				},
				axisTick: {
					//刻度线样式（及短线样式）
					length: 5,
					splitNumber: split - Math.floor((value / 100) * split),
					lineStyle: {
						// 属性lineStyle控制线条样式
						color: '#1C98E6'
					}
				},
				axisLabel: {
					//文字样式（及“10”、“20”等文字样式）
					color: 'black',
					distance: 5, //文字离表盘的距离
					show: false
				},
				pointer: {
					width: 0
				},
				title: {
					show: true,
					offsetCenter: [0, '10%'], // x, y，单位px
					textStyle: {
						// 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: '#000',
						fontSize: 14
					}
				},
				detail: {
					formatter: '{score|{value}}{percent|%}',
					offsetCenter: [0, '-30%'],
					verticalAlign: 'bottom',
					lineHeight: 30,
					rich: {
						score: {
							color: '#000',
							fontWeight: 'bold',
							fontSize: 30
						},
						percent: {
							color: '#000',
							fontSize: 12
						}
					}
				},
				data: [
					{
						value: floatValue * 100,
						name: '测试测试'
					}
				]
			},
			{
				type: 'gauge',
				center: ['50%', '70%'], // 默认全局居中
				splitNumber: 4, // 分割段数，默认为5
				radius: '95%',
				startAngle: endAngle,
				endAngle: -20,
				axisLine: {
					lineStyle: {
						// 属性lineStyle控制线条样式axisTick
						color: [
							//表盘颜色
							[0.5, '#FFF'], //0-50%处的颜色
							[0.7, '#FFF'], //51%-70%处的颜色
							[0.9, '#FFF'], //70%-90%处的颜色
							[1, '#FFF'] //90%-100%处的颜色
						],
						width: 0 //表盘宽度
					},
					show: false
				},
				splitLine: {
					//分割线样式（及10、20等长线样式）
					length: 10,
					lineStyle: {
						// 属性lineStyle控制线条样式
						width: 2,
						color: '#D5D5D5'
					},
					show: false
				},
				axisTick: {
					//刻度线样式（及短线样式）
					length: 5,
					splitNumber: split - Math.floor((value / total) * split),
					lineStyle: {
						// 属性lineStyle控制线条样式
						color: '#D5D5D5'
					}
				},
				axisLabel: {
					show: false
				},
				pointer: {
					width: 0
				},
				detail: {
					show: false
				},
				data: []
			}
		]
	}
	return option
}

let mockgauge2 = getOption(20, 100)

export { mockgauge, mockgauge2 }
