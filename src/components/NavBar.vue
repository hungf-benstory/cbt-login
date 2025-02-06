<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { NMenu, NLayoutHeader, NSpace, NButton, NIcon, NDrawer, NText } from 'naive-ui';
import { MenuOutline as MenuIcon, CloseOutline as CloseIcon } from '@vicons/ionicons5';
import { useAuthStore } from '../store/authStore';
import logo from '@/assets/images/logo.png'
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
                <n-image strong>MyLogo</n-image>
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
    padding: 0 10px;
    transition: background-color 0.3s ease-in-out;
    animation: slideDown 0.5s ease-in-out;
}

.navbar:hover {
    background-color: #d4d2c9;
}

.nav-content {
    max-width: 1200px;
    flex: 1 1 0%;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    transition: transform 0.2s ease-in-out;
}

.logo:hover {
    transform: scale(1.05);
}

.menu-button {
    display: flex;
    align-items: center;
    transition: transform 0.2s ease-in-out;
}

.menu-button:hover {
    transform: scale(1.1);
}

.menu-button:active {
    transform: scale(0.9);
}

.n-drawer {
    transition: transform 0.3s ease-in-out;
}

.n-drawer--open {
    transform: translateX(0);
}

.n-drawer--closed {
    transform: translateX(100%);
}

.n-menu-item {
    transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
    animation: fadeIn 0.3s ease-in-out;
}

.n-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateX(5px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideDown {
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    n-menu {
        display: none;
    }
}
</style>