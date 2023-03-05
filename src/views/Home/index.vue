<template>
  <Layout class="admin-layout">
    <LayoutHeader class="header">
      <div>
        <div class="logo"
             :title="system_name"
             style="width: 200px;text-overflow: ellipsis;overflow:hidden;">
          {{system_name}}
        </div>
        <Menu
            v-model:selectedKeys="top_selected_key"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px',minWidth: '600px' }"
        >
          <MenuItem
              key="0"
              style="text-overflow: ellipsis;width: 100px;text-align:center;overflow: hidden;"
          >
            <span>系统</span>
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Menu
            :style="{ lineHeight: '64px' }"
            v-if="userinfo"
            theme="dark"
            mode="horizontal"
            key="99"
            :selected-keys="[0]"
        >
          <SubMenu>
            <template #title>
              <span>{{userinfo?.username}}</span>
            </template>
<!--            <a-menu-item key="change_password">修改密码</a-menu-item>-->
            <MenuItem @click="logout" key="logout">退出登录</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </LayoutHeader>
    <Layout>
      <LayoutSider width="200" style="background: #fff;height: 100%;overflow-y:auto;overflow-x:hidden;">
        <Menu
            v-model:selectedKeys="selected_sider_keys"
            v-model:openKeys="open_sider_keys"
            mode="inline"
            :collapsed="collapsed"
            :style="{ height: '100%', borderRight: 0 }"
        >
          <sider-menu
              v-for="(menu,index) in sider_menu"
              :ikey="index"
              :icon="menu.icon"
              :title="menu.title"
              :children="menu.children"
              :operation="menu.operation"
          />

        </Menu>
      </LayoutSider>
      <Layout style="padding: 0 24px 24px">
<!--        <a-tabs></a-tabs>-->
        <div style="height: 20px"></div>
        <LayoutContent
            :style="{ padding: '0 24px', margin: 0, minHeight: '280px' }"
        >
          <AdminTab></AdminTab>
        </LayoutContent>
        <div style="margin-top: 15px;">&copy;Copyright node-admin</div>
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue'
import {AxiosError} from "axios"
import $store from "@/store"
import {getCurrentInfo, getCurrentMenu} from "@/utils/api/user"
import SiderMenu from "./SiderMenu.vue"
import AdminTab from "./AdminTabs.vue"
import {deleteUser} from "@/utils/api/login";
import router from "@/router";
import {Layout, Menu} from "ant-design-vue"
const LayoutHeader= Layout.Header
const LayoutContent= Layout.Content
const LayoutSider= Layout.Sider
const LayoutFooter= Layout.Footer
const MenuItem= Menu.Item
const SubMenu= Menu.SubMenu


const userinfo=ref(null);

getCurrentInfo().then(res=>{
  userinfo.value=res.data;
}).catch((err:AxiosError)=>{

})
getCurrentMenu().then(res=>{
  $store.commit('setSiderMenu',res.data)
}).catch((err:AxiosError)=>{

})

const top_selected_key = ref(['0'])
const selected_sider_keys = ref([])
const collapsed = ref(false)
const open_sider_keys = ref([0])

const system_name = computed(()=>$store.state.system_config.system_name)
const sider_menu =computed(()=>$store.state.sider_menu)

function logout(){
  deleteUser().then(res=>{
    $store.commit('setAdminTabs',$store.state.system_config.default_tabs)
    $store.commit('setDocumentTitle',$store.state.system_config.system_name)
    router.replace('/login')
  })
}
</script>
<style lang="less">
.admin-layout{
  height: 100vh;
  .header{
    display: flex;
    justify-content: space-between;
    padding: 0;
    .logo{
      float: left;
      color: #ccc;
      padding: 0 10px
    }
  }
}

.site-layout-background {
  background: #fff;
}
</style>