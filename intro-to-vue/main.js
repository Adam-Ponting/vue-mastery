// Add a description to the data object with the value "A pair of warm, fuzzy socks".
// Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
    product: 'Boots',
    description: 'A lovely pair of boots',
    image: './assets/greenSocks.jpg',
    viewMore: 'https://www.amazon.co.uk/Mens-Socks/b?node=1731008031',
  },
});
