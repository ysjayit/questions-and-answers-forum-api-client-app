<script setup>
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
</script>
<script>
import axios from 'axios'
import {config} from '../config';

export default {
    props: ['id'],
    data() {
        return {
            data: {
                post: {},
                comments: {},
                comment: ''
            },
            errors: '',
        }
    },
    mounted() {
        // call get post on component mounted
        this.getPost();
    },
    methods: {
        // get post
        getPost() {
            axios.get(config.base_url+'posts/'+this.id, { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                // console.log(response.data.data);
                this.data.post = response.data.data;
                this.data.comments = response.data.data.comments;

            });
        },
        // create comment
        createComment() {
            axios.post(config.base_url+'posts/'+this.id+'/comments',
                    { comment: this.data.comment }, 
                    { headers: {"Authorization" : `Bearer ${localStorage.getItem('user-token')}`} }).then((response)=>{
                this.data.comments.push({comment: this.data.comment});
                this.data.comment = null;
                this.errors = '';
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
                    <div class="card-body">
                        <h5 class="card-title">{{data.post.title}}</h5>
                        <p class="card-text">{{data.post.content}}</p>
                        <p class="mb-0"><i>{{data.post.date}}</i></p>
                    </div>
                </div>

                <div class="row mt-3" v-if="data.post.status == 'approved'">
                    <div class="mb-3">
                        <p v-if="errors" style="color:red">{{errors}}</p>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" v-model="data.comment" rows="3"></textarea>
                    </div>
                    <div class="form-group mt-2">
                        <button type="button" @click="createComment()" class="btn btn-primary">Comment</button>
                    </div>
                </div>

                <div class="card mt-3 mb-5" v-if="data.post.status == 'approved'">
                    <div class="card-header">
                        <strong>Comments</strong>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush rounded">
                            <li class="list-group-item" v-for="(item, index) in data.comments" v-if="data.comments">
                                {{item.comment}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>