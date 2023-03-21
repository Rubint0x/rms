<template>
    <div class='breadcrumb' >
        <Breadcrumb>
            <BreadcrumbItem :to="path(index)" v-for="(item, index) in $route.meta.name" :key="index">
                {{item}}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
 
<script>
    export default {
        data(){
            return{
                
            }
        },
        methods:{
        },
        computed:{
            path(){
                return function(index){
                    return this.$route.meta.path[index];
                }
            }
        },
        watch:{
        },
    }
</script>

