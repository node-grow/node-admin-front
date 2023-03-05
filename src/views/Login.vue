<template>
  <div class="container">
    <Space direction="vertical" :size="20" style="width: 60%;">
      <TypographyTitle :level="2">{{system_config.system_name}} - 请登录</TypographyTitle>
      <Form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="login-form"
      >
        <FormItem
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <Input v-model:value="formState.username" />
        </FormItem>

        <FormItem
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
        >
          <InputPassword v-model:value="formState.password" />
        </FormItem>

        <FormItem
            v-if="need_validate"
            label="验证码"
            name="captcha"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <div style="display:flex;align-items: end;height: 32px">
            <Input v-model:value="formState.captcha" style="margin-right: 5px;">
            </Input>
            <Spin :spinning="validate_spining">
              <div class="validate-img">
                <img
                    v-if="validate_res?.data?.img"
                    :src="validate_res.data.img" alt="">
                <reload-outlined @click="getValidate"
                                 style="font-size: 30px"
                                 class="icon-reload"/>
              </div>
            </Spin>
          </div>
        </FormItem>

        <FormItem :wrapper-col="{ offset: 0, span: 16 }">
          <Button type="primary" html-type="submit">提交</Button>
        </FormItem>
      </Form>
    </Space>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {getValidateCode, postUser, PostUserRequest} from "@/utils/api/login"
import $store from "@/store"
import $router from '@/router'
import {ReloadOutlined} from '@ant-design/icons-vue'
import {Button, Form, Input, Space, Spin, Typography} from "ant-design-vue"
const FormItem= Form.Item
const InputPassword=Input.Password
const TypographyTitle = Typography.Title

$store.commit('setAuthToken','')
const system_config=computed(()=>$store.state.system_config)
const validate_spining=ref(false)

const formState = ref<PostUserRequest>({
  username: '',
  password: '',
  captcha: '',
  captcha_key: '',
})

const need_validate = ref(true)
const validate_res = ref({})

const getValidate=()=>{
  validate_spining.value=true
  getValidateCode().then(res=>{
    validate_res.value=res
    formState.value.captcha_key=res.data.key
  }).finally(()=>{
    validate_spining.value=false
  })
}

watch(need_validate,val=>{
  if (val){
    getValidate()
  }
})

getValidate()

const onFinish = async (values: any) => {
  let res = null
  try {
    res = await postUser(formState.value)
    $store.commit('setAuthToken', res.data.token)
    $router.replace('/')
  }catch (e:any){
    // need_validate=e.toJSON().data.need_validate
    getValidate()
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style lang="less">
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login-form{
    width: 80%;

    .validate-img{
      display: flex;
      width: 150px;
      position: relative;
      opacity: 1;
      transition: opacity .3s;
      img{
        flex: 1;
        width: 100%;
      }
      .icon-reload{
        position: absolute;
        width: 30px;
        height: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        svg{
          opacity: 0;
          transition: all .3s;
          transform: rotate(0deg);
        }
      }
      &:hover{
        opacity: .5;
        .icon-reload{
          svg{
            opacity: 1;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>