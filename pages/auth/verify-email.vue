<template>
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
            Email verification
        </h1>
        <FormKit
            type="form"
            :actions="false"
            @submit="handleSubmit"
            #default="{ state: { valid } }"
        >
            <FormKitMessages />

            <FormKit
                type="number"
                label="Code"
                help="We've sent a code to your email"
                validation="required|number"
            />

            <!-- <FormKit
                :type="otp"
                digits="4"
                label="One-time password"
                name="two_factor_code"
                help="We’ve sent a code to your phone."
                validation="required"
                validation-visibility="live"
            /> -->

            <FormKit
                type="submit"
                label="Verify"
                input-class="btn btn-lg btn-primary"
                :disabled="!valid"
            />
        </FormKit>
    </div>
</template>

<script>
import { FormKitMessages } from "@formkit/vue";
import { createInput } from "@formkit/vue";
import OneTimePassword from "@/components/OneTimePassword.vue";

definePageMeta({
    layout: "auth",
});

export default {
    components: {
        FormKitMessages,
    },
    setup() {
        const router = useRouter();
        const values = ref({});
        const otp = createInput(OneTimePassword, {
            props: ["digits"],
        });

        const handleSubmit = () => {
            // send code

            // push to new page
            router.push("/auth/reset-password");
        };

        return {
            values,
            otp,
            handleSubmit,
        };
    },
};
</script>