// Shared JS to handle dynamic layout injection (CORS-free for double-clicking local files)
// Initialize theme synchronously from localStorage or system scheme preference
(function() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initialTheme);
})();

const headerHTML = `<div class="header-container">
  <a href="/index.html" class="logo-link">
    <img src="assets/images/logo.svg" alt="GoodEarth Logo" class="logo-img" style="height: 50px; width: auto; display: block;">
  </a>
  <nav>
    <ul class="nav-menu">
      <li><a href="/index.html" class="nav-link active">Home</a></li>
      <li class="nav-dropdown">
        <a href="/category/materials/index.html" class="nav-link">Blogs</a>
        <ul class="dropdown-menu">
          <li><a href="/category/all/index.html">All Blogs</a></li>
          <li><a href="/category/materials/index.html">Materials</a></li>
          <li><a href="/category/water/index.html">Water</a></li>
          <li><a href="/category/community/index.html">Community</a></li>
          <li><a href="/category/sustainability/index.html">Sustainability</a></li>
          <li><a href="/category/awards/index.html">Awards</a></li>
        </ul>
      </li>
      <li><a href="/index.html#opinions-section" class="nav-link">Opinions</a></li>
      <li class="nav-dropdown">
        <a href="/index.html#spotlights-section" class="nav-link">Spotlight</a>
        <ul class="dropdown-menu">
          <li><a href="/index.html#creators-spotlight-section">Creators</a></li>
          <li><a href="/index.html#residents-spotlight-section">Residents</a></li>
        </ul>
      </li>
      <li><a href="/index.html#connect-section" class="nav-link">Contact</a></li>
    </ul>
  </nav>
  <div style="display: flex; align-items: center;">
    <button class="theme-toggle-btn" aria-label="Toggle theme">
      <!-- Sun SVG -->
      <svg class="theme-toggle-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <!-- Moon SVG -->
      <svg class="theme-toggle-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
    <button class="subscribe-btn"><span>Subscribe</span></button>
  </div>
</div>
`;
const footerHTML = `<div class="footer-container-original">
  <div class="footer-section">
    <img src="assets/images/logo.svg" alt="GoodEarth Logo" class="footer-logo-img" style="height: 36px; width: auto; display: block; margin-bottom: 1.5rem; filter: brightness(0) invert(1);">
    <p style="color: #999999; line-height: 1.6; margin-bottom: 1.5rem;">
      Cultivating conscious communities since 1996. Regenerative living rooted in nature, craft, and community.
    </p>
  </div>
  
  <div class="footer-section">
    <h4 class="footer-title-original">Categories</h4>
    <div class="footer-categories-grid">
      <a href="/category/awards/index.html">Awards</a>
      <a href="/category/beyond-the-fence/index.html">Beyond the fence</a>
      <a href="/category/climate-responsive-design/index.html">Climate-responsive design</a>
      <a href="/category/water/come-over/index.html">Come Over</a>
      <a href="/category/community/index.html">Community</a>
      <a href="/category/creators-spotlight/index.html">Creators Spotlight</a>
      <a href="/category/design/index.html">Design</a>
      <a href="/category/digest/index.html">Digest</a>
      <a href="/category/ecological-restoration/index.html">Ecological Restoration</a>
      <a href="/category/ecology/index.html">Ecology</a>
      <a href="/category/ecoscaping/index.html">Ecoscaping</a>
      <a href="/category/events/index.html">Events</a>
      <a href="/category/goodearth-initiatives/index.html">GoodEarth Initiatives</a>
      <a href="/category/goodearth-interiors/index.html">GoodEarth Interiors</a>
      <a href="/category/goodearth-social-initiatives/index.html">GoodEarth Social Initiatives</a>
      <a href="/category/housing/index.html">Group Housing</a>
      <a href="/category/holistic-farming/index.html">Holistic farming</a>
      <a href="/category/knowledge/index.html">Knowledge</a>
      <a href="/category/materials/index.html">Materials</a>
      <a href="/category/opinions/index.html">Opinions</a>
      <a href="/category/regenerative-agriculture/index.html">Regenerative agriculture</a>
      <a href="/category/residents-spotlight/index.html">Residents Spotlight</a>
      <a href="/category/sports/index.html">Sports</a>
      <a href="/category/sustainability/index.html">Sustainability</a>
      <a href="/category/traditional-techniques/index.html">Traditional techniques</a>
      <a href="/category/residents-spotlight/tresh-takes/index.html">Tresh Takes</a>
      <a href="/category/uncategorized/index.html">Uncategorized</a>
      <a href="/category/water/index.html">Water</a>
    </div>
  </div>

  <div class="footer-section">
    <h4 class="footer-title-original">Connect</h4>
    <ul class="footer-nav-list">
      <li><a href="https://goodearth.org.in" target="_blank" rel="noopener noreferrer">goodearth.org.in</a></li>
      <li><a href="https://goodearth.org.in/contact/" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
    </ul>
  </div>
</div>

<div class="footer-bottom-original">
  <div class="premium-social-container" style="margin-bottom: 1rem; margin-top: 0;">
    <a href="https://facebook.com/goodearthonline" target="_blank" rel="noopener noreferrer" class="premium-social-link fb" aria-label="Facebook">
      <svg viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    </a>
    <a href="https://instagram.com/goodearthonline" target="_blank" rel="noopener noreferrer" class="premium-social-link ig" aria-label="Instagram">
      <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01"/>
      </svg>
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="premium-social-link yt" aria-label="YouTube">
      <svg viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
        <polygon points="9.75 15.02 15.61 11.75 9.75 8.48 9.75 15.02"/>
      </svg>
    </a>
  </div>
  <p>&copy; Copyright 2026 GoodEarth | All Rights Reserved</p>
</div>
`;

