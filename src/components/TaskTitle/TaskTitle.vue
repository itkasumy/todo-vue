<template>
	<h3 class="big-title">{{title}}</h3>
</template>

<script>
	export default {
		props: {
			title: ''
		}
	}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
	.big-title
		color #222
</style>