<template>
	<div style="background: #629af9; overflow: hidden;">
		<div class="formTitle">
			<h2>企业基本信息（必填）</h2>
			<p>
				*本程序不会对输入数据进行保存，所有数据结果将
				<br />会根据您所填写的信息生成,建议尽量填写您的真
				<br />实有效的信息,以获得更精准的测评。
			</p>
		</div>
		<div class="formbox">
			<div class="formbox_con">
				<h3>地区选择</h3>
				<view style="display:flex">
				<picker mode="selector" @change="regionClick" :value="index" style='width:50%'  :range="HyArr" range-key="text">
					<div class="input_box select flex a-center jlr">
						<view>{{ApiData.Required.adcode==0 ? "请选择省份" :diqu}}</view>
					</div>
				</picker>
				<picker mode="selector" @change="dqfyClick" :value="index" style='width:50%'  :range="dqfyArr" range-key="text">
					<div class="input_box select flex a-center jlr">
						<view>{{dqfy=="" ? "请选择市区" :dqfy}}</view>
					</div>
				</picker>
				</view>
				<h3>行业选择</h3>
				<view style="display:flex">

					<picker mode="selector" @change="idClick" :value="index1" style='width:50%' :range="IyArr" range-key="name">
						<div class="input_box select flex a-center jlr" >
							<view>{{ApiData.Required.industry_id==0 ? "请选择大行业" :zhiye}}</view>
						</div>
					</picker>
					<picker mode="selector" @change="FuyeidClick" :value="index1"  style='width:50%' :range="fuyeArr" range-key="name">
						<div class="input_box select flex a-center jlr">
							<view>{{fuye=="" ? "请先选择子行业" :fuye}}</view>
						</div>
					</picker>
				</view>

				<h3>注册时间</h3>
				<picker mode="date" fields="year" @change="dateClick">
					<div class="input_box select flex a-center jlr">
						<view>{{ApiData.Required.register_year==0 ? "请选择日期" :ApiData.Required.register_year}}</view>
					</div>
				</picker>

				<h3>实缴注册资金</h3>
				<div class="input_box flex a-center jlr">
					<input type="digit" min="3.00" max="999999999.00" v-model.number="ApiData.Required.registered_capital" placeholder="请输入资金" />
					<em>万元</em>
				</div>

				<h3>员工人数</h3>
				<div class="input_box flex a-center jlr">
					<input type="number" placeholder="请输入人数" v-model.number="ApiData.Required.employees" />
					<em>人</em>
				</div>

				<h3>年营业收入</h3>
				<div class="input_box flex a-center jlr">
					<input type="digit" placeholder="请输入年收入" v-model.number="ApiData.Required.output_value" />
					<em>万元</em>
				</div>

				<h3>
					年利润率
					<span>（净利润，可输入负数）</span>
				</h3>
				<div class="input_box flex a-center jlr">
					<input type="text" placeholder="请输入利润率" v-model="jfushu" />
					<em>%</em>
				</div>
				<h3>年科研经费占营收比例</h3>
				<div class="input_box flex a-center jlr">
					<input type="digit" placeholder="请输入比例" v-model.number="ApiData.Required.Investment_funds" />
					<em>%</em>
				</div>
			</div>
			<div class="tipTxt">
				（如果企业业务存在多个业务，建议根据不同行业
				<br />的实际数值分开输入进行测评）
			</div>
			<div class="submits bor flex a-center j-center" @click="open()">增选项</div>
			<div class="submits flex a-center j-center" @click="yanzheng()">免费获得企业评分</div>
			<div class="submits flex a-center j-center" @click="ajaxApi()">重设</div>
		</div>
		<div class="increasedBackground" v-if="fix" @click="close()"></div>
		<div class="increased" v-if="fix">
			<h2>其他信息填写（选填）</h2>
			<div class="tipText">本程序不会对输入数据进行保存，所有数据结果将会根据您所填写的信息生成,建议尽量填写您的真实有效的信息,以获得更精准的测评。</div>

			<div class="formIteminput">
				<h4>{{ApiData.optional[0].description}}</h4>
				<picker mode="selector" v-if="ApiData.optional[0].Product!=null" range-key="name" :value="index" :range="ApiData.optional[0].Product"
				 @change="forClick1">
					<div class="input flex a-center input_box select jlr">
						<view>{{Select1}}</view>
						<div class="sanjiao"></div>
					</div>
				</picker>
				<div class="input flex a-center" v-if="ApiData.optional[0].type!=null">
					<input type="number" v-model.number="ApiData.optional[0].Debt_ratio" />
				</div>
			</div>

			<div class="formIteminput">
				<h4>{{ApiData.optional[1].description}}</h4>
				<picker mode="selector" v-if="ApiData.optional[1].Product!=null" range-key="name" :value="index" :range="ApiData.optional[1].Product"
				 @change="forClick2">
					<div class="input flex a-center input_box select jlr">
						<view>{{Select2}}</view>
						<div class="sanjiao"></div>
					</div>
				</picker>
				<div class="input flex a-center" v-if="ApiData.optional[1].type!=null">
					<input type="text" v-model.number="fushu" />
					<em>%</em>
				</div>
			</div>
			<div class="formIteminput">
				<h4>{{ApiData.optional[2].description}}</h4>
				<picker mode="selector" v-if="ApiData.optional[2].Product!=null" range-key="name" :value="index" :range="ApiData.optional[2].Product"
				 @change="forClick3">
					<div class="input flex a-center input_box select jlr">
						<view>{{Select3}}</view>
						<div class="sanjiao"></div>
					</div>
				</picker>
				<div class="input flex a-center" v-if="ApiData.optional[2].type!=null">
					<input type="number" v-model="ApiData.optional[2].Debt_ratio" />
					<em>%</em>
				</div>
			</div>

			<div class="formIteminput">
				<h4>{{ApiData.optional[3].description}}</h4>
				<picker mode="selector" v-if="ApiData.optional[3].Product!=null" range-key="name" :value="index" :range="ApiData.optional[3].Product"
				 @change="forClick4">
					<div class="input flex a-center input_box select jlr">
						<view>{{Select4}}</view>
						<div class="sanjiao"></div>
					</div>
				</picker>
				<div class="input flex a-center" v-if="ApiData.optional[3].type!=null">
					<input type="number" v-model.number="ApiData.optional[3].Debt_ratio" />
					<em>%</em>
				</div>
			</div>

			<div class="submit_fix flex a-center j-center" @click="close()">确定</div>
			<div class="submit_fix_clear flex a-center j-center" @click="fxAjaxApi()">全部清空</div>
		</div>
	</div>
