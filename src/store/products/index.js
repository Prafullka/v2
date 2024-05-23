import axios from 'axios';
export const Store = {
    state: () => ({
        product_list: [
            // { name: 'a module' }
        ]
    }),
    getters: {
        get(state) {
            return state.product_list
        }
    },
    mutations: {
        ADD_PRODUCTS(state, payload) {
            state.product_list.push(...payload)
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
        }
    },
    modules: {},
}