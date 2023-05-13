<template>

  <my-navbar></my-navbar> 

  <section>
    <router-view />
  </section>

</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue'

import { mapActions, mapState} from 'vuex';

export default {
  name: 'MainPage',
  components: {
    MyNavbar
  },
  
  mounted(){
    this.fetchPosts()
    this.checkAccessToken()
  },
  computed: {
    ...mapState({
      
    })
  },
  methods: {
    ...mapActions({
      fetchPosts: 'fetchPosts',
      checkAccessToken: 'checkAccessToken'
    })
  }
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Comic Sans MS;
}
body{
  background-color: #aaaaaa;
}
.app__signModal__form{
  display: flex;
  flex-direction: column;

  align-items: center;
  &__inputs{
    width: 200px;

    input{
      width: 100%;

      margin-bottom: 15px;
  
      padding: 5px;
  
      outline: none;
    }
  }

  &__authMessage{
    color: #fd2b2b;

    margin-bottom: 15px;

    max-width: 200px;

    text-align: center;
    word-wrap: break-word;
  }

  &__btns{
    width: 200px;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 10px;
    button{
      padding: 5px;
  
      width: 100%;
    }
  }


}
</style>
