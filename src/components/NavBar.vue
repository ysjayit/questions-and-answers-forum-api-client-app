<script>

export default {
    methods: {
        // logout user
        logout() {
            localStorage.removeItem('user-token');
            localStorage.removeItem('user-role');
            localStorage.removeItem('user-name');
            this.$router.push('/');
        },
    },

}

</script>

<template>
    <div class="row">
        <nav class="navbar navbar-expand-sm bg-primary navbar-dark rounded">
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="text-light" to="/dashboard">Forum</RouterLink>
                    </li>
                </ul>
                <button class="btn btn-outline-light" @click="logout()">Logout</button>
            </div>
        </nav>
    </div>
</template>