</template>
<script>
	import info from "@../../industry_info.js";
	import map from "@../../map.js";
	export default {
		data() {
			return {
				fix: false,
				ApiData: [],
				index: 0, //索引
				index1: 0, //索引
				Select1: "",
				Select2: "",
				Select3: "",
				Select4: "",
				HyArr: map.goodbye,
				IyArr: info.data,
				diqu: "",
				zhiye: "",
				fuyeArr:[],
				fuye:"",
				dqfy:"",
				dqfyArr:[],
				fushu:0,
				jfushu:0

			};
		},
		methods: {
			open() {
				this.fix = true;
			},
			close() {
				console.log(this.fushu)
			
				if(/^-[1-9][0-9]/.test(this.fushu)){
					this.ApiData.optional[2].Debt_ratio=this.fushu;
				}else{
					this.ApiData.optional[2].Debt_ratio=0;
				}
					this.fix = false;
				
			},
			// 日期选择
			dateClick(event) {
				this.ApiData.Required.register_year = Number(event.detail.value);
			},
			//行业选择
			idClick(event) {
				// 行业选择
				console.log(event);
				this.ApiData.Required.industry_id = this.IyArr[Number(event.detail.value)].Large_categories_id;
				this.zhiye = this.IyArr[Number(event.detail.value)].name;
				this.fuyeArr=this.IyArr[Number(event.detail.value)].industry_lists;
			},
			FuyeidClick(event){
				console.log(event)
					this.ApiData.Required.industry_id = this.fuyeArr[Number(event.detail.value)].industry_id
					this.fuye= this.fuyeArr[Number(event.detail.value)].name
			},
			
			// 省份选择
			regionClick(event) {
				this.ApiData.Required.adcode = Number(this.HyArr[Number(event.detail.value)].value);
				this.diqu = this.HyArr[Number(event.detail.value)].text;
				this.dqfyArr = this.HyArr[Number(event.detail.value)].children; 
			},
			dqfyClick(event){
				console.log(event)
				this.ApiData.Required.adcode = this.dqfyArr[Number(event.detail.value)].value
				this.dqfy= this.dqfyArr[Number(event.detail.value)].text
			},
			forClick1(event) {

				this.Select1 = this.ApiData.optional[0].Product[
					Number(event.detail.value)
				].name;
				this.ApiData.optional[0].Product[
					Number(event.detail.value)
				].is_choice = 1;
			},
			forClick2(event) {
				console.log(event);
				this.Select1 = this.ApiData.optional[1].Product[
					Number(event.detail.value)
				].name;
				this.ApiData.optional[1].Product[
					Number(event.detail.value)
				].is_choice = 1;
			},
			forClick3(event) {
				this.Select3 = this.ApiData.optional[2].Product[
					Number(event.detail.value)
				].name;
				this.ApiData.optional[2].Product[
					Number(event.detail.value)
				].is_choice = 1;
				console.log(event);
			},
			forClick4(event) {
				this.Select4 = this.ApiData.optional[3].Product[
					Number(event.detail.value)
				].name;
				this.ApiData.optional[3].Product[
					Number(event.detail.value)
				].is_choice = 1;
				console.log(event);
			},
			// 付选清空
			fxAjaxApi() {
				this.fushu=0;
				var _this = this;
				uni.request({
					url: this.ApiUrl + "api/v5/Tik_Tok/get_industry_in",
					success: function(succ) {
						_this.ApiData.optional = succ.data.optional;
						_this.Select1 = "请选择产品";
						_this.Select3 = "请选择产品";
						_this.Select4 = "请选择产品";
					},
				});
			},
			ajaxApi() {
				var _this = this;
				uni.request({
					url: this.ApiUrl + "api/v5/Tik_Tok/get_industry_in",
					success: function(succ) {
						_this.ApiData = succ.data;
						_this.Select1 = "请选择产品";
						_this.Select3 = "请选择产品";
						_this.Select4 = "请选择产品";
						// 判断位数
						if (_this.ApiData.Required.output_value === 0) {
							_this.ApiData.Required.output_value = null;
						}
						if (_this.ApiData.Required.profit_margin === 0) {
							_this.ApiData.Required.profit_margin = null;
						}
						if (_this.ApiData.Required.Investment_funds === 0) {
							_this.ApiData.Required.Investment_funds = null;
						}
						if (_this.ApiData.Required.registered_capital === 0) {
							_this.ApiData.Required.registered_capital = null;
						}
						if (_this.ApiData.Required.employees === 0) {
							_this.ApiData.Required.employees = null;
						}
						console.log("-----------------------");
						console.log(_this.ApiData);
						console.log("-----------------------");
					},
				});
				setTimeout(() => {
					console.log(_this.ApiData);
				}, 1000);
			},
			// 数据验证
			yanzheng() {
				if(/^-[1-9][0-9]/.test(this.jfushu)){
					this.ApiData.Required.profit_margin=this.jfushu;
				}else{
				    this.ApiData.Required.profit_margin=0;
				}
			
				var _this = this;
				uni.request({
					url: _this.ApiUrl + "api/v5/Tik_Tok/post_test",
					method: "post",
					data: _this.ApiData,
					success: function(suc) {
						if (!suc.data.is_ok) {
							wx.showToast({
								title: suc.data.msg,
								icon: "none", //如果要纯文本，不要icon，将值设为'none'
								duration: 3000,
							});
						} else if (suc.data.is_ok) {
							uni.request({
								url: _this.ApiUrl + "api/v5/Tik_Tok/layer/3/run",
								method: "post",
								data: _this.ApiData,
								success: function(success) {
									console.log(success);
									try {
										uni.setStorageSync("data", JSON.stringify(success.data));
										wx.showToast({
											title: "数据上传成功,正在处理数据....",
											icon: "none", //如果要纯文本，不要icon，将值设为'none'
											duration: 3000,
										});

										setTimeout(() => {
											uni.navigateTo({
												url: "../home/home",
											});
										}, 3000);
									} catch (e) {
										wx.showToast({
											title: "系统繁忙!",
											icon: "none", //如果要纯文本，不要icon，将值设为'none'
											duration: 3000,
										});
									}
								},
								catch: function(error) {
									wx.showToast({
										title: "系统繁忙!",
										icon: "none", //如果要纯文本，不要icon，将值设为'none'
										duration: 3000,
									});
								},
							});
						}
						console.log(suc);
					},
				});
			},
		},
		mounted() {
			this.ajaxApi();
		},
	};
</script>
