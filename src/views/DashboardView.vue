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
                publishedposts: {},
                temppublishedposts: {},
                searchterm: ''
            },
        }
    },
    mounted() {
        // call published posts on component mounted
        this.getPublishedPosts();
    },
    methods: {
        // get published posts
        getPublishedPosts() {
            axios.get(config.base_url+'posts/showbystatus/approved', { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                
                this.data.publishedposts = response.data.data;

            });
        },
        // view post
        viewPost(id) {
            this.$router.push({ name: 'post', params: {id: id }});
        },
        // search posts
        searchPosts() {

            let search = this.data.searchterm;
            this.data.temppublishedposts = this.data.publishedposts;

            axios.post(config.base_url+'posts/search', { term: search }, { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                
                this.data.publishedposts = response.data.data;
                
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

                <input class="form-control form-control-lg mb-3" type="text" v-model="data.searchterm" @keyup="searchPosts()" placeholder="Search">
                
                <ul class="list-group">
                    <li class="list-group-item" v-for="(post, index) in data.publishedposts">
                        <div class="row">
                            <div class="col-9">
                                {{post.title}}
                            </div>
                            <div class="col-3">
                                <button type="button" class="btn btn-outline-primary float-end" @click="viewPost(post.id)">
                                    View
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>
