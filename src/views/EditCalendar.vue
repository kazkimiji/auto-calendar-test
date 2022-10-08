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
                        <select required v-model="contact.select" class="form-control">
                            <option value="">Select On/Off</option>
                            <option value="On">On</option>
                            <option value="Off">Off</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.day" type="number" class="form-control"
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
                day: '',
                select: ''
            },
            errorMessage: null,
        }
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getContact(this.contactId);
            this.contact = response.data;
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
  