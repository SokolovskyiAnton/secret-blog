<template>
	<Teleport to="body">
		<Transition name="modal-fade">
			<div
				class="modal-wrapper modal"
				@click.self="store.closeModal"
				v-if="component"
				aria-modal="true"
				role="dialog"
				tabindex="-1"
			>
				<div class="modal__inner">
					<div class="modal__inner__closeBtn" @click.self="store.closeModal">
						<!-- <img src="..src/images/close-icon.svg" alt=""> -->
						X
					</div>
					<component :is="component" v-bind="props" />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useModalStore } from "../stores/modalStore";

const store = useModalStore();

const component = computed(() => store.modalState?.component);
const props = computed(() => store.modalState?.props);

const keyDownListener = (event) => {
	if (event.key === "Escape") store.closeModal();
};

onMounted(() => {
	document.addEventListener("keydown", keyDownListener);
});

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownListener());
});
</script>

<style lang="scss">
.modal-wrapper,
.modal {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 500;
	width: 100vw;
	height: 100vh;
	background: var( --black-color-6);
	display: grid;
	place-items: center;

	&__inner {
		background-color: white;
		padding: 40px 48px;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		width: 600px;

		&__closeBtn {
			text-align: right;
			font-weight: bold;
			&:hover {
				cursor: pointer;
			}
		}
	}
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: 0.25s ease all;
}

@media (max-width: 425px) {
	.modal__inner {
		width: 80%;
		height: fit-content;
		overflow-y: auto;
		max-height: 95%;
	}
	
}
</style>
