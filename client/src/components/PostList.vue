<template>
    <div>
        <div class="posts" v-if="urlCheck">
            <div @click="redirectToPost(post._id)" class="post" v-for="post in posts" :key="post._id">
                <div>
                    <h3>{{ post.title }}</h3>
                    <p> {{ post.body }} </p>
                </div>
                <button 
                @click="removePost(post)" prevent> delete post</button>
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
        },
        removePost(post){
            this.$emit('removePost', post)
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

        font-family: Comic Sans MS;

        &:hover{
            cursor: pointer;
        }

        button{
            padding: 3px;

            margin-top: 5px;

            font-family: Comic Sans MS;

            &:hover{
                cursor: pointer;
                opacity: 0.9;
            }
        }
    }
}
</style>