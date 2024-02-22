<template>
    <div>
        <div v-if="isAuth">
            <InputComponent v-model="message"/>
            <button @click="handleClick">Create</button>
        </div>
        <div v-else>
            <p>please <router-link :to="{ name: 'LoginView' }">login</router-link></p>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';
import InputComponent from "@/components/InputComponent.vue"
import { ref } from 'vue';

const emit = defineEmits(["createComment"])
const userStore = useUserStore();
const message = ref("")
const { isAuth } = storeToRefs(userStore)

const handleClick = () => {
    emit("createComment", message.value)
}
</script>

