//Create a new component for product-details with a prop of details. 
Vue.component('product',{
    props : {
        premium : {
            type: Boolean, 
            required: true
        }
    },
    template: `
    <div class="product">
           
           
    <div class="product-image">
        <img v-bind:src="image">
    </div>
   
    <div class="prodcut-info">
        <h1>{{ title }}</h1> 
        <p v-if="Sale">Hurry up!! It's on Sale.</p>
        <!-- <p v-if="inventory> 10">InStock</p>
        <p v-else="inventory <= 10 && inventory > 0" >Limited Stock left!!</p>
        <p v-else>Out of Stock</p> -->
         <p v-if="inStock">In Stock</p>
         <p v-else
         :class="{outOfStock: !inStock}"
         >Out of Stock</p>
         <p> SHipping is: {{ shipping }}</p>
        
        <ul>
            <li v-for="detail in details">{{ detail }} </li>
        </ul>
       
        
        <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{backgroundColor: variant.variantColor}" 
            @mouseover="updateProduct(index)">    
        </div>
        
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{disabledButton: !inStock}" >Add to Cart</button>
        
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet!!</p>
            <ul>
            <li v-for="review in reviews">
            
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.review }}</p>
            <p>{{ review.rating }}</p>
            
            </li>
            </ul>
        </div>

                

        <product-review @review-submitted="addReview"></product-review>
    

         </div>
    </div>

    `,
    data () {
        return {
            brand: 'Apple',
            product:' Watch Series 5',
            details:["Notifications on the wrist and read messages", "Fitness tracking (calories, exercise minutes, standing)", "Workout tracking","Heart rate monitoring", "Warn about abnormal heart rates and detect falls"],
            selectedVariant: 0,
           // inventory: 100,
            Sale: true,
    
            variants:[
                {
                    variantId: 232,
                    variantColor: "White",
                    variantImage:  './assets/apple.jpg',
                    variantQuantity: 10
    
                },
                {
                    variantId:242,
                    variantColor: "Grey",
                    variantImage:  './assets/applegrey.jpg',
                    variantQuantity: 5
    
                },
                {
                    variantId:2452,
                    variantColor: "Black",
                    variantImage:  './assets/appleblack.jpg',
                    variantQuantity: 0
    
                }
            ],
            reviews: []
            
        }
        
    },
    
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
         updateProduct(index) { 
            this.selectedVariant = index
            
        },
        addReview (productReview){
            this.reviews.push(productReview)
        }


    
    },

    computed:{
        title(){
            return this.brand + ' ' + this.product
        },

        image(){
          return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return 200
        }

    }

})

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
   
    <p v-if="errors.length">
    <b> Please correct the followling error(s):</b>
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
      <input type="submit" value="Submit">  
    </p>    
  
  </form>       
    `,
    data () {
        return{
            name: null,
            review: null,
            rating: null,
            errors:[]
        }
    },
    methods:{
        onSubmit(){
          if(this.name && this.review && this.rating){
            let productReview = {
              name: this.name,
              review: this.review,
              rating: this.rating
          }

        
            
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
        else {
          if (!this.name) this.errors.push("Name required")
          if (!this.review) this.errors.push("Review required")
          if (!this.rating) this.errors.push("Rating required")

          
          
        }
    
      }
    }
})

var app = new Vue({
    el: '#app',
data:{
    premium: false,
    cart: []
},
methods:{
    updateCart(id){
        this.cart.push(id) 
    }
}
      
    
    
})
/*Create a new component for product-details with a prop of details. 

Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
     <div class="product">
          
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
  
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
  
            <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>
  
            <div class="cart">
              <p>Cart({{ cart }})</p>
            </div>
  
         </div>  
      
      </div>
     `,
    data() {
      return {
          product: 'Socks',
          brand: 'Vue Mastery',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', 'Gender-neutral'],
          variants: [
            {
              variantId: 2234,
              variantColor: 'green',
              variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
              variantQuantity: 10     
            },
            {
              variantId: 2235,
              variantColor: 'blue',
              variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
              variantQuantity: 0     
            }
          ],
          cart: 0
      }
    },
      methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(index) {  
            this.selectedVariant = index
        }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          shipping() {
            if (this.premium) {
              return "Free"
            }
              return 2.99
          }
      }
  })
  var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
})*/