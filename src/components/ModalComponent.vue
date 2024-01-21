<template>
	<Teleport to="body">
		<Transition name="modal-fade">
			<div
				class="modal"
				@click.self="modalStore.closeModal"
				v-if="component"
				aria-modal="true"
				role="dialog"
				tabindex="-1"
			>
				<div class="modal__inner">
					<div class="modal__inner__header">
						<span @click.self="modalStore.closeModal">&#9587;</span>
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

const modalStore = useModalStore();

const component = computed(() => modalStore.modalState?.component);
const props = computed(() => modalStore.modalState?.props);

const keyDownListener = (event) => {
	if (event.key === "Escape") modalStore.closeModal();
};

onMounted(() => {
	document.addEventListener("keydown", keyDownListener);
});

onUnmounted(() => {
	document.removeEventListener("keydown", keyDownListener());
});
</script>

<style lang="scss">
.modal {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 500;
	width: 100vw;
	height: 100vh;
	background: var(--black-color-6);
	display: grid;
	place-items: center;

	&__inner {
		background-color: white;
		padding: 40px 48px;
		border-radius: 1rem;

		&__header {
			text-align: right;
			font-weight: bold;
			margin-bottom: 16px;
			span {
				font-size: 12px;
				&:hover {
					cursor: pointer;
				}
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
