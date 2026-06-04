// Dynamic comments controller with integrated database & fetch interceptors for local development
// Supports file:// and http://localhost protocols seamlessly on all blog posts

// 1. Intercept comments.php fetch requests on local static HTTP web servers
(function() {
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    const urlStr = typeof input === 'string' ? input : (input && input.url) || '';
    if (urlStr.includes('comments.php')) {
      const urlObj = new URL(urlStr, window.location.href);
      const slug = urlObj.searchParams.get('slug') || '';
      
      let dbComments = [];
      if (window.allComments && window.allComments[slug]) {
        dbComments = window.allComments[slug];
      }
      
      let userComments = [];
      try {
        const stored = localStorage.getItem('comments_' + slug);
        if (stored) userComments = JSON.parse(stored);
      } catch(e) {}
      
      const allComments = [...dbComments, ...userComments];

      if (!init || init.method === 'GET') {
        return Promise.resolve(new Response(JSON.stringify(allComments), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      
      if (init && init.method === 'POST') {
        try {
          const body = JSON.parse(init.body);
          const postSlug = body.slug;
          const now = new Date();
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let hours = now.getHours();
          const ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12;
          const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} at ${hours}:${String(now.getMinutes()).padStart(2, '0')} ${ampm}`;
          
          const newComment = {
            name: body.name,
            email: body.email,
            website: body.website,
            text: body.text,
            date: now.toISOString(),
            formatted_date: formattedDate
          };
          
          let localComments = [];
          try {
            const stored = localStorage.getItem('comments_' + postSlug);
            if (stored) localComments = JSON.parse(stored);
          } catch(e) {}
          
          localComments.push(newComment);
          localStorage.setItem('comments_' + postSlug, JSON.stringify(localComments));
          
          return Promise.resolve(new Response(JSON.stringify(newComment), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        } catch (err) {
          console.error("Mock fetch error:", err);
        }
      }
    }
    return originalFetch.apply(this, arguments);
  };
})();

// 2. Embedded Static Comments Database (from comments-data.js)
// Statically parsed approved comments from WordPress database
window.allComments = {
  "let-the-birds-fly-in-and-out": [
    {
      "name": "AnjiReddy",
      "email": "99fortunehomes@gmail.com",
      "website": "https://fortune99homes.com/fortune-smart-city-open-plots-in-shadnagar/",
      "text": "Thanks for sharing information we are very fortune to glance your projects, and we are looking forward to see information\r\n, please keep sharing.",
      "date": "2020-12-17 07:55:37",
      "formatted_date": "December 17, 2020 at 7:55 AM"
    },
    {
      "name": "Srinivas",
      "email": "knsmines888@gmail.com",
      "website": "",
      "text": "It is a very good article about cool houses by using environmental friendly materials  even I am planning to construct one",
      "date": "2021-03-22 04:47:07",
      "formatted_date": "March 22, 2021 at 4:47 AM"
    }
  ],
  "bangalores-greenest-homes": [
    {
      "name": "Govind Shet",
      "email": "babubai21@gmail.com",
      "website": "",
      "text": "I am looking for construction of ecofriendly low budget earth house in my hometown at Haldipur, Honnavar taluka in Uttara Kannada District of Karnataka. The house is small of about 1000 sq.ft. of area. Will you please help me how to go about this project.",
      "date": "2020-12-29 04:57:21",
      "formatted_date": "December 29, 2020 at 4:57 AM"
    }
  ],
  "not-just-another-brick-in-the-wall": [
    {
      "name": "Rajesh",
      "email": "rajesh.hoskote@yahoo.com",
      "website": "",
      "text": "It really good and very much for today's living we need to come forward for a life ahead of time r it back to basics, best for life ok thanks",
      "date": "2021-01-29 07:39:43",
      "formatted_date": "January 29, 2021 at 7:39 AM"
    }
  ],
  "controlling-the-process-of-sustainability": [
    {
      "name": "Shreya Ashwini",
      "email": "sruthii0697@gmail.com",
      "website": "https://suvarnarekhadesign.com/",
      "text": "Wonderful article!Kudos to the writer.Keep posting more!",
      "date": "2021-09-14 11:01:44",
      "formatted_date": "September 14, 2021 at 11:01 AM"
    }
  ],
  "lost-in-nature": [
    {
      "name": "what is the purpose of tiktok?",
      "email": "leonardofinckh@aol.com",
      "website": "https://zenwriting.net",
      "text": "I have read so many posts regarding the blogger lovers \r\nbut this post is genuinely a fastidious piece of writing, keep it up.",
      "date": "2021-10-28 01:58:02",
      "formatted_date": "October 28, 2021 at 1:58 AM"
    }
  ],
  "very-nature-driven-homes": [
    {
      "name": "suvarnarekha",
      "email": "suvarnarekha.int@webindiasolutions.net",
      "website": "https://suvarnarekhadesign.com/",
      "text": "Great post and thank you for sharing these great post with us. Thank you",
      "date": "2022-01-18 11:05:09",
      "formatted_date": "January 18, 2022 at 11:05 AM"
    }
  ],
  "adhwaya": [
    {
      "name": "Hariprasad padaki",
      "email": "khpadaki@gmail.com",
      "website": "",
      "text": "Very good came to know quite few things about bird watching. \r\nConvey regards to your father Arun.",
      "date": "2022-02-08 16:31:41",
      "formatted_date": "February 8, 2022 at 4:31 PM"
    },
    {
      "name": "Arun Mysore Ramakrisha",
      "email": "arunmysore76@gmail.com",
      "website": "",
      "text": "Super Adhwaya, my best wishes to you...",
      "date": "2022-02-09 10:11:22",
      "formatted_date": "February 9, 2022 at 10:11 AM"
    },
    {
      "name": "Rajeev Varma",
      "email": "rajeevarti1994@gmail.com",
      "website": "",
      "text": "Keep it up boy. It's very heartwarming to know that you are persuing a very meaningful hobby. Slowly graduate to a DSLR camera with a decent zoom and Macro. Pictures taken by are awsome. Keep clicking.",
      "date": "2022-02-11 13:07:07",
      "formatted_date": "February 11, 2022 at 1:07 PM"
    },
    {
      "name": "B.Shankar Bhat",
      "email": "bhatshankar1@hotmail.com",
      "website": "",
      "text": "Good Adhwaya\r\nIf you have patience and perseverance, you will definitely excel in your this new adventure. All the Best.",
      "date": "2022-02-13 06:56:14",
      "formatted_date": "February 13, 2022 at 6:56 AM"
    },
    {
      "name": "Sandhya Srinivasan",
      "email": "sandhya.srinivasan@gmail.com",
      "website": "",
      "text": "Very nice to read about how Adhwaya's  interest in birding developed.",
      "date": "2022-02-14 02:59:11",
      "formatted_date": "February 14, 2022 at 2:59 AM"
    },
    {
      "name": "Ravi Srinivasan",
      "email": "ravisandhyas@gmail.com",
      "website": "",
      "text": "Great write up, meaningful insights of ' on being a birder' and lovely photos. Best wishes Adhwaya .",
      "date": "2022-02-14 03:20:06",
      "formatted_date": "February 14, 2022 at 3:20 AM"
    },
    {
      "name": "Mona",
      "email": "mona.r.sheth@gmail.com",
      "website": "",
      "text": "Thanks for sharing your story. It’s brilliant!",
      "date": "2022-02-14 03:28:51",
      "formatted_date": "February 14, 2022 at 3:28 AM"
    },
    {
      "name": "AJITH",
      "email": "ajith.h1983@gmail.com",
      "website": "",
      "text": "Glad to know about your journey of bird watching,, keep going.. All the best... \r\nThere are lot many things to learn from nature..",
      "date": "2022-02-14 12:23:58",
      "formatted_date": "February 14, 2022 at 12:23 PM"
    },
    {
      "name": "Shrikrishna herlekar",
      "email": "shriarch3@gmail.com",
      "website": "",
      "text": "Amazing adhvaya...never knew about your this hidden talent...reminds me of my yearly bird watching sessions with late dr salim ali at bharatpur sanctuary in 70's and 80s...all the best for your colourful bird watching journey ahead...",
      "date": "2022-02-14 12:39:23",
      "formatted_date": "February 14, 2022 at 12:39 PM"
    },
    {
      "name": "Vikas",
      "email": "vikas@vasttec.in",
      "website": "",
      "text": "I have been following your posts on Insta and they are impressive clicks. Hope you continue this into your adulthood and keep bringing us more good sightings. All the best",
      "date": "2022-02-15 03:50:06",
      "formatted_date": "February 15, 2022 at 3:50 AM"
    },
    {
      "name": "Saptha",
      "email": "sapthanature@gmail.com",
      "website": "",
      "text": "Nicely jotted down!!! Keep birding and clicking",
      "date": "2022-02-15 06:45:11",
      "formatted_date": "February 15, 2022 at 6:45 AM"
    },
    {
      "name": "Rohini Mallya",
      "email": "krohini.mallya@gmail.com",
      "website": "",
      "text": "Such a lovely article. Narrated with as many details as possible . Continue the passion of bird watching. Good luck",
      "date": "2022-02-15 12:20:22",
      "formatted_date": "February 15, 2022 at 12:20 PM"
    },
    {
      "name": "Prithvi",
      "email": "prithviraj06@gmail.com",
      "website": "",
      "text": "Very nice Adhwaya! Your photos are beautiful!",
      "date": "2022-02-15 13:09:40",
      "formatted_date": "February 15, 2022 at 1:09 PM"
    },
    {
      "name": "Adhwaya",
      "email": "padaki.adhwaya@gmail.com",
      "website": "",
      "text": "Thank you all for your encouraging words.  It means a lot to me.",
      "date": "2022-03-08 04:10:47",
      "formatted_date": "March 8, 2022 at 4:10 AM"
    },
    {
      "name": "John Santhosh",
      "email": "john.santhosh@gieom.com",
      "website": "",
      "text": "Your passion &amp; perseverance is a visual treat to our eyes.All the very best..",
      "date": "2022-03-26 01:16:18",
      "formatted_date": "March 26, 2022 at 1:16 AM"
    }
  ],
  "biophilia": [
    {
      "name": "Anil Sethi",
      "email": "anil@addgroup.co.in",
      "website": "https://spml.co.in/",
      "text": "Can you suggest me some good architects for such home in my Mysore plot  of 6 acres . I want to build my family holiday home with 8-10 rooms purely for personal use and spend my old age life there. Totally in Natural environment.",
      "date": "2022-03-19 05:44:55",
      "formatted_date": "March 19, 2022 at 5:44 AM"
    },
    {
      "name": "Pankaja",
      "email": "pankajakshi.k@gmail.com",
      "website": "",
      "text": "Do you have any villa near and approch to bangalore jayanagar",
      "date": "2022-03-25 02:02:20",
      "formatted_date": "March 25, 2022 at 2:02 AM"
    },
    {
      "name": "SUREKHA MANJUNATH",
      "email": "mansuchana@gmail.com",
      "website": "",
      "text": "Biophilia an very interesting project. want to know which part of bengaluru ? my contact number is 9880026243 and i am surekha manjunath.\r\n\r\nI would like to be in touch.",
      "date": "2022-03-28 04:12:27",
      "formatted_date": "March 28, 2022 at 4:12 AM"
    },
    {
      "name": "Anu bakshi",
      "email": "anufayian@gmail.com",
      "website": "",
      "text": "Are you planning anything in Delhi NCR or Gurgaon",
      "date": "2022-05-03 10:35:15",
      "formatted_date": "May 3, 2022 at 10:35 AM"
    }
  ],
  "designing-a-residential-project-for-wellness-sustainability-and-harmony": [
    {
      "name": "Malini",
      "email": "neets.miss@gmail.com",
      "website": "",
      "text": "Please let us know where are your latest projects",
      "date": "2022-05-13 11:08:52",
      "formatted_date": "May 13, 2022 at 11:08 AM"
    },
    {
      "name": "Navaneeth Krishna",
      "email": "navaneeth.star@gmail.com",
      "website": "",
      "text": "Kindly let me know when you have a new project to book one. \r\n9880387722",
      "date": "2022-05-15 06:04:09",
      "formatted_date": "May 15, 2022 at 6:04 AM"
    }
  ],
  "the-benefits-of-rooftop-rainwater-harvesting": [
    {
      "name": "Kalyan",
      "email": "advocatekalyan.chennai@gmail.com",
      "website": "",
      "text": "Community water Mgt, preservation is a better option - each community should be given with water lagoon and biodiversity around it - Reg earlier villages in TN typically a 250 to 300 acres will have all 7 types of porampoks (open space reserves) about 10% of total village space will have water bodies - kuttai, river and canals, wells, Temple tanks etc. and another 10% will be Maikkal porampok - natural grown grass, bushes and trees.  So in case you develop a 30 acre project you can use the save ratio - many birds, animals and fish will have coliving opportunities.",
      "date": "2022-05-28 01:58:43",
      "formatted_date": "May 28, 2022 at 1:58 AM"
    }
  ],
  "exploring-holistic-farming-in-wayanad": [
    {
      "name": "Sharat Hegde",
      "email": "sharat@inika.com",
      "website": "",
      "text": "Wonderful",
      "date": "2022-12-05 12:13:24",
      "formatted_date": "December 5, 2022 at 12:13 PM"
    },
    {
      "name": "Girish Appu",
      "email": "girishappu73@gmail.com",
      "website": "",
      "text": "Impressive. Loved the revival and local community livelihood",
      "date": "2022-12-06 05:17:59",
      "formatted_date": "December 6, 2022 at 5:17 AM"
    },
    {
      "name": "Vasant Jajoo",
      "email": "vasantjajoo@gmail.com",
      "website": "",
      "text": "It is always inspiring to hear about the work that you are doing at a grass root level and contributing to the overall health of the planet in such a holistic way. Beautiful blend and confluence of ground realities and modern science in action.\r\n\r\nKudos to your vision, leadership and real action at grass root level. You are indeed seeding in a whole new thought process in young minds. \r\n\r\nHat's off !! \r\n\r\n",
      "date": "2022-12-07 04:40:22",
      "formatted_date": "December 7, 2022 at 4:40 AM"
    },
    {
      "name": "Falgunan",
      "email": "falgunantp@gmail.com",
      "website": "",
      "text": "Congratulations for your holistic farming &amp; team work.",
      "date": "2022-12-07 15:06:27",
      "formatted_date": "December 7, 2022 at 3:06 PM"
    }
  ],
  "regenerative-agriculture-our-own-rice-bowl-at-wayanad": [
    {
      "name": "Shanta Manohar",
      "email": "shamanohar@gmail.com",
      "website": "",
      "text": "Very good effort in documenting and participating in this unique projects.",
      "date": "2023-08-19 08:00:54",
      "formatted_date": "August 19, 2023 at 8:00 AM"
    }
  ],
  "the-allure-of-bay-window-seats": [
    {
      "name": "admin",
      "email": "admin@goodearth.org.in",
      "website": "",
      "text": "Very informative blog",
      "date": "2023-09-29 10:20:42",
      "formatted_date": "September 29, 2023 at 10:20 AM"
    },
    {
      "name": "Test",
      "email": "maheshgd64@gmail.com",
      "website": "",
      "text": "Nice information",
      "date": "2023-09-29 10:22:53",
      "formatted_date": "September 29, 2023 at 10:22 AM"
    }
  ],
  "empowering-the-young-with-sustainable-foundations": [
    {
      "name": "Vikas",
      "email": "maheshgd135@gmail.com",
      "website": "",
      "text": "A very well written blog.",
      "date": "2023-10-06 09:19:12",
      "formatted_date": "October 6, 2023 at 9:19 AM"
    },
    {
      "name": "Sagar",
      "email": "Sagar123@gmail.com",
      "website": "",
      "text": "Nice blog",
      "date": "2023-10-07 07:17:39",
      "formatted_date": "October 7, 2023 at 7:17 AM"
    },
    {
      "name": "Chethan",
      "email": "chethangtchethu@gmail.com",
      "website": "",
      "text": "Nice blog",
      "date": "2023-10-08 03:51:58",
      "formatted_date": "October 8, 2023 at 3:51 AM"
    }
  ],
  "medley-a-true-melange-of-homes-crafted-spaces": [
    {
      "name": "Manju",
      "email": "mjmanju44@gmail.com",
      "website": "",
      "text": "Wonderful",
      "date": "2023-11-10 10:50:58",
      "formatted_date": "November 10, 2023 at 10:50 AM"
    }
  ]
};

// 3. Comments DOM Controller
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".comment-form");
  if (!form) return;
  
  // Extract post slug from location pathname
  const pathParts = window.location.pathname.split('/');
  let slug = pathParts[pathParts.length - 1];
  if (slug === 'index.html' || slug === '') {
    slug = pathParts[pathParts.length - 2];
  }
  
  const sidebarComments = document.getElementById("tab-comments");
  const commentPanel = document.querySelector(".blog-comment-panel");
  let mainCommentsList = null;
  
  function initMainCommentsThread() {
    // Disabled: post-specific comments thread below the tab widget is not required.
  }

  function loadGlobalSidebarComments() {
    if (!sidebarComments) return;
    
    // 1. Gather all database comments
    let allGlobalComments = [];
    if (window.allComments) {
      for (const postSlug in window.allComments) {
        const postComments = window.allComments[postSlug];
        postComments.forEach(c => {
          // Preprocess date standard ISO format (replacing space with 'T') to support Safari / older engines
          let standardDate = c.date;
          if (standardDate && typeof standardDate === 'string' && standardDate.includes(' ')) {
            standardDate = standardDate.replace(' ', 'T');
          }
          allGlobalComments.push({
            ...c,
            date: standardDate,
            postSlug: postSlug
          });
        });
      }
    }
    
    // 2. Gather all local user comments from localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("comments_")) {
          const postSlug = key.substring("comments_".length);
          const data = localStorage.getItem(key);
          if (data) {
            const userComments = JSON.parse(data);
            userComments.forEach(c => {
              allGlobalComments.push({
                ...c,
                postSlug: postSlug
              });
            });
          }
        }
      }
    } catch(e) {
      console.error(e);
    }
    
    // 3. Sort all comments by date descending (newest first)
    allGlobalComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 4. Show all global comments in a scrollable list
    const topComments = allGlobalComments;
    
    if (topComments.length > 0) {
      let ul = sidebarComments.querySelector("ul") || sidebarComments.querySelector("#sidebar-comments-list");
      if (!ul) {
        sidebarComments.innerHTML = '<ul class="tab-post-list" id="sidebar-comments-list" style="list-style: none; padding-left: 0; margin: 0;"></ul>';
        ul = sidebarComments.querySelector("ul") || sidebarComments.querySelector("#sidebar-comments-list");
      }
      if (ul) {
        ul.innerHTML = topComments.map(comment => {
          // Resolve correct link category prefix
          let categoryPath = "uncategorized";
          if (window.allPosts) {
            const foundPost = window.allPosts.find(p => p.slug === comment.postSlug);
            if (foundPost) {
              categoryPath = foundPost.category;
              if (categoryPath === "water-come-over") {
                categoryPath = "water/come-over";
              } else if (categoryPath === "residents-spotlight-tresh-takes") {
                categoryPath = "residents-spotlight/tresh-takes";
              }
            }
          }
          const postLink = `${relPrefix}${categoryPath}/${comment.postSlug}/index.html`;
          
          return `
            <li class="tab-post-item" style="padding: 0; border-bottom: 1px dashed var(--color-border); list-style: none; margin: 0;">
              <a href="${postLink}" style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem 0.5rem; text-decoration: none; color: inherit; width: 100%; border-radius: var(--radius-sm); transition: background 0.2s;" onmouseover="this.style.background='var(--color-bg-secondary)'" onmouseout="this.style.background='transparent'">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-bg-secondary); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--color-primary-dark); font-size: 0.8rem; flex-shrink: 0; text-transform: uppercase; border: 1px solid var(--color-border);">
                  ${comment.name.charAt(0)}
                </div>
                <div class="tab-post-info" style="margin-left: 0; flex: 1; min-width: 0;">
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary-dark); font-family: var(--font-heading); margin-bottom: 2px;">
                    ${comment.name}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted); font-family: var(--font-body);">${comment.formatted_date || comment.date}</div>
                  <p style="font-size: 0.8rem; color: var(--color-text-primary); margin-top: 4px; line-height: 1.4; font-family: var(--font-body); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; font-style: italic;">
                    "${comment.text}"
                  </p>
                </div>
              </a>
            </li>
          `;
        }).join("");
      }
    } else {
      sidebarComments.innerHTML = '<p style="padding: 1rem 0; font-size: 0.85rem; color: var(--color-text-muted); text-align: center;">No comments yet.</p>';
    }
  }
  
  // Detect environment
  const isLocal = window.location.protocol === 'file:';
  
  // Find correct relative path prefix to root using the comments.js script tag
  const commentsScript = document.querySelector('script[src*="comments.js"]');
  let relPrefix = "../../";
  if (commentsScript) {
    const src = commentsScript.getAttribute('src');
    relPrefix = src.replace('assets/js/comments.js', '');
  }
  const apiURL = relPrefix + "comments.php";
  
  // Load existing comments directly
  loadComments();
  
  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("comment-name").value.trim();
    const email = document.getElementById("comment-email").value.trim();
    const website = document.getElementById("comment-website").value.trim();
    const text = document.getElementById("comment-text").value.trim();
    
    if (!name || !text) {
      alert("Name and Comment fields are required.");
      return;
    }
    
    const commentData = {
      slug: slug,
      name: name,
      email: email,
      website: website,
      text: text
    };
    
    if (isLocal) {
      // Local development fallback: Store in localStorage
      const localComments = getLocalComments(slug);
      const newComment = {
        name: name,
        email: email,
        website: website,
        text: text,
        date: new Date().toISOString(),
        formatted_date: formatCommentDate(new Date())
      };
      localComments.push(newComment);
      saveLocalComments(slug, localComments);
      initMainCommentsThread();
      renderComment(newComment);
      loadGlobalSidebarComments();
      updateCommentCount();
      form.reset();
    } else {
      // Production hosting: POST to comments.php
      fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
      })
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(comment => {
        initMainCommentsThread();
        renderComment(comment);
        loadGlobalSidebarComments();
        updateCommentCount();
        form.reset();
      })
      .catch(err => {
        console.error("Error posting comment:", err);
        alert("Failed to submit comment. Please check your network connection.");
      });
    }
  });
  
  function updateCommentCount() {
    if (isLocal) {
      const comments = getLocalComments(slug);
      setCommentCountDOM(comments.length);
    } else {
      fetch(`${apiURL}?slug=${slug}`)
        .then(res => res.json())
        .then(comments => {
          setCommentCountDOM(comments ? comments.length : 0);
        })
        .catch(() => setCommentCountDOM(0));
    }
  }

  function setCommentCountDOM(count) {
    const metaFooter = document.querySelector(".blog-meta-footer");
    if (metaFooter) {
      const text = metaFooter.innerHTML;
      const lastPipe = text.lastIndexOf("|");
      if (lastPipe !== -1) {
        metaFooter.innerHTML = text.substring(0, lastPipe + 1) + ` ${count} Comment${count === 1 ? '' : 's'}`;
      }
    }
  }

  function loadComments() {
    // 1. Load global recent comments into sidebar Comments tab
    loadGlobalSidebarComments();
    
    // Update dynamic comment count in post footer
    updateCommentCount();

    // 2. Load post-specific comments
    if (isLocal) {
      const comments = getLocalComments(slug);
      if (comments.length > 0) {
        initMainCommentsThread();
        comments.forEach(renderComment);
      }
    } else {
      fetch(`${apiURL}?slug=${slug}`)
        .then(res => res.json())
        .then(comments => {
          if (comments && comments.length > 0) {
            initMainCommentsThread();
            comments.forEach(renderComment);
          }
        })
        .catch(err => console.error("Error loading comments:", err));
    }
  }
  
  function renderComment(comment) {
    // Disabled: post-specific comments thread below the tab widget is not required.
  }
  
  function getLocalComments(postSlug) {
    const key = `comments_${postSlug}`;
    
    // 1. Get database comments parsed from SQL dump (loaded from comments-data.js)
    let dbComments = [];
    if (window.allComments && window.allComments[postSlug]) {
      dbComments = window.allComments[postSlug];
    }
    
    // 2. Get local user comments added in this session / browser
    let userComments = [];
    try {
      const data = localStorage.getItem(key);
      if (data) {
        userComments = JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    
    return [...dbComments, ...userComments];
  }
  
  function saveLocalComments(postSlug, comments) {
    const key = `comments_${postSlug}`;
    
    let dbComments = [];
    if (window.allComments && window.allComments[postSlug]) {
      dbComments = window.allComments[postSlug];
    }
    
    // Only save new user comments to localStorage, not the static database comments
    const userComments = comments.slice(dbComments.length);
    try {
      localStorage.setItem(key, JSON.stringify(userComments));
    } catch (e) {
      console.error("Error writing localStorage:", e);
    }
  }
  
  function formatCommentDate(dateObj) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  }
});
