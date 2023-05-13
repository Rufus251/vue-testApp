<template>
  <div class="navbar">
    <ul>
      <li>
        <router-link class="hrefs" to="/"> Home </router-link>
      </li>
      <li>
        <router-link class="hrefs" to="/posts"> Posts </router-link>
      </li>
      <li>
        <router-link class="hrefs" to="/about"> About </router-link>
      </li>
      <li>
        <router-link class="hrefs" to="/contact"> Contacts </router-link>
      </li>
      <li class="signBtn"
      v-if="!isAuth">
        <div class="content" @click="modalVisible(true)">
          <p>Sign In</p>
        </div>
      </li>
      <li class="logOutBtn"
      v-if="isAuth">
        <div class="content" @click="logout()">
          <p>LogOut</p>
        </div>
      </li>
    </ul>
    
  </div>
  <auth-modal class="app__signModal" 
  v-if="!isAuth"
  v-model:show="showModal">
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
import { mapActions, mapState } from 'vuex';
import authModal from '@/components/UI/authModal.vue'
export default {
  name: "MyNavbar",
  components:{
    authModal
  },
  data(){
    return{
      user: {
        username: 'test1',
        password: 'testBody'
      }
    }
  },
  computed: {
    ...mapState({
      showModal: state => state.showModal,
      authMessage: state => state.authMessage,
      isAuth: state => state.isAuth
    })
  },
  methods: {
    ...mapActions({
      modalVisible: 'modalVisible',
      login: 'login',
      logout: 'logout',
      register: 'register'
    })
  },
};
</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 50px;

  background-color: #000000;

  ul {
    list-style-type: none;

    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;

    align-items: center;
    justify-content: center;
    text-align: center;

    li {
      .hrefs,
      p {
        color: #ffffff;
        text-decoration: none;

        &:hover {
          cursor: pointer;
        }
      }

      &.signBtn, &.logOutBtn {

        background-color: #0099ff;

        height: 100%;

        grid-column-start: 12;
        grid-column-end: 13;

        .content {
          padding: 10px;

          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          p {
            color: #252525;
          }
        }
        &:hover {
          cursor: pointer;
        }
      }
      
    }
  }

  .signModal{
    form{
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;

      .btns{
        margin-top: 10px;

        display: flex;
        flex-direction: column;

        gap: 10px;

      }
    }
  }
}
</style>
