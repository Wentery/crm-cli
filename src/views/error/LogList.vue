<template>
	<div class="log-list">
		<h3>错误日志</h3>
		<ul>
			<li v-for="(item, index) in logs" :key="index">{{ item.content }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'LogList',
		data() {
			return {
				logs: []
			}
		},
		create() {
			let logs = localStorage.getItem('logs') || [];
			this.logs = logs;
		}
	}
</script>