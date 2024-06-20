export interface TabOptions {
    tabs: {
        name: string,
        url: string,
        method: string,
        title: string
    }[],
    default_tab: string,
}
