<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Auto Calendar
                </p>
                <p class="fst-italic">Auto Calendar can prevent booking inquiries/requests with big gaps. You can choose
                    to open your desired length of days from the previous booking's check-out date or any available
                    date. Unless you choose a specific date for the available date, the previous booking's check-out
                    date or
                    the closest open date will be set as the available date.</p>
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Search Listing">
                                </div>
                                <div class="col">
                                    <input type="submit" class="btn btn-outline-dark">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- SpinNer -->
    <div v-if="loading">
        <div class="container">
            <div class="row">
                <div class="col">
                    <SpiNner />
                </div>
            </div>
        </div>
    </div>

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <p class="h4 text-danger fw-bold">{{errorMessage}}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-3" v-if="contacts.length > 0">
        <div class="row">
            <div class="col-md-12" v-for="contact of contacts" :key="contact">
                <div class="card my-2 list-group-item shadow-lg">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-sm-4">
                                <img :src="contact.photo " alt="" class="contact-img shadow" />
                            </div>
                            <div class="col-sm-7">
                                <ul class="list-group">
                                    <li class="list-group-item">Listing : <span
                                            class="fw-bold">{{contact.listing}}</span>
                                    </li>
                                    <li class="list-group-item">Auto Calendar : <span
                                            class="fw-bold">{{contact.select}}</span>
                                    </li>
                                    <li class="list-group-item">Open only the next <span
                                            class="fst-italic">{{contact.day}}</span> days
                                        from the available date for the next check-in.
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                <router-link :to="`/calendars/edit/${contact.id}`" class="btn btn-success my-1">
                                    <i class="fa fa-pen"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ContactService } from '@/services/ContactService';
import SpinNer from '@/components/SpinNer';

export default {
    name: "AutoCalendar",
    data: function () {
        return {
            loading: false,
            contacts: [],
            errorMessage: null
        };
    },
    created: async function () {
        try {
            this.loading = true;
            let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
        }
        catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
    },
    methods: {
        clickDeleteContact: async function (contactId) {
            try {
                this.loading = true;
                let response = await ContactService.deleteContact(contactId);
                if (response) {
                    let response = await ContactService.getAllContacts(); // getting fresh data
                    this.contacts = response.data;
                    this.loading = false;
                }
            }
            catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        }
    }
}
</script>
  
<style scoped>

</style>
  