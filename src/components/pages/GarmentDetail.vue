<template>

  <div class="garment-detail">
    <loader v-if="!dataIsLoaded"></loader>
    <div class="garment-detail__content" v-if="dataIsLoaded">
      <h2 class="garment-detail__title">{{garment.title}}</h2>
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <slideshow :images="garment.images">
          </slideshow>
        </div>
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <info-box v-for="info in garment.infos"
                    :value="info.value"
                    :label="info.label">
          </info-box>
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
      <commit-info :numberOfProposals="garment.commit.proposals.length"
                  :changes="garment.commit.changes"
                  :licence="garment.licence"
                  :contributors="garment.commit.contributors">
      </commit-info>
      <div class="garment-detail__description">
        <p class="garment-detail__description-label">Project details</p>
        <p>{{garment.description}}</p>
      </div>
      <div class="garment-detail__download">
        <p class="garment-detail__download-label">Download</p>
        <div class="mdc-layout-grid">
          <download-box v-for="file in garment.files"
                        :type="file.filetype"
                        :available="file.available"
                        :url="file.url">
          </download-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import moment from 'moment';

  import EventBus from '../../eventBus';

  import InfoBox from '../components/InfoBox.vue';
  import DownloadBox from '../components/DownloadBox.vue';
  import Slideshow from '../components/Slideshow.vue';
  import CommitInfo from '../components/CommitInfo.vue';
  import Loader from '../components/Loader.vue';

  export default {
    name: 'garment-detail',
    components: {
      InfoBox,
      DownloadBox,
      Slideshow,
      CommitInfo,
      Loader,
    },
    // beforeCreate() {
    //   const id = this.$route.params.id;

    //   axios.get(`http://localhost:3000/garments/${id}`)
    //     .then((response) => {
    //       this.garment = response.data;
    //       this.dataIsLoaded = true;
    //     })
    //     .catch(error => this.showError(error.message));
    // },
    data() {
      return {
        garment: {},
        dataIsLoaded: false,
      };
    },
    methods: {
      showError(error) {
        EventBus.$emit('showError', error);
      },
    },
    filters: {
      moment: date => moment(date).format('L'),
    },
    props: ['user', 'repo'],
    mounted() {
      const gh = new GitHub({
        token: 'e07d25663b3a45d7362c5842dab25f2d74689a93',
      });

      const remoteRepo = gh.getRepo(this.user, this.repo);

      remoteRepo.getContents('master', 'info.json', true, (err, content) => {
        // console.log(content);
        this.garment = content;
        this.dataIsLoaded = true;
        console.log(this.garment);
      });
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
