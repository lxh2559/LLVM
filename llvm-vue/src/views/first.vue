<template>
    <div>
        <textarea v-model="code" ref="el" @keydown.tab="forbid($event)" @keyup.tab="replace()"></textarea>
        <div id="Tree1">
            <i id="i1" class="el-icon-close" ref="i1" @mouseover="overi()" @mouseout="outi()" @click="click()"></i>
            <div id="text1" ref="text1" @mouseover="over()" @mouseout="out()"></div>
            <div style="width: 800px; height: 554px;">
                <Tree v-if="this.$store.state.display" treeid="ast1" content="text1"></Tree>
            </div>
        </div>
    </div>
</template>

<script>
import Tree from "../components/Tree.vue"
export default {
    name: 'first',
    components: {
        Tree,
    },
    data() {
        return {
            code: this.$store.state.code,
        };
    },
    methods: {
        forbid(e) {
            e.preventDefault();
        },
        replace() {
            var start = this.$refs.el.selectionStart;
            var end = this.$refs.el.selectionEnd;
            this.$refs.el.value = this.$refs.el.value.substring(0, start) 
                + '    ' + this.$refs.el.value.substring(end);
            this.$refs.el.selectionStart = this.$refs.el.selectionEnd = start + 4;
        },
        over() {
            this.$refs.i1.style.display = 'block';
        },
        out() {
            this.$refs.i1.style.display = 'none';
        },
        overi() {
            this.$refs.i1.style.display = 'block';
            this.$refs.i1.style.color = '#409EFF';
        },
        outi() {
            this.$refs.i1.style.color = '#606266';
        },
        click() {
            this.$refs.i1.style.display = 'none';
            this.$refs.text1.style.display = 'none';
        },
        postData() {
			this.axios.post(this.$store.state.server + 'astGen', {
				code: this.code,
                type: this.$store.state.type,
			})
            .then(response => {
                if(String(response.data).match(/error.*/) == null) {
                    this.$store.state.root = response.data;
                    this.$store.commit('Done', 0);
                    this.$store.state.display = true;
                    this.$store.state.list[1].disabled = false;
                }
                else {
                    this.$store.commit('Done', 0);
                    this.$alert('出错了，请检查后重新尝试！','ERROR', {
                        confirmButtonText: '确定',
                    });
                }
            })
			.catch(function(error) {
				console.log(error);
			});
		}
    },
    watch: {
        code: function() {
            this.$refs.i1.style.display = 'none';
            this.$refs.text1.style.display = 'none';
			this.$store.commit('initTabs');
            this.$store.state.display = false;
        },
        'First': function() {
            if(this.$router.history.current.name == 'first') {
                this.$refs.i1.style.display = 'none';
                this.$refs.text1.style.display = 'none';
                this.postData();
            }
        },
        'Code': function(code) {
            this.code = code;
        },
    },
    computed: {
        First() {
            return this.$store.state.first;
        },
        Code() {
            return this.$store.state.code;
        },
    }
}
</script>

<style scoped>
textarea {
    position: absolute;
    top: 100px;
    left: 50px;
    padding: 12px 18px;
    width: 550px;
    height: 530px;
    font-family: Consolas,Courier,monospace;
    font-size: 14px;
    line-height: 1.3;
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    resize: none;
}

textarea:hover {
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

textarea:focus {
    background-color: #f7f7f7;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

#Tree1 {
    position: absolute;
    top: 100px;
    right: 50px;
    width: 800px;
    height: 554px; 
    border: 1px solid #eee;
    border-radius: 4px;
}

#Tree1:hover {
    border: 1px solid #ddd;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

#i1 {
    position: absolute;
    display: none;
    top: 6px;
    left: 266px;
    z-index: 2;
}

#text1 {
    position: absolute;
    display: none;
    width: 250px;
    height: 64px;
    padding: 18px 20px;
    font-family: Consolas,Courier,monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #fff;
    border: solid #eee;
    border-width: 0px 1px 1px 0px;
    border-radius: 4px;
    z-index: 1;
}
</style>