<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { NMenu, NLayoutHeader, NSpace, NButton, NIcon, NDrawer, NText } from 'naive-ui';
import { MenuOutline as MenuIcon, CloseOutline as CloseIcon } from '@vicons/ionicons5';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore();
const menuVisible = ref(false);
const isMobile = ref(false);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const userInfo = computed(() => authStore.userInfo);


const toggleMenu = () => {
    menuVisible.value = !menuVisible.value;
};

const handleMenuClick = (key) => {
    if (key === 'logout') {
        authStore.logout();
        router.push('/login');
    } else if (key === 'login') {
        router.push('/login');
    }
    else {
        console.log("push", key);
        router.push(`/${key}`)
    }
    menuVisible.value = false;
};

const menuOptions = computed(() => [
    { label: 'About', key: 'about' },
    { label: 'Services', key: 'services' },
    { label: 'Contact', key: 'contact' },
    isLoggedIn.value
        ? {
            label: userInfo.value.user_id,
            key: 'user',
            children: [
                { label: 'Profile', key: 'profile'},
                { label: 'Logout', key: 'logout' }
            ]
        }
        : { label: 'Login', key: 'login' }
]);

watchEffect(() => {
    menuOptions.value = [
        { label: 'About', key: 'about' },
        { label: 'Services', key: 'services' },
        { label: 'Contact', key: 'contact' },
        isLoggedIn.value
            ? {
                label: userInfo.value.user_id,
                key: 'user',
                children: [
                    { label: 'Profile', key: 'profile' },
                    { label: 'Logout', key: 'logout' }
                ]
            }
            : { label: 'Login', key: 'login' }
    ];
});

const handleResize = () => {
    isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <n-layout-header class="navbar">
        <n-space align-items="center" justify="space-between" class="nav-content">
            <div class="logo">
                <n-text strong>MyLogo</n-text>
            </div>
            <n-menu v-if="!isMobile" :options="menuOptions" :collapsed="false" mode="horizontal"
                @update:value="handleMenuClick" />
            <n-button v-if="isMobile" class="menu-button" @click="toggleMenu" circle text size="large">
                <n-icon size="24">
                    <template v-if="menuVisible">
                        <CloseIcon />
                    </template>
                    <template v-else>
                        <MenuIcon />
                    </template>
                </n-icon>
            </n-button>
        </n-space>
        <n-drawer v-model:show="menuVisible" placement="right" size="256">
            <n-menu :options="menuOptions" :collapsed="false" mode="vertical" @update:value="handleMenuClick" />
        </n-drawer>
    </n-layout-header>
</template>


<style scoped>
.navbar {
    height: 64px;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: row;
    filter: drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.25));
    background-color: #e4e2d9;
    padding:0 10px
}

.nav-content {
    max-width: 1200px;
    flex: 1 1 0%;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
}

.menu-button {
    display: flex;
    align-items: center;
}

@media (max-width: 768px) {
    n-menu {
        display: none;
    }
}
</style>