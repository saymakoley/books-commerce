<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
            Sign in to your account
        </h1>
        <FormKit type="form"  :actions="false" @submit="handleSubmit" #default="{ state: { valid } }">
            <FormKitMessages />

            <FormKit
                type="email"
                name="email"
                label="Your email"
                placeholder="name@company.com"
                validation="required|email"
            />
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
            <div class="pb-6 flex justify-end">
                <nuxt-link
                    to="/auth/forgot-password"
                    class="text-sm font-medium text-primary-600 underline"
                    >Forgot password?</nuxt-link
                >
            </div>

            <FormKit
                type="submit"
                label="Sign in"
                input-class="btn btn-lg btn-primary"
                :disabled="!valid"
            />
        </FormKit>

        <p class="text-sm font-light text-gray-500">
            Don’t have an account yet?
            <nuxt-link
                href="/auth/get-started"
                class="font-medium text-primary-600 underline"
                >Sign up</nuxt-link
            >
        </p>
    </div>
</template>

<script>
import { FormKitMessages } from "@formkit/vue";

definePageMeta({
    layout: "auth",
});

export default {
    components: {
        FormKitMessages,
    },

    setup() {
        const router = useRouter()
        const handleSubmit = () => {
            // log user in

            router.push('/')
        }

        return {
            handleSubmit
        }
    }
};
</script>