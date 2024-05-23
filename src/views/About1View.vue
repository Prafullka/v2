<template>
  <div class="about">
    <h1>This is an {{ pageName }} page</h1>
    <p>{{ fullName }}</p>
    <button @click="hadleClick()">click me</button>

    <div class="container">
      <div class="row">
        <div class="col-sm-5">wqwq</div>
        <div class="col-sm-5">wqwqef</div>
      </div>
      <div v-if="getProducts" class="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
        <!-- <li v-for="(item, index) in getProducts" :key="index"> -->
        <!-- 
          {"id":"1",
          "title":"iPhone 9",
          "description":"An apple mobile which is nothing like apple",
          "price":549,
          "discountPercentage":12.96,
          "rating":4.69,
          "stock":94,"brand":"Apple","category":"smartphones",
          "thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
          "images":["https://cdn.dummyjson.com/product-images/1/1.jpg",
            "https://cdn.dummyjson.com/product-images/1/2.jpg",
            "https://cdn.dummyjson.com/product-images/1/3.jpg",
            "https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]}
         -->
        <div class="col-sm-6" v-for="(item, index) in getProducts" :key="index">
          <!-- card -->
          <div class="card card-product" style="border: solid 1px grey">
            <div class="card-body">
              <!-- badge -->
              <div class="text-center position-relative">
                <div class="position-absolute top-0 start-0">
                  <span class="badge bg-danger">Sale</span>
                </div>
                <a href="shop-single.html">
                  <!-- img -->
                  <img src="#" :data-src="item.thumbnail" alt="Grocery Ecommerce Template"
                    class="mb-3 img-fluid img-responsive lazy">
                </a>
                <!-- action btn -->
                <div class="card-product-action">
                  <a href="#!" class="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                    <i class="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View"
                      data-bs-original-title="Quick View"></i>
                  </a>
                  <a href="shop-wishlist.html" class="btn-action" data-bs-toggle="tooltip" data-bs-html="true"
                    aria-label="Wishlist" data-bs-original-title="Wishlist"><i class="bi bi-heart"></i></a>
                  <a href="#!" class="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare"
                    data-bs-original-title="Compare"><i class="bi bi-arrow-left-right"></i></a>
                </div>
              </div>
              <!-- heading -->
              <div class="text-small mb-1">
                <a href="#!" class="text-decoration-none text-muted"><small>Snack &amp; Munchies</small></a>
              </div>
              <h2 class="fs-6"><a href="shop-single.html" class="text-inherit text-decoration-none"> {{ item.title }}
                </a></h2>
              <div>
                <!-- rating -->

                <span class="text-muted small">{{ item.rating }}</span>
              </div>
              <!-- price -->
              <div class="d-flex justify-content-between align-items-center mt-3">
                <div>
                  <span class="text-dark">$18</span>
                  <span class="text-decoration-line-through text-muted">$24</span>
                </div>
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal"
                @click="showProductDetails(item.id)" >
                  Launch demo modal
                </button>
                <!-- btn -->
                <div>
                  <a href="#!" class="btn btn-primary btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="feather feather-plus">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>

    <ProductDetailPopup  :product="selectedProduct">a</ProductDetailPopup>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import Vue from 'vue'
import ProductDetailPopup from './ProductDetailPopup.vue';
Vue.prototype.$_var_1_name = 'My App'

export default {
  // el: '#app',
  name: 'About1View',
  data: () => ({
    pageName: 'about1',
    firstName: 'praf',
    lastName: 'kara',
    info: null,
    loading: true,
    errored: false
  }),
  computed: {
    fullName() {
      return this.firstName + this.lastName
    },
    getProducts() {
      // console.log("this.$store.getters.get:", this.$store.getters.get);
      return this.$store.getters.get
    },
    selectedProduct(){
      return this.$store.getters.getProductById
    }
  },
  beforeCreate: function () {
  },
  created() {
  },
  mounted() {
    console.log("mounted");
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.lazyLoad);
    // this.lazyLoad();
    setTimeout(this.lazyLoad, 100)
    let switcher = false
    if (switcher) {
      axios
        .get('http://localhost:3000/products?_start=0&_limit=5')
        // .get('http://localhost:3000/products')
        .then(response => {
          this.info = response.data;
          console.log("mounted this :", this)
          console.log("mounted this.info :", this.info)
          console.log("Vue.prototype :", Vue.prototype)
          console.log("Vue.prototype.info :", Vue.prototype.info)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    } else {
      this.$store.dispatch('add_products')
    }
  },
  //   props:{},
  methods: {
    hadleClick() {
      console.log("as")
    },
    lazyLoad: function () {
      console.log("lazyLoad");
      let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
      let active = false;
      if (active === false) {
        active = true;
        setTimeout(() => {
          lazyImages.forEach(function (lazyImage) {
            if (
              (
                lazyImage.getBoundingClientRect().top <= window.innerHeight
                && lazyImage.getBoundingClientRect().bottom >= 0)
              && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage;
              });

              // if (lazyImages.length === 0) {
              //   window.removeEventListener("scroll", this.lazyLoad);
              // }
            }
          });
          active = false;
        }, 200)

      }
    },
  },
  components: {
    // HelloWorld
    ProductDetailPopup
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  },
  // ----------------------?????
  filters: {
    currencydecimal(value) {
      return value.toFixed(2)
    }
  },
}
</script>
