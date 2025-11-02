// Helper function to update meta tags
function updateMetaTag(attribute, name, content) {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

// Add structured data for SEO
function addStructuredData(post) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || `${post.title} - Expert insights from Shred Security.`,
        "author": {
            "@type": "Organization",
            "name": "Shred Security",
            "url": "https://shredsecurity.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Shred Security",
            "logo": {
                "@type": "ImageObject",
                "url": "https://shredsecurity.com/assets/shred_sec_logo_2%20(2).png"
            }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "articleSection": post.category,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
    };
    
    if (post.imageUrl) {
        structuredData.image = post.imageUrl;
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Load all blog posts from JSON file
async function loadBlogPosts() {
    try {
        const response = await fetch('blog-posts/posts.json');
        if (!response.ok) {
            throw new Error(`Failed to load blog posts: ${response.status} ${response.statusText}`);
        }
        const posts = await response.json();
        console.log('Loaded blog posts:', posts.length);
        return posts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// Load blog post content from HTML file
async function loadBlogContent(contentFile) {
    try {
        const response = await fetch(`blog-posts/${contentFile}`);
        if (!response.ok) {
            throw new Error('Failed to load blog content');
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading blog content:', error);
        return '<p>Error loading content. Please try again later.</p>';
    }
}

// Get slug from URL
function getSlugFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    return slug;
}

// Load and display blog post content
async function loadBlogPost() {
    const slug = getSlugFromURL();
    if (!slug) {
        // If no slug, try to load the first post or redirect to blog listing
        const posts = await loadBlogPosts();
        if (posts.length > 0) {
            // Redirect to the first post (most recent)
            const firstPost = posts[0];
            window.location.href = `blog-post.html?slug=${firstPost.slug}`;
            return;
        } else {
            // No posts found, redirect to blog listing
            window.location.href = 'blog.html';
            return;
        }
    }

    const posts = await loadBlogPosts();
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
        console.error('Blog post not found:', slug);
        // Redirect to blog list or show error
        const postContent = document.getElementById('post-content');
        if (postContent) {
            postContent.innerHTML = '<p>Blog post not found. <a href="blog.html">Return to blog</a></p>';
        }
        return;
    }

    // Load the HTML content
    const content = await loadBlogContent(post.contentFile);
    
    // Update DOM elements
    const titleEl = document.getElementById('post-title');
    const dateEl = document.getElementById('post-date');
    const categoryEl = document.getElementById('post-category');
    const authorEl = document.getElementById('post-author');
    const contentEl = document.getElementById('post-content');
    const imageEl = document.querySelector('.blog-post-header-image');

    if (titleEl) titleEl.textContent = post.title;
    if (dateEl) dateEl.textContent = post.date;
    if (categoryEl) categoryEl.textContent = post.category;
    if (authorEl) authorEl.textContent = post.author;
    if (contentEl) contentEl.innerHTML = content;
    if (imageEl && post.imageUrl) {
        imageEl.src = post.imageUrl;
        imageEl.alt = post.title;
    }

    // Update page title
    document.title = `${post.title} - Shred Security Blog`;

    // Update SEO meta tags
    updateMetaTag('name', 'description', post.excerpt || `${post.title} - Expert insights on ${post.category} from Shred Security's audit team.`);
    updateMetaTag('property', 'og:title', post.title);
    updateMetaTag('property', 'og:description', post.excerpt || `${post.title} - Expert insights from Shred Security.`);
    updateMetaTag('property', 'og:type', 'article');
    updateMetaTag('property', 'og:url', window.location.href);
    if (post.imageUrl) {
        updateMetaTag('property', 'og:image', post.imageUrl);
    }
    updateMetaTag('name', 'twitter:title', post.title);
    updateMetaTag('name', 'twitter:description', post.excerpt || `${post.title} - Expert insights from Shred Security.`);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href);

    // Add structured data (JSON-LD)
    addStructuredData(post);

    // Update share links
    const currentUrl = encodeURIComponent(window.location.href);
    document.querySelectorAll('.share-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('twitter.com')) {
            link.setAttribute('href', `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(post.title)}`);
        } else if (href && href.includes('linkedin.com')) {
            link.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${encodeURIComponent(post.title)}`);
        }
    });
}

// Generate blog cards dynamically for blog listing page
async function generateBlogCards() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) {
        console.error('Blog grid not found');
        return;
    }

    const posts = await loadBlogPosts();
    
    if (!posts || posts.length === 0) {
        blogGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No blog posts found.</p>';
        console.error('No blog posts loaded');
        return;
    }
    
    // Sort by date (newest first)
    // Parse dates in "Month Day, Year" format (e.g., "November 2, 2025")
    posts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        // If parsing fails, keep original order
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return 0;
        }
        return dateB - dateA;
    });

    blogGrid.innerHTML = posts.map(post => {
        const imageHtml = post.imageUrl 
            ? `<img src="${post.imageUrl}" alt="${post.title}" class="blog-card-thumbnail">`
            : `<div class="blog-placeholder-img"><i class="fas fa-lock"></i></div>`;
        
        return `
            <article class="blog-card">
                <div class="blog-card-image">
                    ${imageHtml}
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="far fa-calendar"></i> ${post.date}</span>
                        <span class="blog-category">${post.category}</span>
                    </div>
                    <h2 class="blog-title">${post.title}</h2>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="blog-post.html?slug=${post.slug}" class="blog-read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the blog post page
    if (document.getElementById('post-content')) {
        loadBlogPost();
    }
    // Check if we're on the blog listing page
    if (document.querySelector('.blog-grid')) {
        generateBlogCards();
    }
});
