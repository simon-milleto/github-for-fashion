<template>
  <div class="garment-edit">
    <loader v-if="!dataIsLoaded"></loader>
    <form v-else="" v-on:submit.prevent="updateGarment">
      <div class="garment-detail__content">
        <input id="title" type="text" name="title" v-model='garment.title' class="garment-detail__title">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <slideshow v-if="garment.images.length > 0" :images="garment.images"></slideshow>
          </div>
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
            <info-box v-for="info in garment.infos"
            :value="info.value"
            :label="info.label">
          </info-box>
          <div class="info-box">
            <select name="category" id="category" v-model='garment.category' class="info-box__value">
              <option v-for="category in categories" :value="category" :selected="garment.category === category" class="info-box__value">{{category}}</option>
            </select>
            <span class="info-box__label">Category</span>
          </div>
          <div class="info-box">
            <div v-for="(size, index) in sizes">
              <input type="checkbox" :name="size" :value="size" :id="size" v-model='garment.sizes' :checked="size.indexOf(garment.sizes) > -1" >
              <label :for="size">{{size}}</label>
            </div>
            <span class="info-box__label">Sizes</span>
          </div>
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
          <select name="type" id="type" v-model='garment.type'>
            <option v-for="type in types" :value="type" :selected="garment.type === type">{{type}}</option>
          </select>
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

      <div class="commit-info mdc-layout-grid">
        <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{garment.numberOfProposals}}</span>
          <span class="commit-info__label">Change Proposals</span>
        </div>
        <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{garment.commitChanges}}</span>
          <span class="commit-info__label">Changes</span>
        </div>
        <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <label for="licence">Licence</label>
          <select name="licence" id="licence" v-model='garment.licence'>
            <option v-for="licence in licences" :value="licence" :selected="garment.licence === licence">{{licence}}</option>
          </select>
        </div>
        <div class="commit-info__item mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
          <span class="commit-info__value">{{garment.contributors}}</span>
          <span class="commit-info__label">Contributors</span>
        </div>
      </div>



      <div class="garment-detail__description">
        <p class="garment-detail__description-label">Project details</p>
        <textarea name="description" id="description" v-model="garment.description" class="garment-detail__description-label">garment.description</textarea>
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
    <input type="submit" value="SAVE">
  </div>
</form>
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

  import router from '../../router';

  import * as Licences from '../../licences';
  import * as Types from '../../types';
  import * as Sizes from '../../sizes';
  import * as Categories from '../../categories';

  export default {
    name: 'garment-edit',
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
          category: '',
          sizes: [],
        },
        dataIsLoaded: false,
        licences: Licences,
        categories: Categories,
        sizes: Sizes,
        types: Types,
        state: LoginStore.state,
      };
    },
    methods: {
      showError(error) {
        EventBus.$emit('showError', error);
      },
      formatRepoDetails(repoDetails) {
        this.garment.creator = repoDetails.owner.login;
        this.garment.creation_date = repoDetails.created_at;
        this.garment.reference = repoDetails.id;
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
        this.garment.description = repoContents.description;
        this.garment.type = repoContents.type;
        this.garment.licence = repoContents.licence;
        this.garment.status = repoContents.status;
        this.garment.sizes = repoContents.sizes;
        this.garment.category = repoContents.category;
      },
      formatRepoPullRequests(repoPullRequests) {
        this.garment.numberOfProposals = repoPullRequests.length;
      },
      formatRepoReleases(repoReleases) {
        if (repoReleases.length > 0) {
          repoReleases[0].assets.forEach((asset) => {
            this.garment.files.push({
              filetype: mime.extension(asset.content_type),
              url: asset.url,
              available: asset.state === 'uploaded',
            });
          });
        }
      },
      updateGarment() {
        const gh = new Github({
          token: this.state.token,
        });

        const garmentConfigOptions = {
          title: this.garment.title,
          description: this.garment.description,
          type: this.garment.type,
          category: this.garment.category,
          sizes: this.garment.sizes,
          licence: this.garment.licence,
          status: 'Created',
        };

        const garmentConfig = 'garment-config.json';

        console.log(this.garment.description);
        return gh.getUser().getProfile()
        .then((profileResponse) => {
          const user = profileResponse.data.login;
          const repo = this.repo;
          const remoteRepo = gh.getRepo(user, repo);
          return remoteRepo.writeFile('master', garmentConfig, JSON.stringify(garmentConfigOptions), 'Garment update', {})
          .then(() => {
            router.push({ name: 'Garment Detail', params: { user, repo } });
          })
          .catch(error => EventBus.$emit('showError', error.message));
        })
        .catch(error => EventBus.$emit('showError', error.message));
      },
    },
    filters: {
      moment: date => moment(date).format('L'),
    },
    props: ['user', 'repo'],
    mounted() {
      if (this.user === LoginStore.state.login) {
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

          this.dataIsLoaded = true;
        })
        .catch(error => this.showError(error.message));
      } else {
        router.push({ name: 'Garment Detail', params: { user: this.user, repo: this.repo } });
      }
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