const modalHTML = `
<div id="subscribe-modal" class="modal-overlay">
  <div class="modal-card">
    <button class="modal-close-btn" aria-label="Close modal">&times;</button>
    <div class="modal-header">
      <h2 class="modal-title">Connect With Us</h2>
      <p class="modal-description">Have questions about our project layouts or sustainable architecture? Leave your details below.</p>
    </div>
    <div class="modal-body">
      <iframe 
        src="https://forms.goodearth.org.in/goodearthecofuturespvtltd/form/Connectwithus/formperma/gzMvwuvlgfbcLYbtspNTKYsHULwuRCj6DX3FOQSoGCE" 
        style="width: 100%; height: 500px; border: none; display:block;"
        title="Connect with us Form"
      ></iframe>
    </div>
  </div>
</div>
`;

const sidebarHTML = `
        <!-- About GoodEarth Widget -->
        <div class="widget-about">
          <img src="/assets/images/goodeath-image.jpg" alt="goodeath-image" />
          <h3>About GoodEarth</h3>
          <p>At Good Earth, we are engaged in bringing together like-minded people with a common vision of building a sustainable future.</p>
          
          <!-- Widget Social Links -->
          <div class="premium-social-container">
            <a href="https://facebook.com/goodearthonline" target="_blank" rel="noopener noreferrer" class="premium-social-link fb" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com/goodearthonline" target="_blank" rel="noopener noreferrer" class="premium-social-link ig" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="premium-social-link yt" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.61 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Sticky Sidebar Group (Tabs + Comment Form) -->
        <div class="sidebar-sticky-group">

          <!-- Tabs Widget: Popular / Recent / Comments -->
          <div class="widget-tabs">
            <div class="tabs-nav">
              <button class="tab-btn active" onclick="switchSidebarTab(event, 'tab-popular')">Popular</button>
              <button class="tab-btn" onclick="switchSidebarTab(event, 'tab-recent')">Recent</button>
              <button class="tab-btn" onclick="switchSidebarTab(event, 'tab-comments')">Comments</button>
            </div>
            
            <div class="tab-content active" id="tab-popular">
              <ul class="tab-post-list">
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2023/09/Blog-spt14-1-rs.jpg" alt="Role of Compressed Stabilized Earth Blocks in sustainable construction" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/materials/role-of-compressed-stabilized-earth-blocks-in-sustainable-construction/index.html">Role of Compressed Stabilized Earth Blocks in sustainable construction</a></h4>
                    <div class="tab-post-date">September 14, 2023</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2024/02/Saarang-Brochure_V4_Corrections_Print-page-71.jpg" alt="GoodEarth Saarang - Live, work & celebrate life at a holistic eco village" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/sustainability/goodearth-saarang-live-work-celebrate-life-at-a-holistic-eco-village/index.html">GoodEarth Saarang - Live, work & celebrate life at a holistic eco village</a></h4>
                    <div class="tab-post-date">February 22, 2024</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2024/03/IMG_00070.webp" alt="Discovering Landscaping Elements - Chappadi Stone" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/design/discovering-landscaping-elements-chappadi-stone/index.html">Discovering Landscaping Elements - Chappadi Stone</a></h4>
                    <div class="tab-post-date">March 30, 2024</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2026/04/Come-Over-Featured-Image.jpg" alt="Come Over | Casa De Sushi: Where Minimalism Meets a Life Well-Travelled" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/residents-spotlight/come-over-casa-de-sushi-where-minimalism-meets-a-life-well-travelled/index.html">Come Over | Casa De Sushi: Where Minimalism Meets a Life Well-Travelled</a></h4>
                    <div class="tab-post-date">April 15, 2026</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2024/01/1.jpg" alt="Rediscovering rammed earth construction in modern architecture" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/sustainability/rediscovering-rammed-earth-construction-in-modern-architecture/index.html">Rediscovering rammed earth construction in modern architecture</a></h4>
                    <div class="tab-post-date">January 12, 2024</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="tab-content" id="tab-recent">
              <ul class="tab-post-list">
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2026/04/Come-Over-Featured-Image.jpg" alt="Come Over | Casa De Sushi: Where Minimalism Meets a Life Well-Travelled" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/residents-spotlight/come-over-casa-de-sushi-where-minimalism-meets-a-life-well-travelled/index.html">Come Over | Casa De Sushi: Where Minimalism Meets a Life Well-Travelled</a></h4>
                    <div class="tab-post-date">April 15, 2026</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2026/03/GoodEarth-Resident-Girin-Web-Banner.jpeg" alt="Savvy in Five with Girin | Get closer to the birds around you" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/residents-spotlight/savvy-in-five-with-girin-get-closer-to-the-birds-around-you/index.html">Savvy in Five with Girin | Get closer to the birds around you</a></h4>
                    <div class="tab-post-date">March 11, 2026</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2026/01/GE-Ajith.jpg" alt="Come On Over | Ajith, Bindu, and Indulekha's Dream Home." class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/residents-spotlight/come-on-over-ajith-bindu-and-indulekhas-dream-home/index.html">Come On Over | Ajith, Bindu, and Indulekha's Dream Home.</a></h4>
                    <div class="tab-post-date">January 17, 2026</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2025/12/Beyond-the-Fence-with-Sarah-Thomas-Umoya-A-creatives-journey-into-Shibori.jpg" alt="Beyond the Fence with Sarah Thomas | Umoya | A creative’s journey into Shibori" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/beyond-the-fence/beyond-the-fence-with-sarah-thomas-umoya-a-creatives-journey-into-shibori/index.html">Beyond the Fence with Sarah Thomas | Umoya | A creative’s journey into Shibori</a></h4>
                    <div class="tab-post-date">December 31, 2025</div>
                  </div>
                </li>
                <li class="tab-post-item">
                  <img src="https://goodearth.org.in/connect/wp-content/uploads/2025/12/Hero.webp" alt="GoodEarth Modern Times wins CREDAI Awards 2025" class="tab-post-img" onerror="this.src='https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600'" />
                  <div class="tab-post-info">
                    <h4 class="tab-post-title"><a href="/awards/goodearth-modern-times-wins-credai-awards-2025/index.html">GoodEarth Modern Times wins CREDAI Awards 2025</a></h4>
                    <div class="tab-post-date">December 22, 2025</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="tab-content" id="tab-comments">
              <p style="padding: 1rem 0; font-size: 0.85rem; color: var(--color-text-muted); text-align: center;">No comments yet.</p>
            </div>
          </div>

          <!-- Leave a Comment Panel -->
          <div class="blog-comment-panel">
            
            <!-- Leave a Comment Form -->
            <div class="comment-form-container">
              <h3 class="comment-form-title">Leave A Comment</h3>
              <form class="comment-form">
                <div class="comment-input-group">
                  <label for="comment-text">Comment</label>
                  <textarea id="comment-text" required placeholder="Comment..."></textarea>
                </div>
                <div class="comment-form-row">
                  <div class="comment-input-group">
                    <label for="comment-name">Name (required)</label>
                    <input type="text" id="comment-name" required placeholder="Name (required)" />
                  </div>
                  <div class="comment-input-group">
                    <label for="comment-email">Email (required)</label>
                    <input type="email" id="comment-email" required placeholder="Email (required)" />
                  </div>
                  <div class="comment-input-group">
                    <label for="comment-website">Website</label>
                    <input type="url" id="comment-website" placeholder="Website" />
                  </div>
                </div>
                <div class="comment-checkbox-group">
                  <input type="checkbox" id="save-info" />
                  <label for="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
                <button type="submit" class="comment-submit-btn">Post Comment</button>
              </form>
            </div>
          </div>

        </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Find the script tag for common.js to calculate the relative prefix to the root
  const commonScript = document.querySelector('script[src*="common.js"]');
  let relativePrefix = '';
  if (commonScript) {
    const src = commonScript.getAttribute('src');
    if (src.startsWith('../../../')) {
      relativePrefix = '../../../';
    } else if (src.startsWith('../../')) {
      relativePrefix = '../../';
    } else if (src.startsWith('../')) {
      relativePrefix = '../';
    }
  }

  // Inject Sidebar
  const sidebarContainer = document.querySelector(".blog-sidebar");
  if (sidebarContainer) {
    sidebarContainer.innerHTML = sidebarHTML;
    
    // Resolve relative paths for a and img tags starting with '/'
    sidebarContainer.querySelectorAll("a, img").forEach(el => {
      const attr = el.tagName === "A" ? "href" : "src";
      const val = el.getAttribute(attr);
      if (val && val.startsWith("/")) {
        el.setAttribute(attr, relativePrefix + val.substring(1));
      }
    });
  }

  // Inject Header
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
    
    // Update logo link & image src dynamically
    const logoLink = headerContainer.querySelector(".logo-link");
    if (logoLink) {
      logoLink.href = relativePrefix + "index.html";
    }
    const logoImg = headerContainer.querySelector(".logo-img");
    if (logoImg) {
      logoImg.src = relativePrefix + "assets/images/logo.svg";
    }
    
    // Adjust header menu links relatively
    const links = headerContainer.querySelectorAll(".nav-link, .dropdown-menu a");
    links.forEach(link => {
      const hrefAttr = link.getAttribute("href");
      if (hrefAttr && hrefAttr.startsWith("/")) {
        link.href = relativePrefix + hrefAttr.substring(1);
      }
    });

    // Bind theme toggle listener
    const toggleBtn = headerContainer.querySelector(".theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });
    }
  }

  // Inject Footer
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
    
    // Update footer logo src dynamically
    const footerLogoImg = footerContainer.querySelector(".footer-logo-img");
    if (footerLogoImg) {
      footerLogoImg.src = relativePrefix + "assets/images/logo.svg";
    }
    
    // Adjust footer links for folder nesting
    const footerLinks = footerContainer.querySelectorAll("a");
    footerLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("/")) {
        link.href = relativePrefix + href.substring(1);
      }
    });
  }

  // Inject Subscribe Modal
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);

  const modal = document.getElementById("subscribe-modal");
  if (modal) {
    const closeBtn = modal.querySelector(".modal-close-btn");
    
    // Attach click listeners to all subscribe buttons
    document.querySelectorAll(".subscribe-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling of background page
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = ""; // Re-enable background scrolling
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Close when clicking overlay background
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
});

// Global Sidebar Tab Switcher Helper
window.switchSidebarTab = function(event, tabId) {
  const widget = event.currentTarget.closest('.widget-tabs');
  if (!widget) return;
  
  // Deactivate all buttons and contents
  widget.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  widget.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Activate current button and tab content
  event.currentTarget.classList.add('active');
  const targetContent = widget.querySelector('#' + tabId);
  if (targetContent) {
    targetContent.classList.add('active');
  }
};
