<script type="text/javascript">
	export default {
	  	name: 'slideshow'
	}
	var picture = new Vue({
		el: '#slideshow',
		data: {
			pictures: [{
				"id": "1",
				"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables.jpg",
				"alt": "beautiful picture"
			},
			{
				"id": "2",
				"url": "http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-150x150.jpg",
				"alt": "great picture"
			},
			{
				"id": "3",
				"url": "http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron.png",
				"alt": "bad picture"
			}]
		}
	});

</script>

<div id="slideshow">

	<img src="">
	<ul>
		<li v-for="p for pictures">
			<a v-bind:onclick="selectPicture"><img v-bind:src="p.src" v-bind:alt="p.alt"></a>
			<p>{{a.title}}</p>
		</li>
	</ul>

</div>