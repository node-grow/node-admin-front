import {createStore} from 'vuex'
import {guid} from "@/utils/helpers";

export declare interface AdminTabOption{
  title:String,
  url:String,
  type:String,
  closable?:Boolean,
  modal_close?:Boolean,
  key?:string,
}

export default createStore({
  state: {
    count: 0,
    auth_token: '',
    system_config: {
      system_name: '',
      iconfont_url: '',
      default_tabs: [],
    },
    global_loading: false,
    user_info: {
      username: '',
    },
    sider_menu: [],
    admin_tab_index: '',
    admin_tabs: <AdminTabOption[]><any[]>[],
    document_title: '',
  },
  getters: {
  },
  mutations: {
    addCount(state){
      state.count++
    },
    setAuthToken(state,val){
      state.auth_token=val
    },
    setSystemConfig(state,val){
      state.system_config=val
      if (!state.document_title){
        document.title=state.system_config.system_name
        state.document_title=document.title
      }
    },
    setGlobalLoading(state,val){
      state.global_loading=val
    },
    setDocumentTitle(state,val){
      state.document_title=val
    },
    setUserInfo(state,val){
      state.user_info=val
    },
    setSiderMenu(state,val){
      state.sider_menu=val
    },
    pushAdminTab(state,val){
      for (let index=0;index<state.admin_tabs.length;index++) {
        if (state.admin_tabs[index].url === val.url && state.admin_tabs[index].type===val.type){
          state.admin_tab_index=<string>state.admin_tabs[index].key
          return
        }
      }
      if (!val.key){
        val.key=guid()
      }
      state.admin_tabs.push(val)
      state.admin_tab_index=val.key
    },
    setAdminTabIndex(state,val){
      state.admin_tab_index=val
      state.admin_tabs.map(item=>{
        if (item.key===val){
          document.title=item.title+'-'+state.system_config.system_name
          state.document_title=document.title
        }
      })
    },
    setAdminTabs(state,val){
      if (!val?.length){
        state.admin_tabs=val
      }
      state.admin_tabs=val.map((tab:any)=>{
        if (!tab.key){
          tab.key=guid()
        }
        return tab
      })
      if (!state.admin_tab_index){
        state.admin_tab_index=<string>state?.admin_tabs[0]?.key
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
