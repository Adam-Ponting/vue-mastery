Vue.component('productDetails', {
    props: {
        details: {
            type: Array,
            required: true,
        },
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
});

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
        cart: {
            type: Array,
            required: true,
        },
    },
    template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p>{{ onSaleMessage }}</p>
        <p v-if="inStock > 10">In stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">
          Low Stock <span v-show="onSale">&<strong> on Sale!</strong></span>
        </p>
        <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
        <p>User is premium: {{ premium }}</p>
        <p>Shipping fee: {{ shipping }}</p>

        <a :href="viewMore" target="_blank">View more</a>
        <productDetails :details="details"></productDetails>
       

        <ul>
          <li v-for="size in sizes">{{ size.toUpperCase() }}</li>
        </ul>

        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        ></div>

        <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">
          Add to Cart
        </button>
        <button
          @click="removeFromCart"
          :disabled="cart === 0"
          :class="{ disabledButton: cart === 0 }"
        >
          Remove from Cart
        </button>
       
      </div>
    </div>
  `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A lovely pair of boots',
            selectedVariant: 0,
            viewMore: 'https://www.amazon.co.uk/Mens-Socks/b?node=1731008031',
            inventory: 5,
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/greenSocks.jpg',
                    variantQuantity: 101,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/blueSocks.jpg',
                    variantQuantity: 2,
                },
            ],
            sizes: ['xs', 's', 'm', 'l', 'xl'],
        };
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);

            // if (this.cart > 0) {
            //     this.cart -= 1;
            //     this.variants[this.selectedVariant].variantQuantity += 1;
            // }
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        onSaleMessage() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!!!!!';
            } else {
                return this.brand + ' ' + this.product + ' are not currently on sale';
            }
        },
        shipping() {
            if (this.premium) return 'Free';
            else return '$5.99';
        },
    },
});

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
            // this.variants[this.selectedVariant].variantQuantity -= 1;
        },
        removeFromCart(id) {
            console.log(id);
            console.log(this.cart.filter((el) => el !== id));
            this.cart = this.cart.filter((el) => el !== id);
            // this.cart.pop();
        },
    },
});
