<template>
	<ul class="task-count">
		<li>
			{{
				list.filter(todo => {
					return !todo.isChecked
				}).length
			}}
			个任务未完成
		</li>
		<li class="action">
			<router-link :class="{'active': $route.path === '/all'}" to="/all">所有任务</router-link>
			<router-link :class="{'active': $route.path === '/unfinished'}" to="/unfinished">未完成的任务</router-link>
			<router-link :class="{'active': $route.path === '/finished'}" to="/finished">完成的任务</router-link>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			}
		}
	}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
	.task-count
		display flex
		margin 10px 0
		li
			padding-left 10px
			color #dd4b39
			&:nth-child(1)
				padding 5px 0 0 10px
			&.action
				flex 1
				text-align center
				display flex
				a
					margin 0px 10px
					flex 1
					padding 5px 0
					color #777
					&.active
						border 1px solid rgba(175, 47, 47, 0.2)
					&:nth-child(3)
						margin-right 0
</style>