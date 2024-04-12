<script lang="ts">
  import { page } from '$app/stores';
  import type Profile from '$lib/models/Profile';
  import ArticlePreview from '$lib/components/ArticlePreview.svelte';
  import { DEFAULT_ARTICLE_LIMIT } from '$lib/const/default-article-limit';
  import type Article from '$lib/models/Article';
  import { writable } from 'svelte/store';

  const articleParams = writable({ limit: DEFAULT_ARTICLE_LIMIT, offset: 0, author: $page.params.username });
  let articles: Article[] = [];
  let pageCount = 1;
  let activePage = 1;

  articleParams.subscribe(async (params) => {
    const sanitizedParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    );
    articles = await fetchUserArticles(sanitizedParams);
  });

  async function fetchUserArticles(params: Record<string, string>): Promise<Article[]> {
    const requestParams = new URLSearchParams(params);
    const res = await fetch(`https://api.realworld.io/api/articles?${requestParams}`);
    const articles = await res.json();
    pageCount = Math.ceil(articles.articlesCount / DEFAULT_ARTICLE_LIMIT);

    return articles.articles;
  }

  async function fetchProfile(): Promise<Profile> {
    const response = await fetch(`https://conduit.productionready.io/api/profiles/${$page.params.username}`);
    const data = await response.json();

    return data.profile;
  }
</script>

{#await fetchProfile() then profile}
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="{profile.image}" class="user-img" alt="Profile image" />
            <h4>{profile.username}</h4>
            <p>{profile.bio ?? ''}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {profile.username}
            </button>
<!--            <button class="btn btn-sm btn-outline-secondary action-btn">-->
<!--              <i class="ion-gear-a"></i>-->
<!--              &nbsp; Edit Profile Settings-->
<!--            </button>-->
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
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
      </div>
    </div>
  </div>
{/await}
