<script lang="ts">
	import { writable } from 'svelte/store';
	import ArticlePreview from '$lib/components/ArticlePreview.svelte';
	import type Article from '$lib/models/Article';

	const DEFAULT_ARTICLE_LIMIT = 10;
	const articleParams = writable({ limit: DEFAULT_ARTICLE_LIMIT, offset: 0 });
	let articles: Article[] = [];
	let pageCount = 1;
	let activePage = 1;

	articleParams.subscribe(async (params) => {
		const sanitizedParams = Object.fromEntries(
			Object.entries(params).map(([key, value]) => [key, value.toString()])
		);
		articles = await fetchGlobalArticles(sanitizedParams);
	});

	async function fetchGlobalArticles(params: Record<string, string>): Promise<Article[]> {
		const requestParams = new URLSearchParams(params);
		const res = await fetch(`https://api.realworld.io/api/articles?${requestParams}`);
		const articles = await res.json();
		pageCount = Math.ceil(articles.articlesCount / DEFAULT_ARTICLE_LIMIT);

		return articles.articles;
	}

	async function fetchTags(): Promise<{ tags: string[] }> {
		const res = await fetch('https://api.realworld.io/api/tags');
		return res.json();
	}
</script>

<div class="home-page">
	<div class="banner">
		<div class="container">
			<h1 class="logo-font">conduit</h1>
			<p>A place to share your knowledge.</p>
		</div>
	</div>

	<div class="container page">
		<div class="row">
			<div class="col-md-9">
				<div class="feed-toggle">
					<ul class="nav nav-pills outline-active">
						<li class="nav-item">
							<a class="nav-link" href="">Your Feed</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active" href="">Global Feed</a>
						</li>
					</ul>
				</div>

				{#each articles as article}
					<ArticlePreview {article} />
				{/each}

				<ul class="pagination">
					{#each Array(pageCount) as _, i}
						<li
							class="page-item"
							class:active={i + 1 === activePage}
							on:click={() => {
								activePage = i + 1;
								articleParams.update((p) => ({ ...p, offset: i * DEFAULT_ARTICLE_LIMIT }));
							}}
						>
							<a class="page-link">
								{i + 1}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-md-3">
				<div class="sidebar">
					<p>Popular Tags</p>

					{#await fetchTags() then tags}
						<div class="tag-list">
							{#each tags.tags as tag}
								<a href="/" class="tag-pill tag-default">{tag}</a>
							{/each}
						</div>
					{/await}
				</div>
			</div>
		</div>
	</div>
</div>
