<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
            Reset password
        </h1>
        <FormKit
            type="form"
            :actions="false"
            @submit="handleSubmit"
            #default="{ state: { valid } }"
        >
            <FormKitMessages />

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
                label="Reset"
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
        const router = useRouter();

        const handleSubmit = () => {
            // reset password

            // push to login
            router.push("/auth/login");
        };

        return {
            handleSubmit,
        };
    },
};
</script>