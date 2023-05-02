<template>
    <div>
        <create-post 
        @createPost="createPost"
        />
        <post-list 
        :posts="posts"
        @removePost="removePost" 
        />
    </div>    
</template>

<script>
import PostList from "@/components/PostList.vue"
import CreatePost from "@/components/CreatePost.vue"

export default {
    components: {
        PostList,
        CreatePost
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    computed: {
        urlCheck(){
            const path = this.$route.path == '/posts';
            return path;
        }
    },
    methods: {
        redirectToPost(id){
            this.$router.push('/posts/' + id);
        },
        createPost(post){
            this.$emit('createPost', post)
        },
        removePost(post){
            this.$emit('removePost', post)
        }
    } 
}
</script>

<style scoped lang="scss">


</style>