<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Edit Auto Calendar</p>
                <p class="fst-italic">Auto Calendar can prevent booking inquiries/requests with big gaps. You can choose
                    to open your desired length of days from the previous booking's check-out date or any available
                    date.</p>
                <p class="fw-bold mt-5"> Please choose the dates you want to open for your next booking's check-in.</p>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <form @submit.prevent="updateSubmit()">
                    <div class="mb-2">
                        <select required v-model="contact.groupId" class="form-control" v-if="groups.length > 0">
                            <option value="">Select On/Off</option>
                            <option :value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.mobile" type="number" class="form-control"
                            placeholder="Opening days">
                    </div>
                    <div class="mb-2">
                        <input type="submit" class="btn btn-success" value="update">
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img">
            </div>
        </div>
    </div>
</template>
<script>
import { ContactService } from '@/services/ContactService';

export default {
    name: "EditCalendar",
    data: function () {
        return {
            contactId: this.$route.params.contactId,
            loading: false,
            contact: {
                name: '',
                photo: '',
                email: '',
                mobile: '',
                comapny: '',
                title: '',
                groupId: ''
            },
            errorMessage: null,
            groups: []
        }
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getContact(this.contactId);
            let groupResponse = await ContactService.getAllGroups();
            this.contact = response.data;
            this.groups = groupResponse.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
        updateSubmit: async function () {
            try {
                let response = await ContactService.updateContact(this.contact, this.contactId);
                if (response) {
                    return this.$router.push('/');
                }
                else {
                    return this.$router.push(`/contacts/edit/${this.contactId}`);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
  
<style scoped>

</style>
  