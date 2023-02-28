<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
            Begin your journey here
        </h1>
        <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            @submit="handleSubmit"
            :actions="false"
        >
            <FormKitMessages />

            <FormKit
                type="text"
                name="name"
                label="Your name"
                placeholder="Jane Doe"
                validation="required"
            />
            <FormKit
                type="email"
                name="email"
                label="Your email"
                placeholder="name@company.com"
                validation="required|email"
            />
            <div class="double">
                <FormKit
                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                        matches: 'Please include at least one symbol',
                    }"
                    placeholder="Your password"
                />
                <FormKit
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm"
                />
            </div>

            <FormKit
                type="submit"
                label="Register"
                input-class="btn btn-lg btn-primary"
                :disabled="!valid"
            />
        </FormKit>

        <p class="text-sm font-light text-gray-500">
            Already registered?
            <nuxt-link
                href="/auth/login"
                class="font-medium text-primary-600 underline"
                >Sign in</nuxt-link
            >
        </p>
    </div>
</template>

<script>
import { ref } from "vue";
import { FormKitMessages } from "@formkit/vue";

definePageMeta({
    layout: "auth",
});

export default {
    components: {
        FormKitMessages,
    },
    setup() {
        const submitted = ref(false);
        const submitHandler = async (credentials) => {
            // create user account

            console.log(credentials);

            submitted.value = true;
        };

        return {
            submitted,
            submitHandler,
        };
    },
};
</script>