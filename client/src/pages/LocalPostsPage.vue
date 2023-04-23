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
        this.choosePost()
    },
    methods: {
        choosePost() {
            const id = this.$route.path.slice(7, )
            this.post = this.posts.find( post => {
                console.log(post.id)
                return post.id == id;
            })
            console.log(this.post)
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

    &:hover{
        opacity: 0.7;
    }
}
</style>