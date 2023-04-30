<template>
    <div>
        <div class="posts" v-if="urlCheck">
            <div @click="redirectToPost(post._id)" class="post" v-for="post in posts" :key="post.id">
                <div>
                    <h3>{{ post.title }}</h3>
                    <p> {{ post.body }} </p>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
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
        }
    } 
}
</script>

<style scoped lang="scss">
.posts{
    margin: 30px auto;

    width: 1000px;

    display: flex;
    flex-direction: column;
    
    align-items: center;
    justify-content: center;
    gap: 15px;

    .post{
        width: 100%;

        padding: 10px;

        border: 1px solid #444444;
        border-radius: 15px;

        &:hover{
            opacity: 0.7;
        }
    }
}
</style>