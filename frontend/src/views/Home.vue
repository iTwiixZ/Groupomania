<template>
    <div>
        <groupomania/>
        <login/>
    </div>
</template>

<script>
import groupomania from '@/components/Groupomania.vue'
import Login from '../components/Login.vue'
 
export default{
    name:'Home',
    components:{groupomania,
        Login
    }
}
</script>


