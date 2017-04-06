<template>
	<div id="slideshow">
		<img v-bind:src="currentPicture.url" v-bind:alt="currentPicture.alt" id="show">
		<ul>
			<li v-for="p in pictures">
				<img v-bind:src="p.url" v-bind:alt="p.alt" @click="setCurrent(p.id)" v-bind:class="p.active">
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
	  	name: 'Slideshow',
	  	data() {
			return {
				pictures: [{
					"id":1,
					"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables.jpg",
					"alt": "beautiful picture",
					"active":false
				},
				{
					"id":2,
					"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-150x150.jpg",
					"alt": "great picture",
					"active":false
				},
				{
					"id":3,
					"url": "http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron.png",
					"alt": "bad picture",
					"active":false
				}],
				currentPicture:{
					"id":1,
					"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables.jpg",
					"alt": "beautiful picture",
					"active":false
				}
			}
		},
		methods: {

			setCurrent(x){
				this.currentPicture['id']=x;
				this.currentPicture['url']=this.pictures[x - 1].url;
				this.currentPicture['alt']=this.pictures[x - 1].alt;
				this.pictures.forEach( function(pic){
					pic['active'] = false;
				});
				this.pictures[x - 1].active = true;
			}
		}
	}

</script>