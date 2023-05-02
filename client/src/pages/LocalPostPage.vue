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
import axios from 'axios';

export default{
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    data() {
        return{
            post: {
                title: '',
                body: ''        
            }
        }
    },
    mounted() {
        this.getPost();
    },
    methods: {
        async getPost(){
            try {
                const response = await axios.get('http://localhost:3001/posts/' + this.$route.params.id)
                this.post.title = response.data.title
                this.post.body = response.data.body
            }
            catch (e){
                console.log(e)
            }
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