<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
            Forgot password?
        </h1>
        <FormKit
            type="form"
            :actions="false"
            @submit="handleSubmit"
            #default="{ state: { valid } }"
        >
            <FormKitMessages />

            <FormKit
                type="email"
                label="Email address"
                help="Enter your email address to reset your password"
                validation="required|email"
            />
            <FormKit
                type="submit"
                label="Send code"
                input-class="btn btn-lg btn-primary"
                :disabled="!valid"
            />
        </FormKit>
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
            // send code

            // push to new page
            router.push('/auth/verify-email')
        };

        return {
            handleSubmit,
        };
    },
};
</script>