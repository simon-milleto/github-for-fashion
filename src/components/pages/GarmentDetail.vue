<template>
    <main class="garment-detail__container">
        <h2 class="garment-detail__title">{{garment.title}}</h2>
        <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                <div style="background: red; height: 150px"></div>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                <info-box v-for="info in garment.infos" :value="info.value" :label="info.label"></info-box>
            </div>
        </div>
        <div class="separator"></div>
        <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Creator</span>
                <span>{{garment.creator}}</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Iteration n°</span>
                <span v-if="garment.commit">{{garment.commit.changes}}</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Type</span>
                <span>{{garment.type}}</span>
            </div>
        </div>
        <div class="mdc-layout-grid">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Creation date</span>
                <span>{{garment.creation_date | moment}}</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Platform ref.</span>
                <span>{{garment.reference}}</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__label">Pattern status</span>
                <span>{{garment.status}}</span>
            </div>
        </div>
        <div class="garment-detail__project-info mdc-layout-grid">
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__commit-value" v-if="garment.commit">{{garment.commit.proposals.length}}</span>
                <span class="garment-detail__commit-label">Change Proposals</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__commit-value" v-if="garment.commit">{{garment.commit.changes}}</span>
                <span class="garment-detail__commit-label">Changes</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__commit-value">{{garment.licence}}</span>
                <span class="garment-detail__commit-label">Licence</span>
            </div>
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
                <span class="garment-detail__commit-value" v-if="garment.commit">{{garment.commit.contributors}}</span>
                <span class="garment-detail__commit-label">Contributors</span>
            </div>
        </div>
        <div class="garment-detail__description">
            <p class="garment-detail__description-label">Project details</p>
            <p>{{garment.description}}</p>
        </div>
        <div class="garment-detail__download">
            <p class="garment-detail__download-label">Download</p>
            <div class="mdc-layout-grid">
                <download-box v-for="file in garment.files" :type="file.filetype" :available="file.available" :url="file.url"></download-box>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import InfoBox from '../components/InfoBox.vue';
import DownloadBox from '../components/DownloadBox.vue';

export default {
  name: 'garment-detail',
  components: {
    InfoBox,
    DownloadBox,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      garment: {},
    };
  },
  methods: {
    fetchData: () => {
      const id = this.$route.params.id;
      axios.get(`http://localhost:3000/garment/${id}`).then((response) => {
        console.log(response.data);
        this.garment = response.data;
      });
    },
  },
  filters: {
    moment: (date) => {
      moment(date).format('L');
    },
  },
};
</script>

<style>
    .garment-detail__label {
        display: block;
        margin-bottom: 10px;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .garment-detail__project-info {
        padding: 20px;
        border: 1px solid grey;
    }

    .garment-detail__commit-value {
        margin-right:5px;
        font-weight: 600;
    }

    .garment-detail__description,
    .garment-detail__download {
        margin: 25px 0;
    }

    .garment-detail__description-label,
    .garment-detail__download-label {
        margin-bottom: 15px;
        font-size: 1.2rem;
        font-weight: 600;
    }
</style>
