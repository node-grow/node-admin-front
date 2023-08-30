<template>
  <Layout class="admin-layout">
    <LayoutHeader class="header">
      <div>
        <div class="logo"
             :title="system_name">
          {{ system_name }}
        </div>
        <Menu
            v-model:selectedKeys="top_selected_key"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px',minWidth: '600px' }"
        >
          <MenuItem
              style="text-overflow: ellipsis;width: 100px;text-align:center;overflow: hidden;"
              v-for="m in modules"
              :key="m.name"
              @click="onClickTopNav(m)"
          >
            <Badge :count="m.badge" :offset="[20,0]">
              <span class="top-nav-span">{{ m.nav }}</span>
            </Badge>
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
              <span>{{ userinfo?.username }}</span>
            </template>
            <!--            <a-menu-item key="change_password">修改密码</a-menu-item>-->
            <MenuItem @click="logout" key="logout">退出登录</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </LayoutHeader>
    <Layout>
      <LayoutSider width="200" style="background: #fff;height: 100%;overflow-y:auto;overflow-x:hidden;"
                   :collapsed="store.sider_menu_collapsed">
        <Menu
            v-model:selectedKeys="selected_sider_keys"
            v-model:openKeys="open_sider_keys"
            mode="inline"
            :collapsed="collapsed"
            :style="{ height: '100%', borderRight: 0 }"
        >
          <SiderMenu
              v-for="(menu,index) in sider_menu"
              :ikey="index"
              :icon="menu.icon"
              :title="menu.title"
              :badge="menu.badge"
              :children="menu.children"
              :operation="menu.operation"
          />

        </Menu>
      </LayoutSider>
      <div class="sider-collapsed-container">
        <div class="sider-collapsed" @click="store.sider_menu_collapsed = !store.sider_menu_collapsed">
          <Button :type="store.sider_menu_collapsed?'primary':'default'">
            <MenuUnfoldOutlined v-if="store.sider_menu_collapsed"/>
            <MenuFoldOutlined v-else/>
          </Button>
        </div>
      </div>
      <Layout style="padding: 10px 24px 24px">
        <!--        <a-tabs></a-tabs>-->
        <div style="height: 20px"></div>
        <LayoutContent
            :style="{ padding: '0 24px', margin: 0, minHeight: '280px' }"
        >
          <AdminTab></AdminTab>
        </LayoutContent>
        <div class="footer">&copy;Copyright node-admin</div>
      </Layout>
    </Layout>
  </Layout>
</template>
<script setup lang="ts">
import {computed, onMounted, provide, ref} from 'vue'
import useStore from "@/store"
import {getCurrentInfo, getCurrentMenu, getCurrentModule} from "@/utils/api/user"
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue'
import SiderMenu from "./SiderMenu.vue"
import AdminTab from "./AdminTabs.vue"
import {deleteUser} from "@/utils/api/login";
import router from "@/router";
import {Badge, Button, Layout, Menu} from "ant-design-vue"

const LayoutHeader = Layout.Header
const LayoutContent = Layout.Content
const LayoutSider = Layout.Sider
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const userinfo = computed(() => store.user_info);

const store = useStore()
const reloadLayout = async () => {
  const infoRes = await getCurrentInfo()
  store.setUserInfo(infoRes.data)

  const moduleRes = await getCurrentModule()
  store.setNavModule(moduleRes.data)

  if (modules.value.length > 0) {
    store.top_nav_selected_key = modules.value[0].name
    const menuRes = await getCurrentMenu(modules.value[0].name)
    store.setSiderMenu(menuRes.data)
  }
}

provide('reloadLayout', reloadLayout)

onMounted(async () => {
  await reloadLayout()
})

const selected_sider_keys = ref([])
const collapsed = ref(false)
const open_sider_keys = ref([0])

const system_name = computed(() => store.system_config.system_name)
const sider_menu = computed(() => store.sider_menu)
const modules = computed(() => store.nav_module)
const top_selected_key = computed(() => [store.top_nav_selected_key])

function logout() {
  deleteUser().then(res => {
    store.setAdminTabs(store.system_config.default_tabs)
    store.setDocumentTitle(store.system_config.system_name)
    router.replace('/login')
  })
}

const onClickTopNav = async (m: { name: string }) => {
  store.top_nav_selected_key = m.name
  const menuRes = await getCurrentMenu(m.name)
  store.setSiderMenu(menuRes.data)
}
</script>
<style scoped lang="less">
.admin-layout {
  height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0;

    .logo {
      float: left;
      color: #ccc;
      padding: 0 10px;
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
    }

    .top-nav-span {
      color: #fff;
    }
  }
}

.sider-collapsed-container {
  position: relative;
  margin-top: 5px;

  .sider-collapsed {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.footer {
  margin-top: 15px;
  text-align: center;
}

.site-layout-background {
  background: #fff;
}
</style>