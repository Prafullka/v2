import axios from 'axios';
export const Store = {
    state: () => ({
        product_list: [
            // { name: 'a module' }
        ],
        selected_product_id : null
    }),
    getters: {
        get(state) {
            return state.product_list
        },
        // product_poup() {

        // },
        getProductById: (state) => (id) => {
            return state.product_list.find(product => product.id === id)
        }

    },
    mutations: {
        ADD_PRODUCTS(state, payload) {
            state.product_list.push(...payload)
        },
        SET_SELECTED_PRODUCT_ID(state, payload){
            state.selected_product_id = payload
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
            contex.commit('SET_SELECTED_PRODUCT_ID', payload)     
        }

    },
    modules: {},
}