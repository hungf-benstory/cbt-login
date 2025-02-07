<script setup>
import { ref } from "vue";
import { useMessage, useLoadingBar, NCard, NForm, NFormItem, NInput, NModal, NButton, NImage, NText, NGrid, NGi, NIcon, NCheckbox, NA } from "naive-ui";
import { LockClosedOutline, PersonOutline, LogoFacebook, MailUnreadOutline, LogoGoogle, EyeOutline, EyeOffOutline, LogoFirebase } from "@vicons/ionicons5";
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import imgLogin from '@/assets/images/login.svg';
import imgLoginBg from '@/assets/images/login-illustration.png';

import imgLogo from '@/assets/images/logo.png';
const authStore = useAuthStore();
const router = useRouter()
const loadingBar = useLoadingBar();
const formRef = ref(null);
const message = useMessage();
const isLoading = ref(false);
const showPassword = ref(false);
const isSignUp = ref(false);
const showModal = ref(false);
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
        password_confirm: {
            required: true,
            message: "Please input confirm password",
            trigger: ["input", "blur"],
        },
    },
};

const handleLogin = async (e) => {
    e.preventDefault();
    loadingBar.start();
    const urlRedirect = localStorage.getItem("redirectUrl") || "/"
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            isLoading.value = true;
            const result = await authStore.login(formValue.value.user);
            isLoading.value = false;

            if (result.success) {
                loadingBar.finish();
                message.success(result.message);
                return router.replace(`${urlRedirect}`);
            } else {
                message.error(result.message);
            }
        } else {
            console.log(errors);
            loadingBar.finish();
            message.error("Please fill in all information");
        }
        loadingBar.finish();
    });
};

const handleSignUp = () => {
    message.info("Incoming!!!");
}


const goSignUp = () => {
    isSignUp.value = !isSignUp.value
}

const getOTP = () => {
    message.info("Incoming!!!");
}

</script>

<template>
    <div class="login-page">
        <n-card class="login-card">
            <!-- <div style="text-align: center;">
                <n-image height="100px" preview-disabled :src="imgLogo" />
            </div> -->
            <n-grid responsive="screen" cols="1 s:1 m:2 l:2 xl:2" x-gap="12">
                <n-gi class="image-container">
                    <n-image width="100%" height="100%" preview-disabled :src="imgLoginBg" />
                    <div style="text-align: center;">
                        <n-a href="#">
                            <n-text underline>Create an account?</n-text>
                        </n-a>
                    </div>
                </n-gi>
                <n-gi>
                    <h1 v-if="!isSignUp" style="padding-bottom: 20px">Sign in to your account</h1>
                    <h1 v-else style="padding-bottom: 20px">Create your account?</h1>
                    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
                        <n-form-item v-if="isSignUp" label="Email" path="user.user_id">
                            <n-input v-model:value="formValue.user.user_id" placeholder="Email">
                                <template #prefix>
                                    <n-icon :component="PersonOutline" />
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item v-else label="Username" path="user.user_id">
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
                        <n-form-item v-show="isSignUp" label="Confirm password" path="user.password_confirm">
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
                        <div v-show="!isSignUp" class="login-options">
                            <n-checkbox v-model="rememberMe" class="custom-checkbox">Remember me</n-checkbox>
                            <n-a style="color: #3182ce" @click="showModal = true">
                                Forgot your password?
                            </n-a>
                        </div>
                        <n-form-item>
                            <n-button v-if="!isSignUp" class="btn-login" size="large" @click="handleLogin" type="info"
                                :loading="isLoading" :disabled="isLoading">
                                Sign in
                            </n-button>
                            <n-button v-else class="btn-login" size="large" @click="handleSignUp" type="info"
                                :loading="isLoading" :disabled="isLoading">
                                Sign up
                            </n-button>
                        </n-form-item>
                    </n-form>
                    <div class="sign-up">
                        <span v-if="!isSignUp">Don’t have an account yet?
                            <n-a style="color: #3182ce" @click="goSignUp()"> Sign up</n-a></span>
                        <span v-else>Already have an account?
                            <n-a style="color: #3182ce" @click="goSignUp()">Sign in</n-a></span>
                    </div>
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
        <n-modal v-model:show="showModal">
            <n-card style="width: 400px" title="Verify your Email" :bordered="false" size="huge" role="dialog"
                aria-modal="true">
                <n-input placeholder="Email get OTP">
                    <template #prefix>
                        <n-icon :component="MailUnreadOutline" />
                    </template>
                </n-input>
                &nbsp;
                <div></div>
                <n-button type="info" style="float:right" @click="getOTP">
                    Get OTP
                </n-button>
            </n-card>
        </n-modal>
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
        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px; */
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

.login-page {
    /* background-color: #d9bd32 */
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

.sign-up {
    margin-top: -20px;
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

.n-checkbox .n-checkbox-box .n-checkbox-icon {
    background-color: red;
    border-color: red;
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
}

.divider::before,
.divider::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: #e2e8f0;
}

.divider::before {
    margin-right: 8px;
}

.divider::after {
    margin-left: 8px;
}

.social-login {
    display: flex;
    justify-content: space-around;
}

.social-btn {
    padding: 0;
}
</style>