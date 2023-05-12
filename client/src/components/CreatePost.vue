<template>
    <div>
        <div class="form">
            <form action="" @submit.prevent>
                <input
                v-model="post.title"
                type="text" placeholder="Post title">

                <textarea
                v-model="post.body"
                placeholder="Post body"> </textarea>

                <button @click="createPost(title, body)"> Create </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState} from 'vuex';

export default {
    computed: {
        ...mapState({
            post: state => state.post
        })
    },
    methods: {
        ...mapActions({
            createPost: 'createPost'
        })
    }
}
</script>

<style scoped lang="scss">
.form{
    width: 600px;
    
    margin: 15px auto;
    padding: 20px;

    border: 1px solid #000000;

    form{
        display: flex;
        flex-direction: column;

        gap: 10px;

        input, button, textarea{
            padding: 10px;

            outline: none;
            resize: none;

            border: 1px solid #ffe3e3;
            border-radius: 5px;

            font-family: Comic Sans MS;
        }
    }
}
</style>