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
        user: {
            username: null,
            _id: null,
            refreshToken: localStorage.getItem("refreshToken") || null
        },
        authMessage: 'test',
        isAuth: false,
        accessToken: localStorage.getItem("accessToken") || null
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
        },
        setAuth(state, bool){
            state.isAuth = bool
        },
        setUserAndAccessToken(state, payload){
            state.user.username = payload.username
            state.user._id = payload._id
            state.user.refreshToken = payload.refreshToken

            state.accessToken = payload.accessToken
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
        async register(state, user){
            if (user.username.length === 0 || user.password.length < 4 || user.password.length > 20){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                return false
            }
            
            // try{

            // } catch(e){
            //     console.log(e)
            // }
        },
        async login(state, user){

            // Проверка длинны пароля и логина
            if (user.username.length === 0 || user.password.length < 4 || user.password.length > 20){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                return false
            }

            try{

                // Логинимся
                const res = await axios.post('http://localhost:3001/auth/login', {
                    username: user.username,
                    password: user.password
                })
                console.log(res.data)

                // Если залогинились
                if (res.data.status === 200){
                    state.commit("setAuth", true)
                    
                    const accessToken = res.data.accessToken
                    const refreshToken = res.data.user.refresh_token
                    const resUser = res.data.user

                    state.commit("setUserAndAccessToken", {
                        username: resUser.username,
                        _id: resUser._id,
                        refreshToken: refreshToken,
                        accessToken: accessToken
                    })
                    state.dispatch("modalVisible", false)
                }




            } catch(e){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                console.log(e)
            }
            
        },
        async logout(state){
            try{
                await axios.put('http://localhost:3001/auth/logout/' + state.state.user._id)
                console.log('refresh token удалён')
            } catch (e){
                console.log(e)
            }
            state.commit("setUserAndAccessToken", {
                username: null,
                _id: null,
                refreshToken: null,
                accessToken: null
            })
            state.commit("setAuth", false)
            state.dispatch("modalVisible", false)

            
        }
        
    }
})