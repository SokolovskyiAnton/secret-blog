<template>
	<div class="closeBtn">
		<button @click="store.closeModal" class="closeBtn__styles">Close</button>
	</div>
</template>

<script setup lang="ts">
import { useModalStore } from "../stores/modalStore";

const store = useModalStore();
</script>

<style lang="scss" scoped>
.closeBtn {
	display: flex;
	flex-direction: row-reverse;

	&__styles {
		font-weight: bold;
		color: var(--red-color);
		height: 48px;
		padding: 0 24px;
		border-radius: 24px;
		border: 2px solid var(--red-color);
		background-color: transparent;
		box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
	}
}
</style>
