<template>
	<ul class="todo-list">
		<li class="todo"
				v-for="(item, index) in filterList"
				:key="index"
				:class="{'completed': item.isChecked, 'editing': item === editorTodo}"
		>
			<div class="view">
				<input class="toggle" type="checkbox" v-model="item.isChecked" />
				<label @dblclick="editTodo(item)">{{item.title}}</label>
				<button class="destroy" @click="deleteTodo(index)"></button>
			</div>
			<input 
				type="text"
				class="edit"
				v-model="item.title"
				v-focus="editorTodo === item"
				@blur="editedTodo"
				@keyup.enter="editedTodo"
				@keyup.esc="cancelTodo(item)"
			/>
		</li>
	</ul>
</template>

<script>
	export default {
		data () {
			return {}
		},
		props: {
			'filterList': {
				type: Array
			},
			'editorTodo': {
				type: Object
			}
		},
		methods: {
			deleteTodo (index) {
				this.$emit('deleteItem', index)
			},
			editTodo (item) {
				this.$emit('editItem', item)
			},
			editedTodo (item) {
				this.$emit('editedItem', item)
			},
			cancelTodo (item) {
				this.$emit('cancelItem', item)
			}
		},
		directives: {
			'focus': {
				update (el, binding) {
					if (binding.value) {
						el.focus()
					}
				}
			}
		}
	}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
	.todo-list
		li
			position relative
			font-size 16px
			border-bottom 1px solid #ededed
			.toggle
				text-align center
				width 40px
				/* auto, since non-WebKit browsers doesn't support input styling */
				height auto
				position absolute
				top 5px
				bottom 0
				margin auto 0
				border none
				outline none
				/* Mobile Safari */
				-webkit-appearance none
				appearance none
				&:after
					content url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='40' fill='none' stroke='#ededed' stroke-width='3'/></svg>")
				&:checked
					&:after
						content url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='40' fill='none' stroke='#bddad5' stroke-width='3'/><path fill='#5dc2af' d='M72 25L42 71 27 56l-4 4 20 20 34-52z'/></svg>")
			&:hover
				background-color #fafafa
				.destroy
					display block
			&.editing
				border-bottom none
				padding 0
				.edit
					display block
					width 506px
					padding 13px 17px 12px 17px
					margin 0 0 0 43px
				.view
					display none
				&:last-child
					margin-bottom -1px
			label
				white-space pre-line
				word-break break-all
				padding 15px 60px 15px 15px
				margin-left 45px
				display block
				height 18px
				line-height 18px
				transition color 0.4s
			&.completed
				label
					color #d9d9d9
					text-decoration line-through
			.destroy
				display none
				position absolute
				top 2px
				right 10px
				bottom 0
				width 40px
				height 40px
				margin auto 0
				font-size 30px
				color #cc9a9a
				transition color 0.2s ease-out
				&:hover
					color #af5b5e
				&:after
					content '×'
			.edit
				display none
</style>