<template>
    <div>
        <div class="posts">
            <div @click="$router.push('/posts/' + post._id)" class="post" v-for="post in posts" :key="post._id">
                <div>
                    <h3>{{ post.title }}</h3>
                    <p> {{ post.body }} </p>
                </div>
                <button 
                @click.stop="deletePost(post._id)"> delete post</button>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState({
            posts: state => state.posts,
            showModal: state => state.showModal,
        })
    },
    methods: {
        ...mapActions({
            deletePost: 'deletePost'
        })
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