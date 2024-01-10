<template>
	<div class="container">
		<div class="profile-form">
			<div class="profile-form__content">
				<div class="profile-form__content__avatar-box">
					<img
						class="profile-form__content__avatar-box__avatar-image"
						:src="form.avatar ? form.avatar : './icons/default-user-icon.svg'"
						alt="User photo"
					/>
					<div class="profile-form__content__avatar-box__edit-image">
						<label
							class="profile-form__content__avatar-box__edit-image__icon"
							@click.prevent="openImageInput"
						>
						</label>
						<input
							class="profile-form__content__avatar-box__edit-image__input"
							ref="imageInput"
							type="file"
							@change="handleImageChange"
						/>
					</div>
				</div>
				<form class="profile-form__content__user-data">
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="nickname"
							>Nickname</label
						>
						<InputComponent v-model="form.nickname" />
					</div>
					<div class="profile-form__content__user-data__user-fullName">
						<div
							class="profile-form__content__user-data__user-fullName__user-details"
						>
							<label
								class="profile-form__content__user-data__user-fullName__user-details__user-label"
								for="fname"
								>First name</label
							>
							<InputComponent v-model="form.lastName" disabled />
						</div>
						<div class="profile-form__content__user-data__user-details">
							<label
								class="profile-form__content__user-data__user-details__user-label"
								for="lname"
								>Last name</label
							>
							<InputComponent v-model="form.lastName" disabled />
						</div>
					</div>
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="email"
							>Email</label
						>
						<InputComponent v-model="form.email" />
					</div>
					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="profession"
							>Profession</label
						>
						<InputComponent v-model="form.profession" />
					</div>

					<div class="profile-form__content__user-data__user-details">
						<label
							class="profile-form__content__user-data__user-details__user-label"
							for="skills"
							>Skills</label
						>
						<InputComponent v-model="form.skills" />
					</div>

					<div class="profile-form__content__user-data__buttons">
						<button
							type="button"
							class="profile-form__content__user-data__buttons__cancel-button"
							:disabled="!isDisabled"
							:class="{ disabledButton: !isDisabled }"
							@click.prevent="cancelChangedData"
						>
							Cancel
						</button>
						<button
							type="button"
							class="profile-form__content__user-data__buttons__save-button"
							:class="{ disabledButton: !isDisabled }"
							:disabled="!isDisabled"
							@click.prevent="saveData"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import api from "../api";
import InputComponent from "../components/InputComponent.vue";

const userStore = useUserStore();
const form = ref({
	email: "",
	nickname: "",
	profession: "",
	skills: "",
	avatar: "",
});
const imageInput = ref(null);
const updatedForm = ref(null);

const isDisabled = computed(() => {
  if (!updatedForm.value) return;
  return Object.keys(form.value).some((field) => {
    return form.value[field] !== updatedForm.value[field];
  });
});
const usersData = computed(() => {
  return userStore.getUserData;
});
const openImageInput = () => {
	imageInput.value.click();
};

const handleImageChange = async (event) => {
	const file = event.target.files[0];
	form.value.avatar = URL.createObjectURL(file);

	const formData = new FormData();
	formData.append("file", file);

	await api.put(`/users/upload`, formData);
};

const saveData = async () => {
  // ToDO refactor. Create request in store
  userStore.state = await api.patch(`/users`, form.value);
};

const cancelChangedData = () => {
	form.value = { ...usersData.value };
};

onMounted(async () => {
	const userExists = Object.values(usersData?.value)?.length > 0;

	if (!userExists) await userStore.getUser();

	form.value = { ...usersData.value };
	updatedForm.value = { ...usersData.value };
});
</script>

<style lang="scss">
// Refactor styles
%user-details-styles {
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 16px;

	label {
		font-size: 24px;
	}

	input {
		padding: 12px;
		border-radius: 12px;
		border: 2px solid var(--black-color-5);
		width: 100%;
	}
}

.profile-form {
	display: flex;
	justify-content: center;
	margin-top: 16px;
	position: relative;

	&__content {
		&__avatar-box {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			&__avatar-image {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				object-fit: cover;
			}

			&__edit-image {
				position: absolute;
				right: 148px;
				top: 168px;

				&__icon {
					padding-left: 28px;
					background-image: url("../assets/images/edit-icon.svg");
					background-repeat: no-repeat;
					background-position: 2px center;
					background-size: 28px;

					&:hover {
						cursor: pointer;
					}
				}
				&__input {
					display: none;
				}
			}
		}

		&__user-data {
			&__user-details {
				@extend %user-details-styles;
			}

			&__user-fullName {
				display: flex;
				justify-content: space-between;

				&__user-details {
					@extend %user-details-styles;

					&__user-input-disabled {
						padding: 12px;
						border-radius: 12px;
						color: var(--black-color-3);
					}
				}
			}

			&__buttons {
				&__cancel-button {
					font-weight: bold;
					color: var(--blue-color-3);
					height: 48px;
					padding: 0 24px;
					border-radius: 24px;
					border: 2px solid var(--blue-color-3);
					background-color: transparent;
					box-sizing: border-box;

					&:hover:enabled {
						cursor: pointer;
						color: var(--blue-color-1);
						border: 2px solid var(--blue-color-1);
					}
				}
				&__save-button {
					font-weight: bold;
					color: var(--green-color-2);
					height: 48px;
					padding: 0 24px;
					border-radius: 24px;
					border: 2px solid var(--green-color-2);
					background-color: transparent;
					box-sizing: border-box;

					&:hover:enabled {
						cursor: pointer;
						color: var(--green-color-1);
						border: 2px solid var(--green-color-1);
					}
				}
			}
		}
	}
}

.disabledButton {
	color: var(--black-color-5);
	border: 2px solid var(--black-color-5);
}

@media (max-width: 768px) {
	.profile-form__user-data {
	}
	.profile-form__content__user-data__user-fullName {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
	}
}
</style>
