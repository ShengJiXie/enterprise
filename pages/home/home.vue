<template>
	<div style="background: #f1f1fd; overflow: hidden;" v-if="state">
		<div class="head1" v-if="cont==2">
			<div class="chartBar">
				<mpvue-echarts :echarts="echarts" :onInit="barInit" canvasId="bar" ref="barChart" />
			</div>
		</div>
		<div class="head" v-else>
			<div id="chart">
				<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
			</div>
			<div class="head_txt">企业竞争力</div>
		</div>

		<div class="main">
			<div class="tabTitle flex a-center jlr">
				<div class="item flex a-center j-center" @click="tab(0)" :class="{'on':cont=='0'}">结果</div>
				<div class="item flex a-center j-center" @click="tab(1)" :class="{'on':cont=='1'}">分析</div>
				<div class="item flex a-center j-center" @click="tab(2)" :class="{'on':cont=='2'}">策略</div>
			</div>
			<div class="tabContent" v-if="cont==0">
				<div class="tabContentBlock" v-for="(item,key) in ApiData.stage_1.txt_info" :key="item[0]">
					<h2>{{item.title}}</h2>
					<view v-if="key===2" v-html="item.remark"></view>
					<p v-else>{{item.remark}}</p>
				</div>

				<div class="flex a-center guankan">
					<div class="guankanIcon"></div>
					<text>观看视频解锁分析和策略页</text>
				</div>

				<div class="submitbutton flex a-center j-center">立即查看</div>
			</div>
			<!--结果-->

			<div class="tabContent" v-if="cont==1">
				<div class="tabContentBlock">
					<h2>企业状况分析</h2>
					<div id="tabCharts">
						<mpvue-echarts :echarts="echarts" :onInit="leidaInit" canvasId="leida" ref="leidaChart" />
					</div>
				</div>
				<div class="tabContentBlock" v-for="(item,key) in ApiData.stage_2.txt_info" :key="item[0]">
					<h2>{{item.title}}</h2>
					<view v-if="key===3">
						<view v-for="(item,key) in ApiData.stage_2.score_info.index" :key="item[0]">
							<div class="tabcontit flex a-center" style="margin-top: 0.12rem;">
								<b style="background: #00aaff;" v-if="key===0"></b>
								<b style="background: #c76b1a;" v-else-if="key===1"></b>
								{{item.description}}
							</div>
							<div class="tabconcon flex jlr">
								<div class="tabconcon_ti" v-for="(arrs,keys) in typeState" :key="keys">
									<div :class="['tabconcon_icon',item.x===(keys+1)&&key===0?'on':item.x===(keys+1)&&key===1?'on1':'']"></div>
									<div :class="'fgx t'+(keys+1)"></div>
									<p>{{arrs}}</p>
								</div>
							</div>
						</view>
					</view>
					<p v-else>{{item.remark}}</p>
				</div>

			</div>
		</div>



		<div class="tabContent" v-if="cont==2">
			<div class="tabContentBlock">
				<h2>前景预测 <em>(行业年产值十万）</em> </h2>
				<div id="tabContentcart">
					<mpvue-echarts :echarts="echarts" :onInit="xianInit" canvasId="xian" ref="xianChart" />
				</div>
			</div>

			<div class="tabContentBlock">
				<h2>{{ApiData.stage_3.forecast.name}}</h2>
				<p>{{ApiData.stage_3.forecast.description}}</p>
			</div>

			<div class="tabContentBlock">
				<h2>{{ApiData.stage_3.form_txt.form_name}}</h2>
				<div class="jingyingTitle flex a-center j-center">
					企业经营计划与预算之痛
				</div>
				<view v-for="(item,index) in ApiData.stage_3.form_txt.second_txt" :key="index">
					
				<h3><span>{{index+1}}.</span>{{item.form_name}}</h3>
				<p class="smallTxt">{{item.description}}</p>
				</view>
			</div>

			<div class="tabContentBlock">
				<h2>定制方案</h2>
				<div class="ewmCont">
					<div class="txtFn">
						更多企业定制方案请<br />添加客服微信或致电客服电话
					</div>
					<image mode="aspectFill" src="https://www.kuadh.com/code.jpg">
						<div class="txtFn">客服热线：020-84680993</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	import * as echarts from '../../components/echarts/echarts.js';
	import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';
	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				cont: 0,
				echarts: echarts,
				ApiData: [],
				typeState: ['下', '中下', '中等', '中上', '良好', '优秀'],
				FristArrx: [],
				FristArry: [],
				TwoArray:[],
				TwoArrays:[],
				state: false
			}
		},
		methods: {
			tab(v) {
				this.cont = v
			},
			//数据处理
			number_handle() {
				var _this = this
					this.ApiData.stage_3.forecast.x.forEach((element) => {
						_this.FristArrx.push(element)
					})
					this.ApiData.stage_3.forecast.y.forEach((element) => {
						_this.FristArry.push(element)
					})
					this.ApiData.stage_1.score_info.radar.forEach((element,key) => {
						_this.TwoArray.push({"name":element.description,"max":200})
						_this.TwoArrays.push(Number(element.score));
					})
					uni.setStorageSync('FristArrx', _this.FristArrx)
					uni.setStorageSync('FristArry', _this.FristArry)
					uni.setStorageSync('TwoArray', _this.TwoArray)
					uni.setStorageSync('TwoArrays', _this.TwoArrays)
					
			},
			lineInit(canvas, width, height) {
				var _this = this;
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)
				let lineOption = {
					series: [{
						type: 'gauge',
						radius: '90%',
						center: ['50%', '50%'],
						splitNumber: 0, //刻度数量
						startAngle: 225,
						endAngle: -45,
						axisLine: {
							show: true,
							lineStyle: {
								width: 12,
								color: [
									[0.9, {
										"x": 0,
										"y": 0,
										"x2": 1,
										"y2": 0,
										"type": "linear",
										"global": false,
										"colorStops": [{
											"offset": 0,
											"color": "#5c53de"
										}, {
											"offset": 1,
											"color": "#18c8ff"
										}]
									}],
									[1, "#b0c3fe"]
								]
							}
						},
						//分隔线样式。
						splitLine: {
							show: false,
						},
						axisLabel: {
							show: false
						},
						axisTick: {
							show: false
						},
						pointer: {
							show: false
						},
						title: {
							show: true,
							offsetCenter: [0, '-26%'], // x, y，单位px
							textStyle: {
								color: '#fff',
								fontSize: 16
							}
						},
						//仪表盘详情，用于显示数据。
						detail: {
							show: true,
							offsetCenter: [0, '16%'],
							color: '#ffffff',
							formatter: function(params) {
								return params
							},
							textStyle: {
								fontSize: 30
							}
						},
						data: [{
							name: "您的得分",
							value: uni.getStorageSync('score')
						}],

					}],
				}
				lineChart.setOption(lineOption)
				return lineChart
			},
			leidaInit(canvas, width, height) {
				let leidaChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(leidaChart);
				let option = {
					tooltip: {
						trigger: 'item'
					},
					radar: {
						name: {
							textStyle: {
								color: '#4D4D4D',
								fontSize: 10,
								padding: [3, 5]
							}
						},
						splitArea: {
							show: false
						},
						radius: '55%',
						center: ['50%', '50%'],
						indicator: uni.getStorageSync('TwoArray')
					},
					series: [{
						name: '缴费渠道偏好',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [{
							value: uni.getStorageSync('TwoArrays'),
							name: '缴费渠道偏好'
						}],
						areaStyle: {
							color: 'rgba(184,232,255,0.8)'

						},
						lineStyle: {
							color: '#009EFF',
							width: 2
						},
						symbol: "circle",
						symbolSize: 6,
						showAllSymbol: false,
						itemStyle: {
							color: "white",
							borderColor: "#00aaff",
							borderWidth: 2
						}
					}]
				};

				leidaChart.setOption(option)
				return leidaChart

			},
			xianInit(canvas, width, height) {
				let leidaChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(leidaChart);
				let option = {
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: uni.getStorageSync('FristArrx')
					},
					grid: {
						top: '10%',
						left: '15%',
						bottom: '10%'
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%']
					},
					series: [{
						name: '模拟数据',
						type: 'line',
						smooth: true,
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							color: '#00aaff'
						},
						areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#bdd9f9'
							}, {
								offset: 1,
								color: '#ffffff'
							}])
						},
						data: uni.getStorageSync('FristArry')
					}]
				};

				leidaChart.setOption(option)
				return leidaChart
			},
			barInit(canvas, width, height) {
				let leidaChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(leidaChart);
				let option = {
					color: ['#ffffff', '#00cc75', '#c8a740'],
					grid: {
						left: '10%',
						top: '10%',
						bottom: '15%'
					},
					xAxis: [{
						type: 'category',
						data: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[0].x,
						axisLabel: {
							color: "#ffffff"
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							lineStyle: {
								color: "#ffffff"
							}
						},
						splitLine: {
							lineStyle: {
								color: "#ffffff"
							}
						}
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							color: "#ffffff"
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							lineStyle: {
								color: "#ffffff"
							}
						},
						splitLine: {
							lineStyle: {
								color: "#ffffff"
							}
						}
					}],
					series: [{
							name: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[0].name,
							type: 'bar',
							data: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[0].y,
							barWidth: 10,
							itemStyle: {
								emphasis: {
									barBorderRadius: 10
								},
								normal: {
									barBorderRadius: 10
								}
							}
						},
						{
							name: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[1].name,
							type: 'bar',
							barWidth: 10,
							data: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[1].y,
							itemStyle: {
								emphasis: {
									barBorderRadius: 100
								},
								normal: {
									barBorderRadius: 100
								}
							}
						},
						{
							name: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[2].name,
							type: 'bar',
							barWidth: 10,
							data: JSON.parse(uni.getStorageSync('data')).stage_3.Prospect_index[2].y,
							itemStyle: {
								emphasis: {
									barBorderRadius: 100
								},
								normal: {
									barBorderRadius: 100
								}
							}
						}
					]
				};
				leidaChart.setOption(option)
				return leidaChart
			}
		},
		mounted() {
			var _this = this
			const value = uni.getStorageSync('data');
			if (value) {
				_this.ApiData = JSON.parse(value)
				if(_this.ApiData.stage_1===null||_this.ApiData.stage_2===null||_this.ApiData.stage_3===null){
					wx.showToast({
						title: "系统频繁",
						icon: "none", //如果要纯文本，不要icon，将值设为'none'
						duration: 3000,
					});
				}
				uni.setStorageSync('score', _this.ApiData.stage_1.score)
				console.log(_this.ApiData)
				_this.state = true;
			}
			this.number_handle(0);

		}
	}
</script>
<style>
	.guankan text {
		font-size: 24upx;
		color: #313131;
		margin-left: 10upx;
	}

	.submitbutton {
		width: 100%;
		margin: 20upx auto;
		height: 88upx;
		border-radius: 10upx;
		background: #1775e6;
		color: #fff;
		font-size: 30upx;
	}
</style>
