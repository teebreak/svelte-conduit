<script lang="ts">
	import type Article from '$lib/models/Article';

	export let article: Article;
</script>

<div class="article-preview">
	<div class="article-meta">
		<a href="/profile/{article.author.username}">
			<img src={article.author.image} alt="Author's profile picture" />
		</a>
		<div class="info">
			<a href="/profile/{article.author.username}" class="author">{article.author.username}</a>
			<span class="date">{article.createdAt}</span>
		</div>
		<button class="btn btn-outline-primary btn-sm pull-xs-right">
			<i class="ion-heart"></i>
			{article.favoritesCount}
		</button>
	</div>
	<a href="/article/{article.slug}" class="preview-link">
		<h1>{article.title}</h1>
		<p>{article.description}</p>
		<span>Read more...</span>
		<ul class="tag-list">
			{#each article.tagList as tag}
				<li class="tag-default tag-pill tag-outline">{tag}</li>
			{/each}
		</ul>
	</a>
</div>
