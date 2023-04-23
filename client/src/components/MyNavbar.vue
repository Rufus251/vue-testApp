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
    </ul>
  </div>
</template>

<script>

export default {
  name: 'MyNavbar',
  
};

</script>

<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 50px;

  background-color: #000000;

  font-family: Comic Sans MS;

  ul {
    list-style-type: none;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    li {
      width: 100px;

      .hrefs{
        color: #ffffff;
        text-decoration: none;
      }
    }
  }
}
</style>
