import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({
    state:{
        posts: [],
        post: {
            id: '',
            title: '',
            body: ''
        },
        showModal: false,
        authMessage: 'test'
    },
    getters:{
        
    },
    mutations:{
        setPosts(state, posts){
            state.posts = posts
        },
        setPost(state, post){
            state.post.title = post.title,
            state.post.body = post.body
        },
        setShowModal(state, bool){
            state.showModal = bool
        },
        setAuthMessage(state, message){
            state.authMessage = message
        }
    },
    actions:{
        async fetchPosts({commit}){
            try{
                const response = await axios.get('http://localhost:3001/posts')
                commit('setPosts', response.data)
            }
            catch (e){
                alert('Ошибка получения постов');
            }
            console.log("Post getted")
        },

        async createPost(store){
            console.log("123", store.state.post.title, store.state.post.body)
            try {
                await axios.post('http://localhost:3001/posts', {
                    title: store.state.post.title,
                    body: store.state.post.body,
                })
                }
                catch (e){
                    console.log(e)
                }
            console.log("Post added")

            store.commit('setPost', {
                title: '',
                body: ''
            })
            store.dispatch('fetchPosts')

        },

        async deletePost(store, id){
            const posts = store.state.posts.filter(p => p._id !== id)
            try {
                await axios.delete('http://localhost:3001/posts/' + id)
            }
            catch (e){
                console.log(e)
            }
            store.commit('setPosts', posts)
            console.log("Post deleted")
        },

        modalVisible(store, bool){
            store.commit('setShowModal', bool)
        },

    }
})