<template>
    <div v-if="isAuth">
        <create-post />
        <post-list />
    </div>
    <div v-else>
        <h1> Залогиньтесь, чтобы увидеть посты </h1>
    </div> 
</template>

<script>
import PostList from "@/components/PostList.vue"
import CreatePost from "@/components/CreatePost.vue"

import { mapState} from 'vuex';

export default {
    components: {
        PostList,
        CreatePost
    },
    computed: {
        ...mapState({
            isAuth: state => state.isAuth
        })
    },    
    methods: {
        redirectToPost(id){
            this.$router.push('/posts/' + id);
        }
    } 
}
</script>

<style scoped lang="scss">


</style>