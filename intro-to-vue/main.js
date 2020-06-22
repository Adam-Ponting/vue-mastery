// Add a description to the data object with the value "A pair of warm, fuzzy socks".
// Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
    product: 'Boots',
    description: 'A lovely pair of boots',
    image: './assets/greenSocks.jpg',
    viewMore: 'https://www.amazon.co.uk/Mens-Socks/b?node=1731008031',
    inventory: 5,
    onSale: true,
    details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/greenSocks.jpg',
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/blueSocks.jpg',
      },
    ],
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    cart: 0,
    // noStock: false,
  },
  methods: {
    addToCart() {
      this.cart += 1;
      this.inventory -= 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.inventory += 1;
      }
    },
    updateProduct(image) {
      this.image = image;
    },
  },
});
