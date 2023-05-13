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
        setUser(state, payload){
            state.user.username = payload.username
            state.user._id = payload._id
        },
        setAccessToken(state, payload){
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

        // Модальное окно
        modalVisible(store, bool){
            store.commit('setShowModal', bool)
        },
        async register(state, newUser){
            if (newUser.username.length === 0 || newUser.password.length < 4 || newUser.password.length > 20){
                state.commit('setAuthMessage', 'Некоректный логин или пароль')
                return false
            }
            
            try{
                const res = await axios.post("http://localhost:3001/auth/registration", {
                    username: newUser.username,
                    password: newUser.password
                })
                if (res.body.status === 200){
                    state.commit('setAuthMessage', 'Вы успешно зарегистрировали пользователя!')
                }

            } catch(e){
                state.commit('setAuthMessage', 'Пользователь с таким логином уже существует')
                console.log(e)
            }
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

                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('refreshToken', refreshToken)

                    state.commit("setUser", {
                        username: resUser.username,
                        _id: resUser._id
                    })
                    state.commit("setAccessToken", {
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
            state.commit("setUser", {
                username: null,
                _id: null
            })
            state.commit("setAccessToken", {
                refreshToken: null,
                accessToken: null
            })
            state.commit("setAuth", false)
            state.dispatch("modalVisible", false)

            localStorage.setItem('accessToken', null)
            localStorage.setItem('refreshToken', null)

        },
        async checkAccessToken(state){
            const checkAccessToken = localStorage.getItem('accessToken')
            try{
                const result = await axios.get("http://localhost:3001/auth/checkAccessToken", {
                    headers:{
                        Authorization: "Bearier " + checkAccessToken
                    }
                })

                const resUser = result.data.user
                
                const accessToken = result.data.accessToken
                const refreshToken = result.data.user.refresh_token

                console.log(accessToken)
                console.log(refreshToken)

                state.commit("setAuth", true)

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)

                state.commit("setUser", {
                    username: resUser.username,
                    _id: resUser._id
                })
                state.commit("setAccessToken", {
                    refreshToken: refreshToken,
                    accessToken: accessToken
                })
                state.dispatch("modalVisible", false)

                return false
            } catch(e){
                console.log("Токен не валидный")
                state.dispatch('checkRefreshToken')
                console.log(e)
            }
        },
        async checkRefreshToken(){
            console.log('checkRefresh')
        }
    }
})