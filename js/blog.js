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

// Blog Posts Data
const blogPosts = {
    1: {
        title: "Understanding Smart Contract Vulnerabilities",
        date: "January 15, 2025",
        category: "Security Research",
        author: "Shred Security Team",
        content: `
            <h2>Introduction</h2>
            <p>Smart contract vulnerabilities represent one of the most critical risks in the blockchain ecosystem. As DeFi protocols handle billions of dollars in assets, understanding these vulnerabilities is essential for developers and auditors alike.</p>
            
            <h2>Common Vulnerability Types</h2>
            <h3>1. Reentrancy Attacks</h3>
            <p>Reentrancy occurs when an external contract calls back into the calling contract before the initial execution completes. This can lead to unauthorized withdrawals and fund drainage.</p>
            
            <h3>2. Integer Overflow/Underflow</h3>
            <p>While Solidity 0.8.0+ includes built-in overflow protection, older contracts remain vulnerable to integer manipulation attacks that can cause unexpected behavior.</p>
            
            <h3>3. Access Control Issues</h3>
            <p>Improper access control mechanisms can allow unauthorized users to execute privileged functions, leading to fund theft or protocol manipulation.</p>
            
            <h2>Prevention Strategies</h2>
            <ul>
                <li>Implement the Checks-Effects-Interactions pattern</li>
                <li>Use OpenZeppelin's secure libraries</li>
                <li>Conduct thorough security audits</li>
                <li>Implement comprehensive test coverage</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Understanding smart contract vulnerabilities is the first step toward building secure DeFi protocols. Regular audits and following security best practices are essential for protecting user funds.</p>
        `
    },
    2: {
        title: "Best Practices for DeFi Security Audits",
        date: "January 10, 2025",
        category: "Best Practices",
        author: "Shred Security Team",
        content: `
            <h2>Introduction</h2>
            <p>Security audits are a critical component of the DeFi development lifecycle. This guide outlines best practices for conducting and preparing for security audits.</p>
            
            <h2>Preparation Phase</h2>
            <p>Before engaging an audit firm, ensure your codebase is well-documented, tested, and follows industry standards. This significantly reduces audit time and costs.</p>
            
            <h2>During the Audit</h2>
            <p>Maintain open communication with auditors, provide comprehensive documentation, and be prepared to address findings promptly.</p>
            
            <h2>Post-Audit Actions</h2>
            <p>After receiving audit findings, prioritize critical and high-severity issues, implement fixes, and consider a re-audit for critical changes.</p>
            
            <h2>Conclusion</h2>
            <p>Following these best practices ensures a smooth audit process and maximizes the security benefits of professional code review.</p>
        `
    },
    3: {
        title: "Layer 2 Security Considerations",
        date: "January 5, 2025",
        category: "Technical",
        author: "Shred Security Team",
        content: `
            <h2>Introduction</h2>
            <p>Layer 2 solutions offer scalability improvements but introduce unique security considerations that developers must address.</p>
            
            <h2>Security Challenges</h2>
            <p>L2 solutions introduce new attack vectors including bridge vulnerabilities, sequencer risks, and data availability concerns.</p>
            
            <h2>Best Practices</h2>
            <p>Implement proper validation mechanisms, design secure bridge contracts, and consider data availability guarantees when building on L2.</p>
            
            <h2>Conclusion</h2>
            <p>While L2 solutions provide scalability, security must remain a top priority throughout the development process.</p>
        `
    }
};

// Load blog post content based on URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId && blogPosts[postId]) {
        const post = blogPosts[postId];
        
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-date').textContent = post.date;
        document.getElementById('post-category').textContent = post.category;
        document.getElementById('post-author').textContent = post.author;
        document.getElementById('post-content').innerHTML = post.content;
        
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
            if (href.includes('twitter.com')) {
                link.setAttribute('href', `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(post.title)}`);
            } else if (href.includes('linkedin.com')) {
                link.setAttribute('href', `https://www.linkedin.com/shareArticle?url=${currentUrl}&title=${encodeURIComponent(post.title)}`);
            }
        });
    }
});

