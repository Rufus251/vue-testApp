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
      <li class="signBtn">
        <div class="content" @click="modalVisible(true)">
          <p>Sign In</p>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "MyNavbar",
  computed: {
  },
  methods: {
    ...mapActions({
      modalVisible: 'modalVisible'
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

      &.signBtn {

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
