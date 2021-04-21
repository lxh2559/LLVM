<template>
    <el-scrollbar style="height: 100%; width: 100%;" ref="scroll" :native="false">
        <div :id="`${treeid}`"></div>
    </el-scrollbar>  
</template>
<script>
import * as d3 from 'd3'

export default {
    name: 'Tree',
    props: ['treeid', 'content', 'change'],
    data() {
        return {
            option: {
                width: 1600,
                height: 800,
                nodeWidth: 122,
                nodeHeight: 35,
                fontSize: 12
            },
        };
    },
    methods: {
        render() {
            this.astTree("#" + this.treeid);
            this.$refs.scroll.wrap.scrollLeft = 400;
        },
        astTree(selector) {  

            const that = this.option;
            const content = this.content;

            d3.select("svg").remove();

            this.svg = d3.select(selector).append("svg")
                .attr("width", that.width)
                .attr("height", that.height)
                .append("g")
                .attr("transform", "translate(-90, 20)");

            this.tree = d3.tree()
                .size([that.width + 80, that.height - 120])
                .separation(function(a, b) {
                    return (a.parent == b.parent ? 1 : 1);  //间隔
                });    
                
            var hierarchyData = d3.hierarchy(JSON.parse(JSON.stringify(this.$store.state.root))).sum(function(d) {
                return d.value;
            });
            var treeData = this.tree(hierarchyData);
            var nodes = treeData.descendants();
            var links = treeData.links();             

            this.svg.selectAll(".link")
                .data(links)
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("d", function(d) {
                    return "M" + (d.source.x + that.nodeWidth / 2) + " " + (d.source.y + that.nodeHeight) 
                        + "L" + (d.target.x + that.nodeWidth / 2) + " " + d.target.y;
                })
                .attr("style",function(){
                    return "stroke: #000; fill: none; stroke-width: .5px;"
                });
            
            //node distribtion
            var node = this.svg.selectAll(".node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", function(d) { 
                    return "translate(" + d.x + "," + d.y + ")"; 
                })
                .attr("style",function(){
                    return "font-size: " + that.fontSize + "px; font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB"
                })    
                .attr("click",0);

            //node
            node.append("rect")
                .attr("width",that.nodeWidth)
                .attr("height",that.nodeHeight)
                .attr("style", function(){
                    return "fill: #fff; stroke: #808080; stroke-width: .5px; rx: 4;"
                })
                .on("mouseover", function() {
                    d3.select(this).attr("style", function(){
                        return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this.parentElement.lastElementChild).style("fill","#202020")
                })
                .on("mousedown", function() {
                    d3.select(this).attr("style", function(){
                        return "fill: #e8e8e8; stroke: #000; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this.parentElement.lastElementChild).style("fill","#000")
                })
                .on("mouseup", function() {
                    d3.select(this).attr("style", function(){
                        return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this.parentElement.lastElementChild).style("fill","#202020")
                })
                .on("mouseout", function() {
                    if(this.parentElement.attributes["click"].value == 0) {
                        d3.select(this).attr("style", function(){
                            return "fill: #fff; stroke: #808080; stroke-width: .5px; rx: 4;"
                        });
                        d3.select(this.parentElement.lastElementChild).style("fill","#404040")
                    }
                    else {
                        d3.select(this).attr("style", function(){
                            return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                        });
                        d3.select(this.parentElement.lastElementChild).style("fill","#202020")
                    }
                })
                .on("click", function() {
                    for(var i = 0; i < node._groups[0].length; i++) {
                        if(node._groups[0][i] == this.parentElement) {
                            node._groups[0][i].attributes["click"].value = 1;
                        }
                        else {
                            if(node._groups[0][i].attributes["click"].value == 1) {
                                node._groups[0][i].attributes["click"].value = 0;
                                d3.select(node._groups[0][i].firstElementChild).attr("style", function(){
                                    return "fill: #fff; stroke: #808080; stroke-width: .5px; rx: 4;"
                                });
                                d3.select(node._groups[0][i].lastElementChild).style("fill","#404040")
                            }
                        }
                    }
                    var obj = document.getElementById(content);
                    obj.style.display = 'block';
                    obj.innerText = this.parentElement.lastElementChild.innerHTML + '\n'
                                    + this.parentElement.lastElementChild.attributes["address"].value + '\n'
                                    + this.parentElement.lastElementChild.attributes["remark"].value;
                });

            //name
            node.append("text")
                .attr("dx", that.nodeWidth / 2)
                .attr("dy", that.nodeHeight / 2 + 3)
                .attr("address", function(d) {return d.data.address})
                .attr("remark", function(d) {return d.data.remark})
                .style("text-anchor", function() { 
                    return "middle";
                })
                .style("fill","#404040")
                .style("user-select", "none")
                .text(function(d) {return d.data.name})
                .on("mouseover", function() {
                    d3.select(this.parentElement.firstElementChild).attr("style", function(){
                        return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this).style("fill","#202020")
                })
                .on("mousedown", function() {
                    d3.select(this.parentElement.firstElementChild).attr("style", function(){
                        return "fill: #e8e8e8; stroke: #000; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this).style("fill","#000")
                })
                .on("mouseup", function() {
                    d3.select(this.parentElement.firstElementChild).attr("style", function(){
                        return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                    });
                    d3.select(this).style("fill","#202020")
                })
                .on("mouseout", function() {
                    if(this.parentElement.attributes["click"].value == 0) {
                        d3.select(this.parentElement.firstElementChild).attr("style", function(){
                            return "fill: #fff; stroke: #808080; stroke-width: .5px; rx: 4;"
                        });
                        d3.select(this).style("fill","#404040")
                    }
                    else {
                        d3.select(this.parentElement.firstElementChild).attr("style", function(){
                            return "fill: #f3f3f3; stroke: #101010; stroke-width: .5px; rx: 4;"
                        });
                        d3.select(this).style("fill","#202020")
                    }
                })
                .on("click", function() {
                    for(var i = 0; i < node._groups[0].length; i++) {
                        if(node._groups[0][i] == this.parentElement) {
                            node._groups[0][i].attributes["click"].value = 1;
                        }
                        else {
                            if(node._groups[0][i].attributes["click"].value == 1) {
                                node._groups[0][i].attributes["click"].value = 0;
                                d3.select(node._groups[0][i].firstElementChild).attr("style", function(){
                                    return "fill: #fff; stroke: #808080; stroke-width: .5px; rx: 4;"
                                });
                                d3.select(node._groups[0][i].lastElementChild).style("fill","#404040")
                            }
                        }
                    }
                    var obj = document.getElementById(content);
                    obj.style.display = 'block';
                    obj.innerText = this.parentElement.lastElementChild.innerHTML + '\n'
                                    + this.parentElement.lastElementChild.attributes["address"].value + '\n'
                                    + this.parentElement.lastElementChild.attributes["remark"].value;
                });
        },
    },
    mounted() {
        this.render();
    },
    watch: {
        change: function() {
            this.render();
        },
        $route: function(to) {
            if(to.name != 'third')
                this.$refs.scroll.wrap.scrollLeft = 400;
        }
    },
}
</script>
<style scoped>
/deep/ .el-scrollbar__wrap{
    height: 617px !important; 
}
</style>