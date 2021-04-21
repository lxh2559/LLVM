import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		server: 'http://47.243.14.42:9090/',
		// server: 'http://127.0.0.1:9090/',
		type: '.c',
		error: 0,
		root: {},
		pre: '',
		post: '',
		list: [
			{label: '语法树生成', name: 'first', disabled: false},
			{label: '中间代码生成', name: 'second', disabled: true},
			{label: '中间代码优化', name: 'third', disabled: true},
		],
		bt: [
			{loading: false, text: '生成'},
			{loading: false, text: '生成'},
			{loading: false, text: '优化'},
		],
		first: 0,
		display: false,
		second: 0,
		third: 0,
		code: '#include<stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}',
	},
	mutations: {
		initTabs(state) {
			state.list[1].disabled = true;
			state.list[2].disabled = true;
		},
		Doing(state, n) {
			state.bt[n].loading = true;
			if(n != 2)
				state.bt[n].text = '生成中';
			else
				state.bt[n].text = '优化中';
		},
		Done(state, n) {
			state.bt[n].loading = false;
			if(n != 2)
				state.bt[n].text = '生成';
			else
				state.bt[n].text = '优化';
		}
	},
	actions: {
	},
	modules: {
	}
})
