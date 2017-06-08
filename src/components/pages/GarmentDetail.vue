<template>
  <div class="garment-detail">
    <loader v-if="!dataIsLoaded"></loader>
    <div v-else="" class="garment-detail__content">
      <h2 class="garment-detail__title">{{garment.title}}</h2>
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
          <slideshow v-if="garment.images.length > 0" :images="garment.images"></slideshow>
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
          <span>{{garment.commitChanges}}</span>
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
      <commit-info :numberOfProposals="garment.numberOfProposals"
                   :changes="garment.commitChanges"
                   :licence="garment.licence"
                   :contributors="garment.contributors">
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
  import Github from 'github-api';
  import mime from 'mime-types';
  import _ from 'lodash';

  import EventBus from '../../eventBus';
  import LoginStore from '../../loginStore';

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
    data() {
      return {
        garment: {
          reference: '',
          title: '',
          description: '',
          status: '',
          type: '',
          creator: '',
          creation_date: '',
          licence: 'Information not available yet on public API',
          commitChanges: 0,
          contributors: '',
          numberOfProposals: 0,
          images: [],
          infos: [],
          files: [],
        },
        dataIsLoaded: false,
      };
    },
    methods: {
      showError(error) {
        EventBus.$emit('showError', error);
      },
      formatRepoDetails(repoDetails) {
        this.garment.title = repoDetails.name;
        this.garment.creator = repoDetails.owner.login;
        this.garment.creation_date = repoDetails.created_at;
        this.garment.reference = repoDetails.id;
        this.garment.description = repoDetails.description;
        this.garment.infos.push({
          label: 'favourites',
          value: repoDetails.watchers,
        });
      },
      formatRepoContributorStats(contributors) {
        const totalCommits = _.sumBy(contributors, contributor => contributor.total);

        this.garment.commitChanges = totalCommits;
        this.garment.contributors = contributors.length;
      },
      formatRepoContents(repoContents) {
        this.garment.title = repoContents.title;
        this.garment.type = repoContents.type;
        this.garment.licence = repoContents.licence;
        this.garment.status = repoContents.status;
        this.garment.infos.push({
          label: 'category',
          value: repoContents.category,
        });
        this.garment.infos.push({
          label: 'sizes',
          value: repoContents.sizes.join(' '),
        });
      },
      formatRepoPullRequests(repoPullRequests) {
        this.garment.numberOfProposals = repoPullRequests.length;
      },
      formatRepoReleases(repoReleases) {
        if (repoReleases.length > 0) {
          repoReleases[0].assets.forEach((asset) => {
            this.garment.files.push({
              filetype: mime.extension(asset.content_type),
              url: asset.browser_download_url,
              available: asset.state === 'uploaded',
            });
          });
        }
      },
    },
    filters: {
      moment: date => moment(date).format('L'),
    },
    props: ['user', 'repo'],
    mounted() {
      const gh = new Github({
        token: LoginStore.state.token,
      });

      const remoteRepo = gh.getRepo(this.user, this.repo);

      const repoDetails = remoteRepo.getDetails();
      const repoContributorStats = remoteRepo.getContributorStats();
      const repoContents = remoteRepo.getContents('master', 'garment-config.json', true);
      const repoPullRequests = remoteRepo.listPullRequests();
      const repoReleases = remoteRepo.listReleases();

      Promise.all([repoDetails, repoContributorStats, repoContents, repoPullRequests, repoReleases])
        .then(([rDetails, rContributors, rContents, rPullRequests, rReleases]) => {
          this.formatRepoDetails(rDetails.data);
          this.formatRepoContributorStats(rContributors.data);
          this.formatRepoContents(rContents.data);
          this.formatRepoPullRequests(rPullRequests.data);
          this.formatRepoReleases(rReleases.data);

          this.$ga.event('Garment', 'view', `${this.user}/${this.garment.title}`);

          this.dataIsLoaded = true;
        })
        .catch(error => this.showError(error.message));
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
