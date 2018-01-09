import Vue from 'vue'
import Router from 'vue-router'
import Todo from '@/components/Todo/Todo'

import '@/assets/style/base.styl'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/all'
		},
		{
			path: '/all',
			component: Todo
		},
		{
			path: '/unfinished',
			component: Todo
		},
		{
			path: '/finished',
			component: Todo
		}
	]
})
