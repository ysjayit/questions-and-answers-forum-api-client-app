<script setup>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
</script>
<script>
import axios from 'axios'
import {config} from '../config';

export default {
    data() {
        return {
            data: {
                post: {
                    title: '',
                    content: ''
                },
            },
            errors: '',
        }
    },
    methods: {
        // create post
        createPost() {
            axios.post(config.base_url+'posts/', this.data.post, 
                    { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                this.data.post.title = null;
                this.data.post.content = null;
                this.$router.push('/posts/user');
            }).catch(error => {
                let message;
                if (axios.isAxiosError(error) && error.response) {
                    message = error.response.data.message;
                }
                this.errors = message;
            });
        },
    },

}

</script>

<template>

    <div class="container">

        <NavBar />

        <div class="row mt-3">

            <SideBar />

            <div class="col-9 rounded">

                <div class="card">
                    <div class="card-header">
                        Create Post
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <p v-if="errors" style="color:red">{{errors}}</p>
                        </div>
                        <div class="row mt-3">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="data.post.title" placeholder="Title" />
                            </div>
                            <div class="form-group mt-2">
                                <textarea class="form-control" v-model="data.post.content" rows="3" placeholder="Content"></textarea>
                            </div>
                            <div class="form-group mt-2">
                                <button type="button" @click="createPost()" class="btn btn-primary">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>