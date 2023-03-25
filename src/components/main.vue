<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
<template>
    <div class="layout">

        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu active-key="1-2" theme="dark" width="auto" :open-keys="['1']">
                    <div class="layout-logo-left"></div>
                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-select"></Icon>
                            增删改查
                        </template>
                        <Menu-item key="1-1" @click.native="select1(1)">管理</Menu-item>
                        <Menu-item key="1-2" @click.native="select2(1)">图表</Menu-item>
                        <Menu-item key="1-3" @click.native="select_table(1)">桌台管理</Menu-item>
                        <Menu-item key="1-4" @click.native="select_order(1)">订单管理</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <!-- 登录界面 -->
                <Modal v-model="notLogin" name="" title="登录" 
                :on-text="登录" :closable="false"  :mask-closable="false">
               <div slot="footer">
                    <Button type="primary" size="large" @click="loginCheck">确定</Button>
                </div>

                    <Form :model="logInfo" label-position="left" :label-width="100">
                        <FormItem label="用户名">
                            <Input v-model="logInfo.name"></Input>
                        </FormItem>
                        <FormItem label="密码">
                            <Input v-model="logInfo.password"></Input>
                        </FormItem>
                        
                    </Form>
                </Modal>
                <div class="layout-content">
                    <div id="test">
                        <div v-if="test1">
                            <i-button type="info" @click.native="select_student">查询</i-button>
                            <i-button type="success" @click="showadd">新增</i-button>
                            <br>
                            <i-table width="800" border :columns="columns2" :data="data_student" v-if="selected">
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="modal1" name="" title="新增" @on-ok="ok" @on-cancel="cancel">
                                <Form :model="formLeft" label-position="left" :label-width="100">
                                    <FormItem label="类型">
                                        <Input v-model="formLeft.city"></Input>
                                    </FormItem>
                                    <FormItem label="名字">
                                        <Input v-model="formLeft.name"></Input>
                                    </FormItem>
                                </Form>
                                
                                <Form :model="formTop" label-position="top">
                                    <!-- <FormItem label="地区">
                                        <Input v-model="formTop.area"></Input>
                                    </FormItem>
                                    <FormItem label="地址">
                                        <Input v-model="formTop.address"></Input>
                                    </FormItem> -->
                                    <FormItem label="价格">
                                        <Input v-model="formTop.price"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="delete_modal" name="" title="删除"  @on-ok="check_delete" @on-cancel="deletecancel">
                                要删除的人为【{{student_name}}】
                                是否确定要删除？
                            </Modal>
                            <Modal v-model="update_modal" name="" title="修改"  @on-ok="check_update" @on-cancel="cancel">
                                <Form :model="formLeft" label-position="left" :label-width="100">
                                    <FormItem label="姓名">
                                        <Input v-model="formLeft.name"></Input>
                                    </FormItem>
                                    <FormItem label="年龄">
                                        <Input v-model="formLeft.age"></Input>
                                    </FormItem>
                                    <FormItem label="城市">
                                        <Input v-model="formLeft.city"></Input>
                                    </FormItem>
                                </Form>
                                
                                <Form :model="formTop" label-position="top">
                                    <FormItem label="地区">
                                        <Input v-model="formTop.area"></Input>
                                    </FormItem>
                                    <FormItem label="地址">
                                        <Input v-model="formTop.address"></Input>
                                    </FormItem>
                                    <FormItem label="邮箱">
                                        <Input v-model="formTop.mail"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            
                            
                        </div>
                        
                        <div v-if="test2">
                            hello2
                            
                        </div>
                        <div v-if="test3">    <!-- 桌台管理 -->
                            <i-button type="success" @click="table_add">新增</i-button>
                            <i-button type="info" @click.native="table_del">删除</i-button>
                            <br>
                            <i-table width="800" border :columns="columns1" :data="data_table" > 
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="modal_1" name="" title="新增" @on-ok="check_table_add" >
                                <Form :model="table_da" label-position="left" :label-width="100">
                                    <FormItem label="桌号">
                                        <Input v-model="table_da.t_id"></Input>
                                    </FormItem>
                                    <FormItem label="桌子类型">
                                        <Input v-model="table_da.type"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="modal_2" name="" title="删除" @on-ok="check_table_del" >
                                <Form :model="table_da" label-position="left" :label-width="100">
                                    <FormItem label="桌号">
                                        <Input v-model="table_da.t_id"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="table_open" name="" title="开台"  @on-ok="check_open_table" >
                                是否开台编号为【{{table_id}}】的【{{table_type}}】
                                <Form   label-position="left" :label-width="100">
                                    <FormItem label="订单号"   >
                                        <Input v-model="order_id" placeholder="请输入订单号"></Input>
                                    </FormItem>
                                    
                                </Form>
                            </Modal>
                            <Modal v-model="table_over" name="" title="结账"  @on-ok="check_over_table" >
                                是否结账编号为【{{table_id}}】的【{{table_type}}】
                
                            </Modal>
                        </div>
                        <div v-if="test4">    <!-- 订单管理 -->
                            <br>
                            <i-table width="800" border :columns="columns2" :data="data_order" > 
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="modal4_1" name="" title="删除" @on-ok="check_table_del" >
                                <Form :model="table_da" label-position="left" :label-width="100">
                                    <FormItem label="桌号">
                                        <Input v-model="table_da.t_id"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="modal4_3" name="" title="订单"  >
                                <i-table width="302" border :columns="columns3" :data="data_order_detail" > 
                                    <i-tab></i-tab>
                                </i-table>
                            </Modal>
                            <Modal v-model="modal4_4" name="" title="结账"  @on-ok="check_over_order" >
                                是否结账订单号为【{{order_id}}】的订单？
                
                            </Modal>
                        </div>
                    </div>
                </div>
                <div class="layout-copy">
                    2023 &copy; 吕川，林壮豪，曾卓楠，颜智森
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import axios from 'axios'
import mymodal from './modal'
axios.defaults.baseURL="http://127.0.0.1:3000";
axios.defaults.withCredentials = false;
export default {
    data: function(){
        return{
            currentIndex:-1,
            notLogin:true,
            student_name:"",
            order_id:"",
            table_type:"",
            delete_modal:false,
            update_modal:false,
            test1: false,
            test2: false,
            test3: false,
            test4: false,
            modal_1:false,
            modal4_1:false,
            modal4_2:false,
            modal4_3:false,
            modal4_4:false,
            table_open:false,//开台flag
            menu_select:false,//点餐flag
            selected:null,
            table:null,
            // columns2: [
            //     {
            //         title: '姓名',
            //         key: 'name',
            //         width: 100,
            //         fixed: 'left'
            //     },
            //     {
            //         title: '年龄',
            //         key: 'age',
            //         width: 100
            //     },
            //     {
            //         title: '城市',
            //         key: 'province',
            //         width: 100
            //     },
            //     {
            //         title: '地区',
            //         key: 'city',
            //         width: 100
            //     },
            //     {
            //         title: '地址',
            //         key: 'address',
            //         width: 200
            //     },
            //     {
            //         title: '邮箱',
            //         key: 'zip',
            //         width: 100
            //     },
            //     {
            //         title: '操作',
            //         key: 'action',
            //         fixed: 'right',
            //         width: 120,
            //         render: (h, params) => {
            //                 return h('div', [
            //                     h('Button', {
            //                         props: {
            //                             type: 'warning',
            //                             size: 'small'
            //                         },
            //                         on: {
            //                             click :()=>{
            //                                 this.change(params.index);
            //                             }
            //                         }
            //                     }, '修改'),
            //                     h('Button', {
            //                         props: {
            //                             type: 'error',
            //                             size: 'small'
            //                         },
            //                         on: {
            //                             click :()=>{
            //                                 this.delete(params.index);
            //                             }
            //                         }
            //                     }, '删除')
            //                 ]);
            //             }
            //     }
            // ],
            columns1: [  //表格格式
                {
                    title: '桌号',
                    key: 't_id',
                    width: 100,
                    fixed: 'left',
                    align: 'center'
                },
                {
                    title: '桌子类型',
                    key: 'type',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'state',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '功能',
                    key: 'state',
                    width: 140,
                    align: 'center',
                    render: (h, params) => {
                        if(this.data_table[params.index].state === '空闲'){
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.open_table(params.index);
                                        }
                                    }
                                }, '开台')
                            ]);
                        }else{
                        }
                            
                        }
                }
            ],
            columns2: [  //表格格式
                {
                    title: '订单号',
                    key: 'o_id',
                    width: 100,
                    fixed: 'left',
                    align: 'center'
                },
                {
                    title: '桌号',
                    key: 't_id',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '订单时间',
                    key: 'date',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '订单金额',
                    key: 'sum',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '订单状态',
                    key: 'statue',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '功能',
                    key: 'state',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        if(this.data_order[params.index].statue === '已结账'){
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.get_order_detail(params.index);
                                        }
                                    }
                                }, '账单')
                            ]);
                        }else{
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.change(params.index);
                                        }
                                    }
                                }, '点餐'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.order_over(params.index);
                                        }
                                    }
                                }, '结账'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.get_order_detail(params.index);
                                        }
                                    }
                                }, '账单')
                            ]);
                        }
                        }
                }
            ],
            columns3: [  //表格格式
                {
                    title: '菜品',
                    key: 'f_name',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'count',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '价格',
                    key: 'cost',
                    width: 100,
                    align: 'center'
                }
            ],
            data_table:[],
            data_order:[],
            data_student: [],
            data_order_detail:[],
            modal1:false,
            table_da:{
                t_id:'',
                type:'',
            },
            formLeft: {
                    name: '',
                    age: '',
                    city: ''
                },
            formTop: {
                area: '',
                address: '',
                mail: ''
            },
            logInfo:{
                name :'',
                password:'',
            }
            
            
        }
        
    },
    methods:{
        loginCheck:function(){
            axios.post("/rms/login",{
                name:this.logInfo.name,
                password:this.logInfo.password
            }).then((response) =>{
                    if(response.data == 0)
                    {
                        this.$Message.info("用户名或密码错误!");
                        this.notLogin = true;
                    }
                    if(response.data == 1)
                    {
                        this.$Message.info("普通用户，登陆成功!");
                        this.notLogin = false;
                    }
                    if(response.data == 2)
                    {
                        this.$Message.info("管理员，登陆成功!");
                        this.notLogin = false;
                    }
                }).catch(function(response){
                    this.$Message.info("系统错误!");
                    this.notLogin = true;
                })
        },
        select1:function(){
            this.test1 = !this.test1
            if(this.test2 == true)
            {
                this.test2 = false;
            }
            console.log("test1=",test1)
        },
        select2:function(){
            this.test2 = !this.test2
            if(this.test1 == true)
            {
                this.test1 = false;
            }
            console.log("test2=",test2)
        },
        select_table:function(){  //桌台管理
            this.test3 = true  //显示表格
            this.test1 = false
            this.test2 = false
            this.test4 = false
            axios.post("/rms/table_get",{
                name:this.logInfo.name,
                password:this.logInfo.password
            }).then((response) =>{
                console.log("tt2=",response.data)
                this.data_table.splice(0);                     //更新数据
                for(let i=0;i<response.data.length;i++)
                {
                    let resValue = {};
                    resValue.t_id = response.data[i].t_id;
                    resValue.type = response.data[i].type;
                    if(response.data[i].state){
                        resValue.state ='使用中'
                    }
                    else{
                        resValue.state ='空闲';
                    }
                    this.data_table.push(resValue);             //  
                }
                console.log("tt3=",this.data_table)
                }).catch(function(response){
                    this.$Message.info("系统错误!");
                    this.notLogin = true;
                })
        },
        table_add:function(){           //加桌子
            this.select_table();
            console.log("点击了新增");
            this.modal_1 = true;
            console.log('modal_1 = ',this.modal1);
        },
        check_table_add(){       
            axios.post('/rms/add_table',{
                name:this.table_da.t_id,
                type:this.table_da.type,
                }).then((response) =>{
                    console.log("返回值为",response);
                    this.select_table();
                    if(response.data ==0)
                    {
                        this.$Message.info('新建成功');
                        console.log("成功")
                    }
                    else
                    {
                        this.$Message.info('新建失败');
                    }
                    
                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        table_del:function(){        //删桌子
            this.select_table();
            console.log("点击了删除");
            this.modal_2 = true;
        },
        check_table_del(){
            axios.post('/rms/del_table',{
                name:this.table_da.t_id,
                }).then((response) =>{
                    console.log("返回值为",response);
                    this.select_table();
                    if(response.data ==0)
                    {
                        this.$Message.info('删除成功');
                        console.log("成功")
                    }
                    else
                    {
                        this.$Message.info('删除失败');
                    }
                    
                }).catch(function(response){
                    this.$Message.info("删除失败，系统错误！");
                })
        },
        open_table:function(index){
            this.table_open = true;
            this.currentIndex = index;
            let tid = this.data_table[index].t_id;
            let ttype = this.data_table[index].type;
            this.table_id = tid;
            this.table_type = ttype;
        },
        check_open_table:function(){
            let table = this.data_table[this.currentIndex].t_id;
            let name = this.order_id;
            console.log("要删除的名字为",name);
            axios.post('/rms/open_table',{
                name:name ,
                table:table
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                    this.select_table();
                }
                else {
                    this.$Message.info("删除出错");
                }
            }).catch(function (error){
                console.log(error);
            })
            
        },
        order_over:function(index){
            this.modal4_4 = true;
            this.currentIndex = index;
            let oid = this.data_order[index].o_id;
            this.order_id = oid;
        },
        check_over_order:function(){
            let name = this.data_order[this.currentIndex].o_id;
            let table = this.data_order[this.currentIndex].t_id;
            console.log("要删除的名字为",name);
            axios.post('/rms/over_order',{
                name:name ,
                table:table
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                    this.select_table();
                }
                else {
                    this.$Message.info("删除出错");
                }
            }).catch(function (error){
                console.log(error);
            })
            
        },
        select_order:function(){  //订单管理
            this.test4 = true
            this.test3 = false  
            this.test1 = false
            this.test2 = false
            this.data_order = [];
            axios.post("/rms/order_get",{
                name:this.logInfo.name,
                password:this.logInfo.password
                
            }).then((response) =>{
                console.log("tt6=",response.data)
                               //更新数据
                for(let i=0;i<response.data.length;i++)
                {
                    let resValue = {};
                    resValue.o_id = response.data[i].o_id;
                    resValue.t_id = response.data[i].t_id;
                    resValue.date = response.data[i].date;
                    resValue.sum = response.data[i].sum;
                    if(response.data[i].statue){
                        resValue.statue ='已结账'
                    }
                    else{
                        resValue.statue ='未结账';
                    }
                    this.data_order.push(resValue);             //  
                }
                console.log("tt3=",this.data_order)
                }).catch(function(response){
                    this.$Message.info("系统错误!");
                    this.notLogin = true;
                })
        },
        get_order_detail:function(index){  //订单详情
            this.data_order_detail = [];
            console.log('data_student = ',this.data_order[index].o_id);
            axios.post('/rms/get_order_detail',{
                name: this.data_order[index].o_id
            }).then( (response)=>{
                
                this.modal4_3 = true;
                for(let i=0;i<response.data.length;i++)
                {   
                    let resValue = {};
                    resValue.f_name = response.data[i].f_name;
                    resValue.count = response.data[i].count;
                    resValue.cost = response.data[i].cost;
                    this.data_order_detail.push(resValue);
                }
                
            }).catch(function (error){
                console.log(error);
            })
        },
        select_student:function(){
            console.log('/rms/select');
            this.data_student = [];
            let that = this;
            axios.get('/rms/select',{
            }).then( (response)=>{
                console.log('response = ',response.data);
                this.selected = true;
                for(let i=0;i<response.data.length;i++)
                {   
                    let resValue = {};
                    resValue.name = response.data[i].Name;
                    resValue.age = response.data[i].age;
                    resValue.address = response.data[i].address;
                    resValue.province = response.data[i].city;
                    resValue.city = response.data[i].area;
                    resValue.zip = response.data[i].mail;
                    this.data_student.push(resValue);
                }
                console.log('data_student = ',this.data_student);
            }).catch(function (error){
                console.log(error);
            })
        },
        ok () {
            axios.post('/rms/add_food',{
                
                name:this.formLeft.name,
                age:this.formLeft.age,
                city:this.formLeft.city,
                area:this.formTop.area,
                address:this.formTop.address,
                mail:this.formTop.mail
                }).then((response) =>{
                    console.log("返回值为",response);
                    this.select_student();
                    if(response.data ==0)
                    {
                        this.$Message.info('新建成功');
                        console.log("成功")
                    }
                    else
                    {
                        this.$Message.info('新建失败');
                    }
                    
                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
            },
        cancel () {
            this.$Message.info('取消提交');
        },
        showadd:function(){
            this.select_student();
            console.log("点击了新增");
            this.modal1 = true;
            console.log('modal1 = ',this.modal1);
        },
        change:function(index){
            console.log("点击了修改按钮 index = ",index);
            this.currentIndex = index;
            this.update_modal = true;
            this.formLeft.name  = this.data_student[this.currentIndex].name;
            this.formLeft.age = this.data_student[this.currentIndex].age;
            this.formLeft.city  =  this.data_student[this.currentIndex].city;
            this.formTop.area = this.data_student[this.currentIndex].province;
            this.formTop.address = this.data_student[this.currentIndex].address;
            this.formTop.mail = this.data_student[this.currentIndex].zip;
        },
        delete:function(index){
            console.log("点击了删除按钮 index = ",index);
            this.delete_modal = true;
            this.currentIndex = index;
            let name = this.data_student[index].name;
            this.student_name = name;
        },
        check_delete:function(){
            let name = this.data_student[this.currentIndex].name;
            console.log("要删除的名字为",name);
            axios.post('/rms/delete',{
                studentName:name 
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                    this.select_student();
                }
                else {
                    this.$Message.info("删除出错");
                }
            }).catch(function (error){
                console.log(error);
            })
            
        },
        check_update:function(){
            let name = this.data_student[this.currentIndex].name;
            let formData = {};
            console.log("this.formLeft.name",this.formLeft.name);
            console.log("this.formTop.province",this.formTop.mail);
            formData.name =this.formLeft.name;
            formData.age =  this.formLeft.age;
            formData.city =  this.formLeft.city;
            formData.area= this.formTop.area;
            formData.address= this.formTop.address;
            formData.mail = this.formTop.mail;
            console.log("要发给后端的数据为",formData);
            axios.post("/student/update",{
                Data:formData
            }).then((response)=>{
                if(response.data == 1)
                {
                    this.$Message.info("更新成功");
                    this.select_student();
                }
                else if(response.data == 0)
                {
                    this.$Message.info("输入了新的人名，新建成功!");
                    this.select_student();
                }
                else {
                    this.$Message.info("更新出错");
                }
            }).catch(function (error){
                console.log(error);
            })
        },
        deletecancel (){
            this.$Message.info("取消删除");
        }
        
    },
    components: {
            mymodal,
    }
}
</script>
