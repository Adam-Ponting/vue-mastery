// Add a description to the data object with the value "A pair of warm, fuzzy socks".
// Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
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
        variantQuantity: 0,
      },
    ],
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1;
      this.variants[this.selectedVariant].variantQuantity -= 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.variants[this.selectedVariant].variantQuantity += 1;
      }
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
  },
});
