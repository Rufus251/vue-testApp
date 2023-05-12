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
        // Мутации постов
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

        // Модальное окно и регистрация
        modalVisible(store, bool){
            store.commit('setShowModal', bool)
        },
        async login(state, user){
            if (user.username.length === 0 || user.password.length < 4 || user.password.length > 20){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                return false
            }

            try{
                const res = await axios.post('http://localhost:3001/auth/login', {
                    username: user.username,
                    password: user.password
                })
                console.log(res)
            } catch(e){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                console.log(e)
            }
            
        },
        async register(state, user){
            if (user.username.length === 0 || user.password.length < 4 || user.password.length > 20){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                return false
            }
            
            // try{

            // } catch(e){
            //     console.log(e)
            // }
        }
    }
})