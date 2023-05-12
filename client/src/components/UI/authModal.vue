<template>
    <div class="main" v-if="show" @click="modalVisible(false)">
        <div class="main__content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default{
    name: "modalWindow",
    props: {
        show: {
            type: Boolean,
            default: false
        } 
    },
    methods: {
        ...mapActions({
            modalVisible: 'modalVisible'
        })
    }
}
</script>

<style scoped lang="scss">
    
    .main{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;

        display: flex;

        &__content{

            margin: auto;
            padding: 15px;
            
            background-color: #ffffff;

            border-radius: 15px;

            min-height: 50px;
            min-width: 300px;
        } 
    }

       

</style>