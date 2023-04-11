<template>
    <div class="personalPageWhole" :style="{
		'--color':color}">个人主页
        <div>
            <svg></svg>
        </div>
        </div>
</template>

<script>
import other from '@/api/other.js'
import user from '@/api/user'
export default{
    data(){
        var test = JSON.parse(window.localStorage.getItem('testCss'))
        var color = test.colorCss
        return{
            color
        }
    }

}
</script>

<style>
.personalPageWhole {
    color: var(--color)
}
</style>