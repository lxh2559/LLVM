<template>
    <div>
        <textarea v-model="this.$store.state.pre" id="pre" readonly="readonly"></textarea>
        <textarea v-model="this.$store.state.post" id="post" readonly="readonly"></textarea>
    </div>
</template>

<script>
export default {
    name: 'third',
    data() {
        return {

        };
    },
    methods: {
        postData() {
            this.axios.post(this.$store.state.server + 'codeOpt', {
                type: this.$store.state.type,
            })
            .then(response => {
                if(response.data.match(/error.*/) == null) {
                    this.$store.state.post = response.data;
                    this.$store.commit('Done', 2);
                }
                else {
                    this.$store.commit('Done', 2);
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
        this.$store.state.second = 0;
        if(this.$store.state.list[2].disabled) 
            this.$router.push({name: 'first'});
    },
    watch: {
        $route : function(to) {
            if(to.name == 'third' && this.$store.state.second) {
                this.$store.state.second = 0;
                this.$store.state.post = '';
            }
        },
        'Third': function(){
            this.postData();
        }
    },
    computed: {
        Third() {
            return this.$store.state.third;
        }
    }
}
</script>

<style scoped>
#pre{
    position: absolute;
    top: 100px;
    left: 140px;
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

#pre:hover {
    border: 1px solid #ddd;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}

#post{
    position: absolute;
    top: 100px;
    right: 140px;
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

#post:hover {
    border: 1px solid #ddd;
    box-shadow: 0px 2px 12px 0px rgb(0,0,0,0.1);
}
</style>