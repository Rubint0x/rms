import axios from 'axios'
import Vue from 'vue'

import {Button,Input,Select} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Select)

var Student = new Vue({
    el:"#student",
    render:h=>h(Student),
    data:{
        isif:false
    },
    methods:{
        test:function(){
            //调通
            this.isif=!this.isif;
        }
    }
})


var add = new Vue({
    el:"#add",
    data:{
        add_show:false,
    },
    methods:{
        add_student:function(){
            if(this.add_show==false)
            {
                this.add_show=!this.add_show;
            }
            
        },
        post_add:function(){
            this.add_show = false;

        }
    }
})