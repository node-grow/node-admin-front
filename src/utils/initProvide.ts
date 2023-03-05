import {App} from "vue";

export default {
    install(app:App){
        app.provide('getModal',null)
            .provide('reloadData',null)

    }
}