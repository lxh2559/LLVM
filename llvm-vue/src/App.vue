<template>
    <div id="app">
		<el-tabs v-model="activeName" @tab-click="tabClick">
			<el-tab-pane v-for="(item, index) in this.$store.state.list" :key="index" 
				:label="item.label" :name="item.name" :disabled="item.disabled">
			</el-tab-pane>
		</el-tabs>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<el-select v-show="bt['first']" v-model="value" :popper-append-to-body="false" popper-class="lxh-popper">
			<el-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
			</el-option>
		</el-select>
		<el-upload v-show="bt['first']" class="upload-demo" action="#" ref="upload" 
			:accept="this.acceptions[this.value]" :limit="1" 
			:auto-upload="false" :on-change="onUpload" :on-exceed="onExceed">
			<el-button  id="upload" type="primary">点击上传</el-button>
		</el-upload>
		<el-button v-show="bt['first']" id="bt1" type="primary" @click="bt1" 
		:loading="this.$store.state.bt[0].loading">{{this.$store.state.bt[0].text}}</el-button>
		<el-button v-show="bt['second']" id="bt2" type="primary" @click="bt2"
		:loading="this.$store.state.bt[1].loading">{{this.$store.state.bt[1].text}}</el-button>
		<el-button v-show="bt['third']" id="bt3" type="primary" @click="bt3"
		:loading="this.$store.state.bt[2].loading">{{this.$store.state.bt[2].text}}</el-button>
    </div>
</template>

<script>

export default {
	name: 'app',
	data() {
		return {
			activeName: 'first',
			options: [
				{value: '0', label: 'C'},
				{value: '1', label: 'C++'},
			],
			value: '0',
			acceptions: ['.c', '.cpp'],
			bt: {
				first: true,
				second: false,
				third: false,
			},
		};
	},
	methods: {
		tabClick(tab) {
			this.$router.push({name: tab.name});
		},
		onUpload(file) {
			const reader = new FileReader();
			reader.onload = () => this.$store.state.code = reader.result;
			reader.readAsText(file.raw);
		},
		onExceed(file) {
			this.$refs.upload.clearFiles();
			setTimeout(() => {
				this.$refs.upload.handleStart(file[0])
			}, 845);
		},
		bt1() {
			this.$store.commit('initTabs');
			this.$store.commit('Doing', 0);
			this.$store.state.display = false;
			this.$store.state.first++;
		},
		bt2() {
			this.$store.state.list[2].disabled = true;
			this.$store.commit('Doing', 1);
			this.$store.state.pre = '';
			this.$store.state.second++;
		},
		bt3() {
			this.$store.commit('Doing', 2);
			this.$store.state.post = '';
			this.$store.state.third++;
		},
	},
	watch: {
		$route: function() {
			this.activeName = this.$router.history.current.name;
			for(var i in this.bt) {
				if(i == this.activeName)
					this.bt[i] = true;
				else
					this.bt[i] = false;
			}
		},
		value: function() {
			this.$store.state.type = this.acceptions[this.value];
		}
	}
}
</script>

<style scoped>
#upload {
	position: absolute;
	top: 28px;
	left: 58.25%;
	margin: 0px;
	width: 150px;
	font-size: 16px;
}

#bt1, #bt2, #bt3 {
	position: absolute;
	top: 28px;
	left: 78%;
	margin: 0px;
	width: 150px;
	font-size: 16px;
}

#upload:hover, #bt1:hover, #bt2:hover, #bt3:hover {
	box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

#upload:focus:not(#upload:hover), #bt1:focus:not(#bt1:hover), #bt2:focus:not(#bt2:hover), #bt3:focus:not(#bt3:hover) {
	background-color: #409EFF;
	border-color: #409EFF;
}

.el-tabs {
    position: absolute;
    margin: auto;
    top: 30px;
    left: 0;
    right: 0;
    width: 1200px;
}

/deep/ .el-tabs__item {
    margin-bottom: 10px;
    padding-left: 40px !important; 
    padding-right: 40px !important;
    font-size: 18px;
}

/deep/ .el-tabs__item:focus.is-active.is-focus:not(:active){
    box-shadow: none;
    border-radius: 0;
}

.el-select {
	position: absolute;
	top: 29px;
	left: 49.75%;
	width: 115px;
}

/deep/ .lxh-popper {
	margin-top: 8px !important;
}

/deep/ .el-upload-list {
	position: absolute;
	top: 34px;
	left: 68.40%;
	width: 140px;
}

/deep/ .el-upload-list__item{
	outline: none;
}
</style>
