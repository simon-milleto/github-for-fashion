<template>
	<div id="slideshow">
		<ul>
			<li v-for="p in pictures">
				<img v-bind:src="p.url" v-bind:alt="p.alt" @click="setCurrent(p.id)" v-bind:class="'picture ' + (p.active ? 'active' : '')">
			</li>
		</ul>
		<img v-bind:src="currentPicture.url" v-bind:alt="currentPicture.alt" id="show">
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
					"active":true
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
					"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables.jpg",
					"alt": "beautiful picture",
				}
			}
		},
		methods: {

			setCurrent(x){
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
<style lang="scss" scoped>
	#slideshow{
		#show{
			width:100%;
		}
		ul{
			margin:0;
			padding:0;
		}
		li{
			list-style-type:none;
			display:inline-block;
		}
		.picture{
			width:40px;
			height:40px;
			object-fit:cover;
			box-sizing:border-box;
			&.active{
				border:4px solid #00aadd;
			}
		}
	}
</style>