var eventBus = new Vue();
Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <strong>Please correct the following error(s):</strong>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p> 
                Would you recommend this product?
                <input type="radio" name="recommend" value="yes" id="yes" v-model="picked" />
                <label for="yes">Yes</label>
                <input type="radio" name="recommend" value="no" id="no" v-model="picked" />
                <label for="no">No</label>
            </p>
                
            <p>
                <input type="submit" value="Submit">  
            </p>    
    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            picked: null,
            errors: [],
        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if (this.name && this.review && this.rating && this.picked) {
                const productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.picked,
                };
                // this.$emit('review-submitted', productReview);
                eventBus.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.picked = null;
            } else {
                if (!this.name) this.errors.push('Name required');
                if (!this.review) this.errors.push('Review required');
                if (!this.rating) this.errors.push('Rating required');
                if (!this.picked) this.errors.push('Recommendation required');
            }
        },
    },
});

Vue.component('product-details', {
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

        <a :href="viewMore" target="_blank">View more</a>
       

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

        <product-tabs :reviews="reviews" :shipping="shipping" :premium="premium" :details="details"></product-tabs>

       
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
            reviews: [],
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
    mounted() {
        eventBus.$on('review-submitted', (review) => {
            this.reviews.push(review);
        });
    },
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true,
        },
        shipping: {
            type: String,
            required: true,
        },
        premium: {
            type: Boolean,
            required: true,
        },
        details: {
            type: Array,
            required: true,
        },
    },
    template: `
        <div>
            <span 
                class="tab" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab"
            >{{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews:</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>Name: {{ review.name }}</p> 
                        <p>Review: {{ review.review }}</p> 
                        <p>Rating: {{ review.rating }}</p> 
                        <p>Rating: {{ review.recommend }}</p> 
                    </li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a Review'"></product-review>
            
            <p v-show="selectedTab === 'Shipping'">User is premium: {{ premium }}</p>
            <p v-show="selectedTab === 'Shipping'">Shipping fee: {{ shipping }}</p>
            <product-details :details="details"></product-details>

    

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews',
        };
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
