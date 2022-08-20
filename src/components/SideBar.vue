<script>

export default {
    data() {
        return {
            userRole: localStorage.getItem('user-role')
        }
    },
}

</script>

<template>
    <div class="col-3 rounded">
        <ul class="list-group">
            <li class="list-group-item"><RouterLink to="/dashboard">Home</RouterLink></li>
            <li class="list-group-item"><RouterLink to="/post/create">Create</RouterLink></li>
            <li class="list-group-item"><RouterLink to="/posts/user">My Posts</RouterLink></li>
            <li class="list-group-item" v-if="userRole == 'admin'"><RouterLink to="/posts/manage">Post Management</RouterLink></li>
        </ul>
    </div>
</template>
