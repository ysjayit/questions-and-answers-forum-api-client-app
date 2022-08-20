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
                userposts: {},
            }
        }
    },
    mounted() {
        // call users posts on component mounted
        this.getUserPosts();
    },
    methods: {
        // get users posts
        getUserPosts() {
            axios.get(config.base_url+'posts/showbystatus/draft', { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                this.data.userposts = response.data.data;
            });
        },
        // view post
        viewPost(id) {
            this.$router.push({ name: 'post', params: { id: id }});
        },
        // update post
        updatePost(id, index, status) {
            axios.put(config.base_url+'posts/'+id, { status: status }, { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                this.data.userposts.splice(index, 1);
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
                <ul class="list-group">
                    <li class="list-group-item" v-for="(post, index) in data.userposts">
                        <div class="row">
                            <div class="col-8">
                                {{post.title}}
                            </div>
                            <div class="col-4">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary" v-if="post.status == 'draft'">{{post.status.toUpperCase()}}</button>
                                    <button type="button" class="btn btn-success" v-else-if="post.status == 'approved'">{{post.status.toUpperCase()}}</button>
                                    <button type="button" class="btn btn-danger" v-else-if="post.status == 'rejected'">{{post.status.toUpperCase()}}</button>

                                    <button type="button" class="btn btn-primary" @click="viewPost(post.id)">View</button>
                                    <button type="button" class="btn btn-success" @click="updatePost(post.id, index, 'approved')">Approve</button>
                                    <button type="button" class="btn btn-danger" @click="updatePost(post.id, index, 'rejected')">Reject</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>
