import {Store} from "pinia";

export default <T>(store: Store<any>): void => {
    const storeKey = 'store-' + store.$id
    // 不需要持久化的数据存入sessionStorage
    if (sessionStorage.getItem(storeKey)) {
        store.$state =
            Object.assign(
                {},
                store.$state,
                JSON.parse(sessionStorage.getItem(storeKey) as string)
            )
        ;
        // 移除sessionStorage中的数据
        sessionStorage.removeItem(storeKey);
    }
    // 页面刷新的时候进行持久化
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem(storeKey, JSON.stringify(store.$state));
    })
}