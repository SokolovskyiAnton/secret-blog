<template>
	<div class="signup-wrapper">
		<div class="signup-container">
			<div class="signup-header">
				<h1 class="create-account-title">Create account</h1>
				<span class="create-account-subtitle"
					>Already have an account?
					<router-link class="plain-link" :to="{ name: 'LoginView' }"
						>Log In</router-link
					>
				</span>
			</div>
			<div class="input-box">
				<input type="text" class="input-field" placeholder="Username" />
			</div>
			<div class="input-box first-last-name-input">
				<input
					type="text"
					class="input-field firstname-input"
					placeholder="First name"
				/>
				<input type="text" class="input-field" placeholder="Last name" />
			</div>
			<div class="input-box">
				<input type="text" class="input-field" placeholder="Email" />
			</div>
			<div class="button-arrow">
				<button class="signup-button button-blue">Sign up</button>
				<img
					src="../assets/images/arrow.svg"
					alt="Arrow to the right"
					class="arrow-right-icon"
				/>
			</div>
			<div class="checkbox-terms-agree input-box">
				<input type="checkbox" class="checkbox-terms" />
				<p class="terms-agree">
					I have read and agree to the
					<span class="terms-of-service">Terms of Service</span>
				</p>
			</div>
		</div>
	</div>
</template>
