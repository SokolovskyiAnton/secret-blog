<template>
	<div class="login-wrapper">
		<div class="login-container">
			<div class="login-header">
				<h1 class="login-title">Log In</h1>
			</div>
			<div class="input-box">
				<input type="text" class="input-field" placeholder="First name" />
			</div>
			<div class="input-box">
				<input type="text" class="input-field" placeholder="Last name" />
			</div>
			<div class="input-box">
				<input type="text" class="input-field" placeholder="Email" />
			</div>
			<div class="button-arrow">
				<button class="login-button button-blue">Log in</button>
			</div>
			<div class="checkbox-terms-agree input-box">
				<p class="terms-agree">
					Don't have an account?
					<span class="create-one"
						><router-link class="plain-link" :to="{ name: 'SignupView' }"
							>Create one</router-link
						></span
					>
				</p>
			</div>
		</div>
	</div>
</template>
