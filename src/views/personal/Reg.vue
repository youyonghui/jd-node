<template>
  <div>
          <p>用户名：<input type="text" name="uname" id="uname" v-model="uname"/></p>
          <p>密码：<input type="password" name="pwd" id="pwd" v-model="pwd"/></p>
          <p>手机号：<input type="text" name="tel" id="tel" v-model="tel"/></p>
          <p><button @click="reg">注册</button></p>
  </div>
</template>

<script>
export default {
    name:'reg',
    data(){
        return {
            uname:'',
            pwd:'',
            tel:''
        }
    },
    methods:{
        reg(){
            
            this.axios.post('api/reg',{params:{uname:this.uname,pwd:this.pwd,tel:this.tel}}).then((res) =>{
                if(res.data == 'success'){
                    this.$router.push('/login')
                } else {
                    alert(res.data)
                }
            })
        }
    }
}
</script>

<style>

</style>