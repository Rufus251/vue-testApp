<template>
    <div>
        <div class="post">
            <div>
                <h3>{{ post.title }}</h3>
                <p> {{ post.body }} </p>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapState } from 'vuex';

export default{
    mounted() {
        this.getPost();
    },
    data(){
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts
        })
    },
    methods: {
        getPost(){
            const id = this.$route.params.id

            const Post = this.posts.find( post => {
                if (post._id === id){
                    return post
                }
            })
            console.log(Post)
            this.post.title = Post.title
            this.post.body = Post.body
        }
    }
}
</script>

<style scoped lang="scss">
.post{
    margin: 30px auto;

    width: 1000px;

    padding: 10px;

    border: 1px solid #444444;
    border-radius: 15px;
}
</style>