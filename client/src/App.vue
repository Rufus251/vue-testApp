<template>
  <my-navbar></my-navbar> 
  <section>
    <router-view 
    :posts="posts" 
    @createPost="createPost"
    @removePost="removePost"
    />
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
        alert('Ошибка получения постов');
      }
      console.log("Post getted")
    },
    async createPost(post){
      
      // Добавление поста
      try {
        await axios.post('http://localhost:3001/posts', {
          title: post.title,
          body: post.body
        })
      }
      catch (e){
        console.log(e)
      }
      console.log("Post added")

      // Меняем посту айдишник на актуальный в бд
      let currentPost;
      try{
        const response = await axios.get('http://localhost:3001/posts')
        currentPost = response.data[response.data.length - 1]
      }
      catch (e){
        alert('Ошибка после добавления');
      }

      this.posts.push(currentPost)

    },
    async removePost(post){
      this.posts = this.posts.filter(p => p._id !== post._id)
      try {
        await axios.delete('http://localhost:3001/posts/' + post._id)
      }
      catch (e){
        console.log(e)
      }
      console.log("Post deleted")
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
