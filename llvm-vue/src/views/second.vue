<template>
    <div>
        <div id="Tree2">
            <i id="i2" class="el-icon-close" ref="i2" @mouseover="overi()" @mouseout="outi()" @click="click()"></i>
            <div id="text2" ref="text2" @mouseover="over()" @mouseout="out()"></div>
            <div style="width: 800px; height: 554px;">
                <Tree treeid="ast2" content="text2" :change="change"></Tree>
            </div>
        </div>
        <textarea v-model="this.$store.state.pre" readonly="readonly"></textarea>
    </div>
</template>

<script>
import Tree from '../components/Tree.vue'
export default {
    name: 'second',
    components: {
        Tree,
    },
    data() {
        return {
            change: 0,
        };
    },
    methods: {
        over() {
            this.$refs.i2.style.display = 'block';
        },
        out() {
            this.$refs.i2.style.display = 'none';
        },
        overi() {
            this.$refs.i2.style.display = 'block';
            this.$refs.i2.style.color = '#409EFF';
        },
        outi() {
            this.$refs.i2.style.color = '#606266';
        },
        click() {
            this.$refs.i2.style.display = 'none';
            this.$refs.text2.style.display = 'none';
        },
        postData() {
            this.axios.post(this.$store.state.server + 'codeGen', {
                type: this.$store.state.type,
            })
            .then(response => {
                if(response.data.match(/error.*/) == null) {
                    this.$store.state.pre = response.data;
                    this.$store.commit('Done', 1);
                    this.$store.state.list[2].disabled = false;
                }
                else {
                    this.$store.commit('Done', 1);
                    this.$alert('出错了，请检查后重新尝试！','ERROR', {
                        confirmButtonText: '确定',
                    });
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        },
    },
    mounted() {
        this.$store.state.first = 0;
        if(this.$store.state.list[1].disabled) 
            this.$router.push({name: 'first'});
    },
    watch: {
        $route : function(to) {
            if(to.name == 'second' && this.$store.state.first) {
                this.$store.state.first = 0;
                this.change++;
                this.$store.state.pre = '';
            }
        },
        'Second': function() {
            if(this.$router.history.current.name == 'second') {
                this.postData();
            }
        }
    },
    computed: {
        Second() {
            return this.$store.state.second;
        }
    }
}
</script>

<style scoped>
#Tree2 {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 800px;
    height: 554px; 
    border: 1px solid #eee;
    border-radius: 4px;
}

#Tree2:hover{
    border: 1px solid #ddd;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

#i2 {
    position: absolute;
    display: none;
    top: 6px;
    left: 266px;
    z-index: 2;
}

#text2 {
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

textarea{
    position: absolute;
    top: 100px;
    right: 50px;
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
    border: 1px solid #ddd;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}
</style>