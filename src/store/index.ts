import {defineStore} from 'pinia'
import {guid} from "@/utils/helpers";
import {getSystemConfig} from "@/utils/api/common";
import {getCurrentMenu, getCurrentModule} from "@/utils/api/user";

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
            system_config: {
                system_name: '',
                iconfont_url: '',
                default_tabs: [],
                extra_scripts: [],
            },
            global_loading: false,
            user_info: null as any,
            document_title: '',
            loadedExtraScript: false,

            sider_menu: [] as any[],
            sider_menu_collapsed: false,
            nav_module: [] as any[],
            top_nav_selected_key: '',
            selected_sider_keys: [] as string[],
            open_sider_keys: [0],
            admin_tab_index: '',
            admin_tabs: <AdminTabOption[]>[],
        }
    },
    actions: {
        async reloadLayout() {
            const moduleRes = await getCurrentModule()
            this.$state.nav_module = moduleRes.data

            if (this.$state.nav_module.length > 0) {
                if (!this.$state.top_nav_selected_key) {
                    this.$state.top_nav_selected_key = this.$state.nav_module[0].name
                }
                const menuRes = await getCurrentMenu(this.$state.top_nav_selected_key)
                this.$state.sider_menu = menuRes.data
            }
        },

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
                await this.loadExtraScript()
                this.$state.loadedExtraScript = true
            } catch (e) {
                console.error(e)
            }
        },

        loadExtraScript() {
            if (this.$state.loadedExtraScript) {
                return
            }

            if (!this.$state.system_config.extra_scripts?.length) {
                return
            }

            return Promise.all(this.$state.system_config.extra_scripts.map((item: string) => {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script')
                    script.src = item
                    script.onload = () => {
                        resolve(true)
                    }
                    script.onerror = () => {
                        reject(false)
                    }
                    document.body.appendChild(script)
                })
            }))
        }
    },
})

export default useStore