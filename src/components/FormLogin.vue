<script setup>
import { ref } from "vue";
import { useMessage, NCard, NForm, NFormItem, NInput, NButton, NImage, NText, NGrid, NGi, NIcon, NCheckbox } from "naive-ui";
import { LockClosedOutline, PersonOutline, LogoFacebook, LogoTwitter, LogoGoogle, EyeOutline, EyeOffOutline, LogoFirebase } from "@vicons/ionicons5";
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import imgLogin from '@/assets/images/login.svg';
const authStore = useAuthStore();
const router = useRouter()
const formRef = ref(null);
const message = useMessage();
const isLoadind = ref(false);
const showPassword = ref(false);
const isFirebaseLogin = ref(false);
const formValue = ref({
    user: {
        user_id: "",
        password: "",
    },
});

const rules = {
    user: {
        user_id: {
            required: true,
            message: "Please input your username",
            trigger: ["input", "blur"],
        },
        password: {
            required: true,
            message: "Please input password",
            trigger: ["input", "blur"],
        },
    },
};

const handleLogin = async (e) => {
    e.preventDefault();
    const urlRedirect = localStorage.getItem("redirectUrl") || "/"
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            isLoadind.value = true;
            const result = await authStore.login(formValue.value.user);
            isLoadind.value = false;

            if (result.success) {
                message.success(result.message);
                return router.replace(`${urlRedirect}`);
            } else {
                message.error(result.message);
            }
        } else {
            console.log(errors);
            message.error("Please fill in all information");
        }
    });
};



</script>

<template>
    <div class="login-page">
        <n-card class="login-card">
            <n-grid responsive="screen" cols="1 s:1 m:2 l:2 xl:2" x-gap="12">
                <n-gi class="image-container">
                    <n-image width="100%" preview-disabled :src="imgLogin" />
                    <div style="text-align: center;">
                        <n-text underline>Create an account?</n-text>
                    </div>
                </n-gi>
                <n-gi>
                    <h1 style="padding-bottom: 20px">Login</h1>
                    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
                        <n-form-item label="Username" path="user.user_id">
                            <n-input v-model:value="formValue.user.user_id" placeholder="Username">
                                <template #prefix>
                                    <n-icon :component="PersonOutline" />
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item label="Password" path="user.password">
                            <n-input v-model:value="formValue.user.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Password">
                                <template #prefix>
                                    <n-icon :component="LockClosedOutline" />
                                </template>
                                <template #suffix>
                                    <n-icon :component="showPassword ? EyeOutline : EyeOffOutline"
                                        style="cursor: pointer" @click="showPassword = !showPassword" />
                                </template>
                            </n-input>
                        </n-form-item>
                        <div class="login-options">
                            <n-checkbox v-model="rememberMe">Remember me</n-checkbox>
                            <n-link href="#" class="forgot-password-link">
                                Forgot your password?
                            </n-link>
                        </div>
                        <n-form-item>
                            <n-button class="btn-login" size="large" @click="handleLogin" type="info"
                                :loading="isLoadind" :disabled="isLoadind">
                                Log in
                            </n-button>
                        </n-form-item>
                    </n-form>
                    <div class="divider">
                        <span>Or continue with</span>
                    </div>

                    <div class="social-login">
                        <n-button class="social-btn" text>
                            <n-icon class="social-icon" :component="LogoFirebase" />
                        </n-button>
                        <n-button class="social-btn" text>
                            <n-icon class="social-icon" :component="LogoFacebook" />
                        </n-button>
                        <n-button class="social-btn" text>
                            <n-icon class="social-icon" :component="LogoGoogle" />
                        </n-button>
                    </div>
                </n-gi>
            </n-grid>
        </n-card>
    </div>
</template>


<style scoped>
@media (max-width: 768px) {
    .image-container {
        display: none;
    }

    h1 {
        font-size: 24px;
        text-align: center;
    }

    .n-form-item {
        margin-bottom: 16px;
    }

    .btn-login {
        width: 100%;
    }

    .login-page {
        display: flex;
        height: 100vh;
        background-color: #ffffff;
    }

    .login-card {
        box-shadow: none
    }

    .n-card.n-card--bordered {
        border: none;
    }
}

@media (min-width: 768px) {
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f2f5;
    }

    .login-card {
        margin: auto;
        max-width: 980px;
        max-height: fit-content;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }


    .image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .image-container .n-image {
        max-height: 300px;
        width: auto;
        height: auto;
        object-fit: contain;
    }

    .image-container .n-text {
        text-align: center;
        cursor: pointer;
    }

    .image-container .n-text:hover {
        text-decoration: underline;
    }
}


.n-input {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f0;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.n-input:hover {
    background-color: #e0e0e0;
}

.n-input:focus {
    background-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}


.n-button {
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.n-button:hover {
    transform: translateY(-2px);
}

.n-button:active {
    transform: translateY(0);
}

.n-form-item {
    margin-bottom: 8px;
}




.login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
}

.social-login .social-icon {
    font-size: 24px;
    color: #007bff;
    transition: transform 0.3s ease-in-out;
}

.social-login .social-icon:hover {
    transform: scale(1.2);
    color: #0056b3;
}
</style>