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
        font-size:23px;
        color:#FFFFFF;
    }
</style>
<template>
    <div class="layout">

        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu active-key="1-2" theme="dark" width="auto" :open-keys="['1']">
                    <div class="layout-logo-left">SCAU餐饮管理系统</div><!-- 左上角logo -->
                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-select"></Icon>
                            菜单管理
                        </template>
                        <Menu-item key="1-1" @click.native="show_foodtype(1)">菜品种类管理</Menu-item>
                        <Menu-item key="1-2" @click.native="show_food(1)">总览</Menu-item>
                    </Submenu>

                    <Menu-item key="2" @click.native="show_table(1)">桌台管理</Menu-item>
                    <Menu-item key="3" @click.native="show_order(1)">订单管理</Menu-item>
                    <Menu-item key="4" @click.native="show_user(1)">用户管理</Menu-item>
                    <Menu-item key="5" @click.native="show_sum(1)">营业额管理</Menu-item>
                    <Menu-item key="6" @click.native="show_user(1)">系统维护</Menu-item>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item @click.native="show_index(1)">首页</Breadcrumb-item>
                        <Breadcrumb-item v-if="idx != 'i'">{{ menuname }}</Breadcrumb-item>
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
                        <!-- <div v-if="test1">
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
                                     <FormItem label="地区">
                                        <Input v-model="formTop.area"></Input>
                                    </FormItem>
                                    <FormItem label="地址">
                                        <Input v-model="formTop.address"></Input>
                                    </FormItem> 
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
                            
                            
                        </div> -->
                        
                        <div v-show="idx === 'i'">        <!-- 主页-->
                            你好，{{logInfo.name}},欢迎使用SCAU餐饮管理系统
                        </div>

                        <!-- 菜单管理 -->
                        <div v-show="idx === 'f_type'">   <!-- 种类管理 -->
                            <i-table width="550" border :columns="show_form_foodtype" :data="data_foodtype" > 
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="add_modal_foodtype" name="" title="新增" @on-ok="check_add_foodtype" @on-cancel="cancel">
                                <Form :model="add_form_foodtype" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="add_form_foodtype.ty_id"></Input>
                                    </FormItem>
                                    <FormItem label="类型">
                                        <Input v-model="add_form_foodtype.ty_name"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>

                            <Modal v-model="update_modal_foodtype" name="" title="修改"  @on-ok="check_update_foodtype" @on-cancel="cancel">
                                <Form :model="update_form_foodtype" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="update_form_foodtype.ty_id"></Input>
                                    </FormItem>
                                    <FormItem label="类型">
                                        <Input v-model="update_form_foodtype.ty_name"></Input>
                                    </FormItem>
                                </Form>
                        
                            </Modal>
                            
                            <Modal v-model="delete_modal_foodtype" name="" title="删除" @on-ok="check_delete_foodtype" @on-cancel="cancel">
                                是否确定要删除？
                            </Modal>
                        </div>

                        <div v-show="idx === 'f_all'">   <!-- 总览 -->
                            <i-table width="800" border :columns="show_form_food" :data="data_food" > 
                                <i-tab></i-tab>
                            </i-table>

                            <Modal v-model="add_modal_food" name="" title="新增" @on-ok="check_add_food" @on-cancel="cancel">
                                <Form :model="add_form_food" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="add_form_food.f_id"></Input>
                                    </FormItem>
                                    <FormItem label="类型">
                                        <Input v-model="add_form_food.ty_name"></Input>
                                    </FormItem>
                                    <FormItem label="名字">
                                        <Input v-model="add_form_food.f_name"></Input>
                                    </FormItem>
                                    <FormItem label="价格">
                                        <Input v-model="add_form_food.price"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>

                            <Modal v-model="update_modal_food" name="" title="修改"  @on-ok="check_update_food" @on-cancel="cancel">
                                <Form :model="update_form_food" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="update_form_food.f_id"></Input>
                                    </FormItem>
                                    <FormItem label="类型">
                                        <Input v-model="update_form_food.ty_name"></Input>
                                    </FormItem>
                                    <FormItem label="名字">
                                        <Input v-model="update_form_food.f_name"></Input>
                                    </FormItem>
                                    <FormItem label="价格">
                                        <Input v-model="update_form_food.price"></Input>
                                    </FormItem>
                                </Form>
                        
                            </Modal>
                            
                            <Modal v-model="delete_modal_food" name="" title="删除" @on-ok="check_delete_food" @on-cancel="cancel">
                                是否确定要删除？
                            </Modal>

                        </div>

                        <div v-show="idx === 't'">    <!-- 桌台管理 -->
                            <i-button type="success" @click="table_add">新增</i-button>
                            <i-button type="info" @click.native="table_del">删除</i-button>
                            <br>
                            <i-table width="440" border :columns="show_form_table" :data="data_table" > 
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="flag_table_add" name="" title="新增" @on-ok="check_table_add" >
                                <Form :model="table_da" label-position="left" :label-width="100">
                                    <FormItem label="桌子类型">
                                        <Input v-model="table_da.type"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="flag_table_del" name="" title="删除" @on-ok="check_table_del" >
                                <Form :model="table_da" label-position="left" :label-width="100">
                                    <FormItem label="桌号">
                                        <Input v-model="table_da.t_id"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="flag_table_open" name="" title="开台"  @on-ok="check_open_table" >
                                是否开台桌号为【{{table_id}}】的【{{table_type}}】
                            </Modal>
                        </div>

                        <div v-show="idx === 'o'">    <!-- 订单管理 -->
                            <br>
                            <i-table width="722" border :columns="show_form_order" :data="data_order" > 
                                <i-tab></i-tab>
                            </i-table>
                            
                            <Modal v-model="flag_menu_select" name="" title="点餐"  @on-ok="check_menu_show">
                                <Form :model="menu_da" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="menu_da.id"></Input>
                                    </FormItem>
                                    <FormItem label="数量">
                                        <Input v-model="menu_da.count"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="flag_menu_sh" name="" title="结账"  @on-ok="check_menu_select" >
                                是否下单【{{menu_da.count}}】份【{{menu_da.name}}】？
                            </Modal>
                            <Modal v-model="modal4_3" name="" title="订单"  >
                                <i-table width="302" border :columns="show_form_bill" :data="data_order_detail" > 
                                    <i-tab></i-tab>
                                </i-table>
                            </Modal>
                            <Modal v-model="modal4_4" name="" title="结账"  @on-ok="check_over_order" >
                                是否结账订单号为【{{order_id}}】的订单？
                            </Modal>
                            <Modal v-model="flag_del_order" name="" title="删除"  @on-ok="check_del_order" >
                                是否删除订单号为【{{order_id}}】的订单？
                            </Modal>
                        </div>

                        <div v-show="idx === 'u'">   <!-- 用户管理 -->
                            <i-table width="302" border :columns="show_form_user" :data="data_user" > 
                                <i-tab></i-tab>
                            </i-table>

                            <Modal v-model="add_modal_user" name="" title="新增" @on-ok="check_add_user" @on-cancel="cancel">
                                <Form :model="add_form_user" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="add_form_user.u_id"></Input>
                                    </FormItem>
                                    <FormItem label="员工姓名">
                                        <Input v-model="add_form_user.username"></Input>
                                    </FormItem>
                                    <FormItem label="分配员工密码">
                                        <Input v-model="add_form_user.pwd"></Input>
                                    </FormItem>
                                    <FormItem label="是否为管理员">
                                        <Input v-model="add_form_user.type"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>

                            <Modal v-model="update_modal_user" name="" title="修改"  @on-ok="check_update_user" @on-cancel="cancel">
                                <Form :model="update_form_user" label-position="left" :label-width="100">
                                    <FormItem label="id">
                                        <Input v-model="update_form_user.u_id"></Input>
                                    </FormItem>
                                    <FormItem label="员工姓名">
                                        <Input v-model="update_form_user.username"></Input>
                                    </FormItem>
                                    <FormItem label="分配员工密码">
                                        <Input v-model="update_form_user.pwd"></Input>
                                    </FormItem>
                                    <FormItem label="是否为管理员">
                                        <Input v-model="update_form_user.type"></Input>
                                    </FormItem>
                                </Form>
                        
                            </Modal>
                            
                            <Modal v-model="delete_modal_user" name="" title="删除" @on-ok="check_delete_user" @on-cancel="cancel">
                                是否确定要删除？
                            </Modal>
                        </div>
                        <div v-show="idx === 'y'">   <!-- 营业额管理 -->
                            <i-button type="success" @click="sum_year">年营业额</i-button>
                            <i-button type="success" @click="sum_mon">月营业额</i-button>
                            <i-button type="success" @click="sum_day">日营业额</i-button>
                            <br>
                            <i-table width="302" border :columns="show_form_sum" :data="data_sum" > 
                                <i-tab></i-tab>
                            </i-table>
                            <Modal v-model="flag_sum_mon" name="" title="年份选择" @on-ok="check_sum_mon" >
                                <Form :model="time_da" label-position="left" :label-width="100">
                                    <FormItem label="年份">
                                        <Input v-model="time_da.mon"></Input>
                                    </FormItem>
                                </Form>
                            </Modal>
                            <Modal v-model="flag_sum_day" name="" title="日期选择" @on-ok="check_sum_day" >
                                <Form :model="time_da" label-position="left" :label-width="100">
                                    <FormItem label="开始时间">
                                        <Input v-model="time_da.star"></Input>
                                    </FormItem>
                                    <FormItem label="结束时间">
                                        <Input v-model="time_da.end"></Input>
                                    </FormItem>
                                </Form>
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
            //系统参数
            idx: "i",//显示参数
            menuname:"",//导航栏名字

            notLogin:true,//登录信息
            notAdmin:true,//是否为管理员

            currentIndex:-1,
            food_Index:-1,
            
            order_id:"",
            table_type:"",
            time_type:"",
            delete_modal:false,
            update_modal:false,
            update_modal_food:false,

            modal4_1:false,
            modal4_2:false,
            modal4_3:false,
            modal4_4:false,

            add_modal_food:false,//增加食物flag
            update_modal_food:false,//更新食物flag
            delete_modal_food:false,//删除食物flag

            add_modal_foodtype:false,//增加食物类型flag
            update_modal_foodtype:false,//更新食物类型flag
            delete_modal_foodtype:false,//删除食物类型flag

            add_modal_user:false,//增加员工flag
            update_modal_user:false,//更新员工flag
            delete_modal_user:false,//删除员工flag

            flag_table_open:false,//开台flag
            flag_table_add:false,
            flag_table_del:false,
            flag_menu_select:false,//点餐flag
            flag_del_order:false,
            flag_menu_sh:false,
            flag_sum_mon:false,
            flag_sum_day:false,
            selected:null,
            table:null,

            //表格数据
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
            show_form_food: [  //食物格式
                {
                    title: 'id',
                    key: 'f_id',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '种类',
                    key: 'ty_name',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'f_name',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '价格',
                    key: 'price',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '功能',
                    key: 'state',
                    width: 220,
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.add_food(params.index);
                                        }
                                    }
                                }, '新增'),
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
                                            this.update_food(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.delete_food(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            show_form_foodtype: [   //食物类型
            {
                    title: 'id',
                    key: 'ty_id',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '种类',
                    key: 'ty_name',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '功能',
                    key: 'state',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                            h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.add_foodtype(params.index);
                                        }
                                    }
                                }, '新增'),
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
                                            this.update_foodtype(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.delete_foodtype(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            show_form_table: [  //桌台格式
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
            show_form_order: [  //订单格式
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
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.get_order_detail(params.index);
                                        }
                                    }
                                }, '账单'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.del_order(params.index);
                                        }
                                    }
                                }, '删除')
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
                                            this.menu_select(params.index);
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
            show_form_bill: [  //账单格式
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
            show_form_user: [  //员工格式
                {
                    title: 'id',
                    key: 'u_id',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '员工姓名',
                    key: 'username',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '员工身份',
                    key: 'type',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '功能',
                    key: 'state',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                            return h('div', [
                            h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click :()=>{
                                            this.add_user(params.index);
                                        }
                                    }
                                }, '新增'),
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
                                            this.update_user(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click :()=>{
                                            this.delete_user(params.index);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                }
            ],
            show_form_sum: [  //营业额格式
                {
                    title: '时间',
                    key: 'date',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'sum',
                    width: 100,
                    align: 'center'
                
                }
            ],
            //显示数据
            data_food:[],
            data_foodtype:[],
            data_table:[],
            data_order:[],
            data_order_detail:[],
            data_user: [],
            data_sum:[],

            modal1:false,
            table_da:{
                t_id:'',
                type:'',
            },
            menu_da:{
                id:'',
                count:'',
                name:'',
            },
            time_da:{
                mon:'',
                star:'',
                end:'',
            },
            add_form_food: {
                f_id: '',
                ty_name: '',
                f_name: '',
                price: ''
            },
            update_form_food: {
                f_id: '',
                ty_name: '',
                f_name: '',
                price: ''
            },
            add_form_foodtype: {
                ty_id: '',
                ty_name: ''
            },
            update_form_foodtype: {
                ty_id: '',
                ty_name: ''
            },
            add_form_user: {
                u_id: '',
                username: '',
                pwd:'',
                type:''
            },
            update_form_user: {
                u_id: '',
                username: '',
                pwd:'',
                type:''
            },
            logInfo:{
                name :'',
                password:'',
            }
            
            
        }
        
    },
    methods:{
        //-----------------------------------------------------------------
        //登录
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
                        this.notAdmin = false;
                    }
                }).catch(function(response){
                    this.$Message.info("系统错误!");
                    this.notLogin = true;
                })
        },

        //-----------------------------------------------------------------
        //用于显示的方法
        show_index:function(){    //主页
            this.idx = 'i'
        },
        show_food:function(){     //菜单管理
            this.idx = 'f_all'
            this.menuname = "菜单管理/总览"
            
            axios.post("/rms/get_food",{
            }).then((response) =>{

                this.data_food.splice(0);                     //更新数据
                for(let i=0; i<response.data.length; i++)
                {
                    let resValue = {};
                    resValue.f_id = response.data[i].f_id;
                    resValue.ty_name = response.data[i].ty_name;
                    resValue.f_name = response.data[i].f_name;
                    resValue.price = response.data[i].price;
                    this.data_food.push(resValue);             
                }

                })
        },
        show_foodtype:function(){
            this.idx = 'f_type'
            this.menuname = "菜单管理/种类管理"

            axios.post("/rms/get_foodtype",{
            }).then((response) =>{

                this.data_foodtype.splice(0);                     //更新数据
                for(let i=0; i<response.data.length; i++)
                {
                    let resValue = {};
                    resValue.ty_id = response.data[i].ty_id;
                    resValue.ty_name = response.data[i].ty_name;
                    this.data_foodtype.push(resValue);             
                }

                })
        },
        show_table:function(){    //桌台管理
            this.idx = 't'
            this.menuname = "桌台管理"
            this.data_table = [];   
            axios.post("/rms/get_table",{
            }).then((response) =>{
                console.log("tt2=",response.data)
                                 //更新数据
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
        show_order:function(){    //订单管理
            this.idx = 'o'
            this.menuname = "订单管理"

            this.data_order = [];
            axios.post("/rms/get_order",{
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
        show_user:function(){     //用户管理
            this.idx = 'u'
            this.menuname = "用户管理"

            axios.post("/rms/get_user",{
            }).then((response) =>{
                console.log("tt2=",response.data)
                this.data_user.splice(0);                     //更新数据
                for(let i=0; i<response.data.length; i++)
                {
                    let resValue = {};
                    resValue.u_id = response.data[i].u_id;
                    resValue.username = response.data[i].username;

                    if(response.data[i].type == 0){
                        resValue.type ='管理员';
                    }
                    else{
                        resValue.type ='普通用户';
                    }
                    this.data_user.push(resValue);             //  
                }

                console.log("tt3=",this.data_user)
                })
        },
        show_sum:function(){     //营业额管理
            this.idx = 'y'
            this.menuname = "营业额管理"
        },
        //-----------------------------------------------------------------
        //菜品增删改查
        add_food:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.add_modal_food = true;
            this.currentIndex = index;
        },
        check_add_food:function(){
            axios.post('/rms/add_food',{
                id:this.add_form_food.f_id,
                name:this.add_form_food.f_name,
                type:this.add_form_food.ty_name,
                price:this.add_form_food.price,

                }).then((response) =>{
                    console.log("返回值为",response);
                    if(response.body == 1)
                    {
                        this.$Message.info('新建失败');
                    }
                    else
                    {
                        this.$Message.info('新建成功');
                        console.log("成功")
                    }
                    this.show_food();
                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        
        update_food:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.update_modal_food = true;
            this.update_form_food.f_id  = this.data_food[this.currentIndex].f_id;
            this.update_form_food.ty_name = this.data_food[this.currentIndex].ty_name;
            this.update_form_food.f_name  =  this.data_food[this.currentIndex].f_name;
            this.update_form_food.price  =  this.data_food[this.currentIndex].price;
        },
        check_update_food:function(){
            let upadte_date_food = {};
            upadte_date_food.f_id =this.update_form_food.f_id;
            upadte_date_food.ty_name =  this.update_form_food.ty_name;
            upadte_date_food.f_name =  this.update_form_food.f_name;
            upadte_date_food.price =  this.update_form_food.price;

            console.log("要发给后端的数据为",upadte_date_food);
            axios.post("/rms/update_food",{
                Data:upadte_date_food
            }).then((response)=>{
                if(response.data == 1)
                {
                    this.$Message.info("更新出错");
                }
                else {
                    this.$Message.info("更新成功");
                }
                this.show_food();
            }).catch(function (error){
                console.log(error);
            })
        },

        delete_food:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.delete_modal_food = true;
        },
        check_delete_food:function(){
            let f_id = this.data_food[this.currentIndex].f_id;
            axios.post('/rms/delete_food',{
                f_id:f_id 
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                    this.select_student();
                }
                else {
                    this.$Message.info("删除出错");
                }
                this.show_food();
            }).catch(function (error){
                console.log(error);
            })
        },
        
        //-----------------------------------------------------------------
        //菜品种类增删改查
        add_foodtype:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.add_modal_foodtype = true;
            this.currentIndex = index;
        },
        check_add_foodtype:function(){
            axios.post('/rms/add_foodtype',{
                ty_id:this.add_form_foodtype.ty_id,
                ty_name:this.add_form_foodtype.ty_name,

                }).then((response) =>{
                    console.log("返回值为",response);
                    if(response.body == 1)
                    {
                        this.$Message.info('新建失败');
                    }
                    else
                    {
                        this.$Message.info('新建成功');
                        console.log("成功")
                    }
                    this.show_foodtype();
                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        
        update_foodtype:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.update_modal_foodtype = true;
            this.update_form_foodtype.ty_id  = this.data_food[this.currentIndex].ty_id;
            this.update_form_foodtype.ty_name = this.data_food[this.currentIndex].ty_name;
        },
        check_update_foodtype:function(){
            let upadte_date_foodtype = {};
            upadte_date_foodtype.ty_id =this.update_form_foodtype.ty_id;
            upadte_date_foodtype.ty_name =  this.update_form_foodtype.ty_name;

            console.log("要发给后端的数据为",upadte_date_foodtype);
            axios.post("/rms/update_foodtype",{
                Data:upadte_date_foodtype
            }).then((response)=>{
                if(response.data == 1)
                {
                    this.$Message.info("更新出错");
                }
                else {
                    this.$Message.info("更新成功");
                }
                this.show_foodtype();
            }).catch(function (error){
                console.log(error);
            })
        },

        delete_foodtype:function(index){
            
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.delete_modal_foodtype = true;
        },
        check_delete_foodtype:function(){
            let ty_id = this.data_foodtype[this.currentIndex].ty_id;
            axios.post('/rms/delete_foodtype',{
                ty_id:ty_id 
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                    this.select_student();
                }
                else {
                    this.$Message.info("删除出错");
                }
                this.show_foodtype();
            }).catch(function (error){
                console.log(error);
            })
        },
        //-----------------------------------------------------------------
        //用户增删改查
        add_user:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.add_modal_user = true;
            this.currentIndex = index;
        },
        check_add_user:function(){
            axios.post('/rms/add_user',{
                u_id:this.add_form_user.u_id,
                username:this.add_form_user.username,
                pwd:this.add_form_user.pwd,
                type:this.add_form_user.type

                }).then((response) =>{
                    console.log("返回值为",response);
                    if(response.body == 1)
                    {
                        this.$Message.info('新建失败');
                    }
                    else
                    {
                        this.$Message.info('新建成功');
                        console.log("成功")
                    }
                    this.show_user();
                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },

        update_user:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.update_modal_user = true;
            this.update_form_user.u_id  = this.data_user[this.currentIndex].u_id;
            this.update_form_user.username = this.data_user[this.currentIndex].username;
            this.update_form_user.pwd  = this.data_user[this.currentIndex].pwd;
            this.update_form_user.type = this.data_user[this.currentIndex].type;
        },
        check_update_user:function(){
            let upadte_date_user = {};
            upadte_date_user.u_id =this.update_form_user.u_id;
            upadte_date_user.username =  this.update_form_user.username;
            upadte_date_user.pwd =this.update_form_user.pwd;
            upadte_date_user.type =  this.update_form_user.type;

            console.log("要发给后端的数据为",upadte_date_user);
            axios.post("/rms/update_user",{
                Data:upadte_date_user
            }).then((response)=>{
                if(response.data == 1)
                {
                    this.$Message.info("更新出错");
                }
                else {
                    this.$Message.info("更新成功");
                }
                this.show_user();
            }).catch(function (error){
                console.log(error);
            })
        },

        delete_user:function(index){
            if(this.notAdmin) {
                this.$Message.info("您没有权限");
                return;
            }
            this.currentIndex = index;
            this.delete_modal_user = true;
        },
        check_delete_user:function(){
            let u_id = this.data_user[this.currentIndex].u_id;
            axios.post('/rms/delete_user',{
                u_id:u_id 
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                }
                else {
                    this.$Message.info("删除出错");
                }
                this.show_user();
            }).catch(function (error){
                console.log(error);
            })
        },

        //-----------------------------------------------------------------
        //桌台增删改查
        table_add:function(){           //加桌子
            console.log("点击了新增");
            this.flag_table_add = true;
            console.log('modal_1 = ',this.modal1);
        },

        check_table_add(){       
            axios.post('/rms/add_table',{
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
            this.idx='';
            this.show_table();
        },

        table_del:function(){        //删桌子
            console.log("点击了删除");
            this.flag_table_del = true;
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

        open_table:function(index){    //开台
            this.flag_table_open = true;
            this.currentIndex = index;
            let tid = this.data_table[index].t_id;
            let ttype = this.data_table[index].type;
            this.table_id = tid;
            this.table_type = ttype;
        },

        check_open_table:function(){
            let table = this.data_table[this.currentIndex].t_id;
            console.log("要删除的名字为",name);
            axios.post('/rms/open_table',{
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

        order_over:function(index){    //结账
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
        del_order:function(index){    //结账
            this.flag_del_order = true;
            this.currentIndex = index;
            let oid = this.data_order[index].o_id;
            this.order_id = oid;
        },

        check_del_order:function(){
            let name = this.data_order[this.currentIndex].o_id;
            axios.post('/rms/del_order',{
                name:name
            }).then((response)=>{
                if(response.data == 0)
                {
                    this.$Message.info("删除成功");
                }
                else {
                    this.$Message.info("删除出错");
                }
            }).catch(function (error){
                console.log(error);
            })
            
        },
        menu_select:function(index){         //点餐
            this.flag_menu_select=true;
            this.currentIndex = index;
        },
        check_menu_show:function(){
            axios.post('/rms/get_food_name',{
                id: this.menu_da.id
            }).then( (response)=>{
                this.flag_menu_sh=true;
                console.log(response);
                this.menu_da.name=response.data[0].f_name
            }).catch(function (error){
                console.log(error);
            })
        },

        check_menu_select:function(){
            axios.post('/rms/put_menu_select',{
                o_id:this.data_order[this.currentIndex].o_id,
                f_id:this.menu_da.id,
                count:this.menu_da.count
                }).then((response) =>{
                    console.log("返回值为",response);
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
        food_update:function(index){
            
        },



        sum_year:function(){
            this.data_sum=[];
            axios.post('/rms/get_year_sum',{
                }).then((response) =>{
                    console.log("tt6=",response.data)
                               //更新数据
                for(let i=0;i<response.data.length;i++)
                {
                    let resValue = {};
                    resValue.date = response.data[i].date;
                    resValue.sum = response.data[i].sum;
                    this.data_sum.push(resValue);  
                }
                console.log("tt3=",this.data_sum);

                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        sum_mon:function(){
            this.flag_sum_mon=true;
        },
        check_sum_mon:function(){
            this.data_sum=[];
            axios.post('/rms/get_mon_sum',{
                    mon:this.time_da.mon
                }).then((response) =>{
                    console.log("tt6=",response.data)
                               //更新数据
                for(let i=0;i<response.data.length;i++)
                {
                    let resValue = {};
                    resValue.date = response.data[i].date;
                    resValue.sum = response.data[i].sum;
                    this.data_sum.push(resValue);           //  
                }
                console.log("tt3=",this.data_sum);

                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        sum_day:function(){
            this.flag_sum_day=true;
        },
        check_sum_day:function(){
            this.data_sum=[];
            axios.post('/rms/get_day_sum',{
                    str:this.time_da.star,
                    end:this.time_da.end
                }).then((response) =>{
                    console.log("tt6=",response.data)
                               //更新数据
                for(let i=0;i<response.data.length;i++)
                {
                    let resValue = {};
                    resValue.date = response.data[i].date;
                    resValue.sum = response.data[i].sum;
                    this.data_sum.push(resValue);           //  
                }
                console.log("tt3=",this.data_sum);

                }).catch(function(response){
                    this.$Message.info("创建失败，系统错误！");
                })
        },
        // check_select_time:function(){
        //     let post_str="";
        //     if(this.time_type=="year")post_str='/rms/get_year_sum';
        //     axios.post(post_str,{
        //         time_st:this.time_da.star,
        //         time_en:this.time_da.end
        //         }).then((response) =>{
        //             console.log("tt6=",response.data)
        //                        //更新数据
        //         for(let i=0;i<response.data.length;i++)
        //         {
        //             let resValue = {};
        //             resValue.o_id = response.data[i].o_id;
        //             resValue.t_id = response.data[i].t_id;
        //             resValue.date = response.data[i].date;
        //             resValue.sum = response.data[i].sum;
        //             if(response.data[i].statue){
        //                 resValue.statue ='已结账'
        //             }
        //             else{
        //                 resValue.statue ='未结账';
        //             }
        //             this.data_sum.push(resValue);             //  
        //         }
        //         console.log("tt3=",this.data_order)

        //         }).catch(function(response){
        //             this.$Message.info("创建失败，系统错误！");
        //         })
        // },
        //以下参考
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
