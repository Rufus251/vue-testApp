<template>

  <my-navbar></my-navbar> 

  <section>
    <router-view />
  </section>

  <auth-modal class="app__signModal" v-model:show="showModal">
    <form @submit.prevent class="app__signModal__form">

      <div class="app__signModal__form__inputs">

        <p>Введите логин:</p>
        <input
        v-model.trim="user.username" 
        type="text" />
  
        <p>Введите пароль:</p>
        <input
        v-model.trim="user.password" 
        type="password" />

      </div>
      
      <div class="app__signModal__form__authMessage">
        <p>
          {{ authMessage }}
        </p>
      </div>
      
      <div class="app__signModal__form__btns">

        <button @click="login(user)">Войти</button>
        <button @click="register(user)">Зарегистрироваться</button>

      </div>

    </form>
  </auth-modal>

</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue'
import authModal from '@/components/UI/authModal.vue'

import { mapActions, mapState} from 'vuex';

export default {
  name: 'MainPage',
  components: {
    MyNavbar,
    authModal
  },
  data(){
    return{
      user: {
        username: '',
        password: ''
      }
    }
  },
  mounted(){
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      showModal: state => state.showModal,
      authMessage: state => state.authMessage
    })
  },
  methods: {
    ...mapActions({
      fetchPosts: 'fetchPosts',
      login: 'login',
      register: 'register'
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
