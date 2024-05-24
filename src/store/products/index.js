import axios from 'axios';
export const Store = {
    state: () => ({
        product_list: [
            // { name: 'a module' }
        ],
        // selected_product_id : null
        selected_product_id : 1
    }),
    getters: {
        get(state) {
            return state.product_list
        },
        // product_poup() {

        // },
        // getProductById: (state) => (id) => {
        //     return state.product_list.find(product => product.id === id)
        // },
        getProductById: (state) => {
            return state.product_list.find(product => product.id === state.selected_product_id)
        }

    },
    mutations: {
        ADD_PRODUCTS(state, payload) {
            state.product_list.push(...payload)
        },
        SET_SELECTED_PRODUCT_ID(state, payload){
            console.group("Store >> mutation>> SET_SELECTED_PRODUCT_ID");
            console.log("SET_SELECTED_PRODUCT_ID >> state:", state);
            console.log("SET_SELECTED_PRODUCT_ID >> payload:", payload);
            state.selected_product_id = payload
            console.groupEnd("Store >> mutation>> SET_SELECTED_PRODUCT_ID");

        }
    },
    actions: {
        async add_products(contex, payload) {
            console.log("(contex, payload) ", (contex, payload));
            await axios
                .get('http://localhost:3000/products?_start=0&_limit=5')
                .then(response => {
                    console.log(response)
                    contex.commit('ADD_PRODUCTS', response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)
            // console.log("dt :", dt);
        },
        setSelected_product_id(contex, payload){
            console.group("Store >> setSelected_product_id");
            console.log("(contex) ", (contex));
            console.log("( payload) ", ( payload));
            contex.commit('SET_SELECTED_PRODUCT_ID', payload)     
            console.groupEnd("Store >> setSelected_product_id");

        }

    },
    modules: {},
}