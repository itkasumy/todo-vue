<template>
  <div>
		<nav-header></nav-header>
    <div class="main">
			<task-title :title="addTask"></task-title>
			<input 
				placeholder="例如: 吃饭睡觉打豆豆;    提示: +回车即可添加任务" 
				class="task-input" 
				type="text"
				v-model="todo"
				v-on:keyup.enter="addTsk"
			/>
			<task-count v-show="list.length" :list="list"></task-count>
			<task-title :title="taskList"></task-title>
			<div class="tasks">
				<span class="no-task-tip" v-show="!list.length">还没有添加任何任务</span>
				<todo-list
					:filterList="filterList"
					@deleteItem="deleteTodoList"
					@editItem="editTodo"
					:editorTodo="editorTodo"
					@editedItem="editedTodoItem"
					@cancelItem="cancelTodoItem"
				></todo-list>
			</div>
    </div>
	</div>
</template>

<script>
	import NavHeader from 'components/NavHeader/NavHeader'
	import TaskTitle from 'components/TaskTitle/TaskTitle'
	import TaskCount from 'components/TaskCount/TaskCount'
	import TodoList from 'components/TodoList/TodoList'

	const store = {
		save (key, value) {
			localStorage.setItem(key, JSON.stringify(value))
		},
		fetch (key) {
			return JSON.parse(localStorage.getItem(key)) || []
		}
	}

	export default {
		data () {
			return {
				addTask: '添加任务:',
				taskList: '任务列表:',
				list: store.fetch('todolist'),
				todo: '',
				editorTodo: null,
				beforeTitle: '',
				show: 'all'
			}
		},
		components: {
			NavHeader,
			TaskTitle,
			TaskCount,
			TodoList
		},
		methods: {
			addTsk () {
				this.list.push({
					title: this.todo,
					isChecked: false
				})
				this.todo = ''
			},
			deleteTodoList (index) {
				this.list.splice(index, 1)
			},
			editTodo (item) {
				this.beforeTitle = item.title
				this.editorTodo = item
			},
			editedTodoItem (item) {
				this.editorTodo = null
			},
			cancelTodoItem (item) {
				item.title = this.beforeTitle
				this.editorTodo = null
			}
		},
		watch: {
			// list: function () {
			// 	store.save('todolist', this.list)
			// }
			list: {
				handler: function () {
					store.save('todolist', this.list)
				},
				deep: true
			}
		},
		computed: {
			filterList: function () {
				this.show = this.$route.path.slice(1)
				return this.show === 'all' ? this.list : this.show === 'unfinished' ? this.list.filter(item => {
					return !item.isChecked
				}) : this.list.filter(item => {
					return item.isChecked
				})
			}
		}
	}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
	.main
		width 50%
		margin 0px auto
		box-sizing border-box
		input
			padding-left 12px
		.task-input
			width 99%
			height 30px
			outline 0
			border 1px solid #ccc
		.tasks
			background-color #fff
			.no-task-tip
				padding 10px 0 10px 10px
				display block
				border-bottom 1px solid #ededed
				color #777
</style>