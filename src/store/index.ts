import {defineStore} from 'pinia'
import {guid} from "@/utils/helpers";
import {getSystemConfig} from "@/utils/api/common";

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
            user_info: null as any,
            document_title: '',

            sider_menu: [],
            sider_menu_collapsed: false,
            nav_module: [],
            top_nav_selected_key: '',
            selected_sider_keys: [] as string[],
            open_sider_keys: [0],
            admin_tab_index: '',
            admin_tabs: <AdminTabOption[]><any[]>[],
        }
    },
    actions: {
        setSystemConfig(val: any) {
            this.$state.system_config = val
            if (!this.$state.document_title) {
                this.$state.document_title = this.$state.system_config.system_name
            }
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
                    this.$state.document_title = item.title + '-' + this.$state.system_config.system_name
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
        },

        async initConfig() {
            try {
                const res = await getSystemConfig()

                this.setSystemConfig(res.data)
                if (!this.$state.admin_tabs.length) {
                    this.setAdminTabs(res.data.default_tabs)
                }
            } catch (e) {

            }
        }
    },
})

export default useStore