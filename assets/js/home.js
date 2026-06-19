// Home page dynamic logic (CORS-free original visual style)
document.addEventListener("DOMContentLoaded", () => {
  if (window.allPosts) {
    renderOriginalHeroBanner(window.allPosts);
    renderOriginalCategoryGrids(window.allPosts);
  } else {
    console.error("allPosts data not found.");
  }
  
  if (window.allVideos) {
    renderOriginalPlaylists(window.allVideos);
  }
});

// Timezone-independent date formatter to match exact live site formatting (no leading zeros)
function formatPublishDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[monthIndex]} ${day}, ${year}`;
  }
  return dateStr;
}

// Render the single latest post inside the large full-width Hero Banner
// On the original website, the latest post in the hero is "Come Over | Casa De Sushi"
function renderOriginalHeroBanner(posts) {
  const banner = document.getElementById("hero-dynamic-banner");
  const titleEl = document.getElementById("hero-title");
  const dateEl = document.getElementById("hero-date");
  const tagEl = document.getElementById("hero-tag");
  
  if (!banner || !posts.length) return;
  
  // Find "Come Over | Casa De Sushi"
  const heroSlug = "come-over-casa-de-sushi-where-minimalism-meets-a-life-well-travelled";
  const heroPost = posts.find(p => p.slug === heroSlug) || posts[0];
  
  let mappedCat = heroPost.category;
  if (heroPost.category === "water-come-over") {
    mappedCat = "water/come-over";
  } else if (heroPost.category === "residents-spotlight-tresh-takes") {
    mappedCat = "residents-spotlight/tresh-takes";
  }
  const postLink = `${mappedCat}/${heroPost.slug}/`;
  
  // Set background image
  banner.style.backgroundImage = `url('${heroPost.image}')`;
  
  // Set title with link
  titleEl.innerHTML = `<a href="${postLink}" style="color:#ffffff;">${heroPost.title}</a>`;
  
  // Set date
  dateEl.innerText = formatPublishDate(heroPost.date);
  
  // Set category tag
  let tagText = heroPost.category.replace("-", " ");
  if (heroPost.category === "water-come-over") {
    tagText = "Come Over";
  } else if (heroPost.category === "residents-spotlight-tresh-takes") {
    tagText = "Fresh Takes";
  }
  tagEl.innerText = tagText;
}

// Render the exact curated posts per category row matching the original homepage
function renderOriginalCategoryGrids(posts) {
  const gridSlugs = {
    materials: [
      'timeless-elegance-sustainability-of-mangalore-tiles',
      'architectural-tapestry-rooted-in-tradition-modernity',
      'role-of-compressed-stabilized-earth-blocks-in-sustainable-construction',
      'brick-pavers-designing-alluring-pathways',
      'mindful-choices-for-a-healthier-home-enhancing-indoor-air-quality',
      'eco-friendly-creative-expression-of-waste'
    ],
    water: [
      'come-over-casa-de-sushi-where-minimalism-meets-a-life-well-travelled',
      'come-on-over-ajith-bindu-and-indulekhas-dream-home',
      'come-over-meet-gaurishankar-chaudhary-and-family',
      'malharite-madhavi-satguru-opened-her-home-to-us',
      'hidden-crisis-beneath-our-feet-preserving-groundwater-for-future-generations',
      'the-benefits-of-rooftop-rainwater-harvesting'
    ],
    community: [
      'the-spiritofmalhar',
      'goodearth-look-back-then-now',
      'malhar-mela-2024-a-feast-to-the-senses',
      'medley-a-true-melange-of-homes-crafted-spaces',
      'relive-peravoor-marathon-2022',
      'medley-a-new-buoyant-addition-to-goodearth-malhar'
    ],
    sustainability: [
      'foundations-and-superstructures-for-sustainable-living',
      'discovering-landscaping-elements-chappadi-stone',
      'the-artful-integration-of-boulders-in-landscape-design',
      'goodearth-saarang-live-work-celebrate-life-at-a-holistic-eco-village',
      'ripple-effect-mastering-urban-runoff-with-ease',
      'rediscovering-rammed-earth-construction-in-modern-architecture'
    ],
    awards: [
      'goodearth-modern-times-wins-credai-awards-2025',
      'goodearth-studio-lore-wins-best-interior-design-project-of-the-year-villa-at-realty-excellence-awards-2025',
      'malhar-medley-wins-geevees-award-2024',
      'malhar-medley-wins-the-economic-times-real-estate-awards-2024-national-edition',
      'goodearth-wins-platinum-award-at-spaciux-design-awards-2022',
      'sabera-award'
    ],
    opinions: [
      'top-5-construction-industry-trends-to-watch-for-in-2022',
      'how-the-bangalore-suburban-rail-project-will-benefit-commuters',
      'bengaluru-develops-a-taste-for-luxurious-villas',
      'what-lies-in-store-for-indian-real-estate-in-2022'
    ]
  };
  
  Object.keys(gridSlugs).forEach(catId => {
    const grid = document.getElementById(`grid-${catId}`);
    if (!grid) return;
    
    const slugs = gridSlugs[catId];
    let html = "";
    
    slugs.forEach(slug => {
      // Find the post
      const post = posts.find(p => p.slug === slug);
      if (!post) return;
      
      let mappedCat = post.category;
      if (post.category === "water-come-over") {
        mappedCat = "water/come-over";
      } else if (post.category === "residents-spotlight-tresh-takes") {
        mappedCat = "residents-spotlight/tresh-takes";
      }
      const postLink = `${mappedCat}/${post.slug}/`;
      
      const formattedDate = formatPublishDate(post.date);
      
      let catTitle = post.category.replace("-", " ");
      if (post.category === "water-come-over") {
        catTitle = "Come Over";
      } else if (post.category === "residents-spotlight-tresh-takes") {
        catTitle = "Fresh Takes";
      }
      
      const isOpinions = post.category === 'opinions';
      
      html += `
        <article class="original-card">
          ${!isOpinions ? `
          <a href="${postLink}" class="original-card-image-link">
            <img src="${post.image}" alt="${post.title}" class="original-card-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'">
            <span class="card-badge">${catTitle}</span>
          </a>
          ` : ''}
          <h4 class="original-card-title">
            <a href="${postLink}">${post.title}</a>
          </h4>
          <div class="original-card-meta">
            ${isOpinions ? `By GoodEarth|${formattedDate}|Opinions` : `By GoodEarth Team | ${formattedDate}`}
          </div>
          ${!isOpinions ? `
          <div class="card-link-wrapper">
            <a href="${postLink}" class="card-link">
              Read Article
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          ` : ''}
        </article>
      `;
    });
    
    grid.innerHTML = html;
  });
}

// Render video playlists in 3-column rows with YouTube iframe embeds
function renderOriginalPlaylists(data) {
  const creatorsContainer = document.getElementById("creators-playlist-container");
  const residentsContainer = document.getElementById("residents-playlist-container");
  
  if (creatorsContainer && data.creators) {
    const list = data.creators.slice(0, 3);
    creatorsContainer.innerHTML = list.map(vid => {
      const playlistId = "PLMAxIqPpS_RsufSclPPRjvZibMT_uhzHv";
      const indexMatch = vid.url.match(/index=(\d+)/);
      const index = indexMatch ? indexMatch[1] : "1";
      
      const embedSrc = `https://www.youtube.com/embed/?wmode=transparent&autoplay=0&list=${playlistId}&index=${index}`;
      
      return `
        <div class="video-card-original">
          <div class="video-iframe-wrapper">
            <iframe src="${embedSrc}" title="${vid.title}" allowfullscreen></iframe>
          </div>
          <div class="video-card-title">${vid.title}</div>
        </div>
      `;
    }).join("");
  }

  if (residentsContainer && data.residents) {
    const list = data.residents.slice(0, 3);
    residentsContainer.innerHTML = list.map(vid => {
      const playlistId = "PLMAxIqPpS_Rtt065VYtKqoyKuHs0sx6Bl";
      const indexMatch = vid.url.match(/index=(\d+)/);
      const index = indexMatch ? indexMatch[1] : "1";
      
      const embedSrc = `https://www.youtube.com/embed/?wmode=transparent&autoplay=0&list=${playlistId}&index=${index}`;
      
      return `
        <div class="video-card-original">
          <div class="video-iframe-wrapper">
            <iframe src="${embedSrc}" title="${vid.title}" allowfullscreen></iframe>
          </div>
          <div class="video-card-title">${vid.title}</div>
        </div>
      `;
    }).join("");
  }
}
