import {defineStore} from 'pinia'
import {guid} from "@/utils/helpers";

export declare interface AdminTabOption {
    title: String,
    url: String,
    type: String,
    closable?: Boolean,
    modal_close?: Boolean,
    key?: string,
}


const useStore = defineStore('index', {
    state() {
        return {
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
            nav_module: [],
            top_nav_selected_key: '',
            admin_tab_index: '',
            admin_tabs: <AdminTabOption[]><any[]>[],
            document_title: '',
        }
    },
    actions: {
        addCount() {
            this.$state.count++
        },
        setAuthToken(val: string) {
            this.$state.auth_token = val
        },
        setSystemConfig(val: any) {
            this.$state.system_config = val
            if (!this.$state.document_title) {
                document.title = this.$state.system_config.system_name
                this.$state.document_title = document.title
            }
        },
        setGlobalLoading(val: boolean) {
            this.$state.global_loading = val
        },
        setDocumentTitle(val: string) {
            this.$state.document_title = val
        },
        setUserInfo(val: any) {
            this.$state.user_info = val
        },
        setSiderMenu(val: any) {
            this.$state.sider_menu = val
        },
        setNavModule(val: any) {
            this.$state.nav_module = val
        },
        pushAdminTab(val: any) {
            for (let index = 0; index < this.$state.admin_tabs.length; index++) {
                if (this.$state.admin_tabs[index].url === val.url && this.$state.admin_tabs[index].type === val.type) {
                    this.$state.admin_tab_index = <string>this.$state.admin_tabs[index].key
                    return
                }
            }
            if (!val.key) {
                val.key = guid()
            }
            this.$state.admin_tabs.push(val)
            this.$state.admin_tab_index = val.key
        },
        setAdminTabIndex(val: any) {
            this.$state.admin_tab_index = val
            this.$state.admin_tabs.map(item => {
                if (item.key === val) {
                    document.title = item.title + '-' + this.$state.system_config.system_name
                    this.$state.document_title = document.title
                }
            })
        },
        setAdminTabs(val: any) {
            if (!val?.length) {
                this.$state.admin_tabs = val
            }
            this.$state.admin_tabs = val.map((tab: any) => {
                if (!tab.key) {
                    tab.key = guid()
                }
                return tab
            })
            if (!this.$state.admin_tab_index) {
                this.$state.admin_tab_index = <string>this.$state?.admin_tabs[0]?.key
            }
        }
    },
})

export default useStore