<template>
	<view class="content">
		<image :src="ceping" mode="aspectFill" class="cepingImg">
		<div class="homeTiptext">
			免责声明:企业经营有风险，以下分析建议仅供参考。<br/>
			长程社会智能大数据分析模型会根据行情的变化<br/>
			每隔2-3个月会调整相应的经营策略。敬请留意。
		
		</div>
		<div class="cepingBtn flex a-center j-center" @click="enter()" style="margin-bottom: 50upx;">开始测评</div>
	</view>
</template>

<script>
	import ceping from '../../assets/img/ceping.jpg'
	export default {
		data(){
			return {
				ceping:ceping
			}
		},
		methods: {
			enter(){
				uni.navigateTo({
					url:'../form/form'
				})
			}
		}
	}
</script>
