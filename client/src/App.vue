<template>
  <my-navbar></my-navbar> 
  <section>
    <router-view :posts="posts" />
  </section>
</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue'
import axios from 'axios';

export default {
  name: 'MainPage',
  components: {
    MyNavbar,
  },
  data(){
    return {
      posts: []
    }
  },
  mounted(){
    this.fetchPosts()
  },
  methods: {
    async fetchPosts(){
      try{
        const response = await axios.get('http://localhost:3001/posts')
        this.posts = response.data
      }
      catch (e){
        alert('Ошибка');
      }
    }
    
  }
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
  background-color: #aaaaaa;
}
</style>
