# Blog Posts Guide

This directory contains all blog posts for the Shred Security website. Each blog post consists of:
1. **Metadata** in `posts.json` - title, date, category, excerpt, etc.
2. **Content** in a separate HTML file - the actual blog post content

## Adding a New Blog Post

### Step 1: Create the Content File
Create a new HTML file in this directory with a descriptive filename (slug format):
```
your-blog-post-slug.html
```

The filename should be:
- Lowercase
- Use hyphens instead of spaces
- Descriptive (e.g., `understanding-defi-risks.html`)

### Step 2: Write Your Content
Write your blog post content in HTML format. You can use:
- Headers: `<h2>`, `<h3>`, etc.
- Paragraphs: `<p>`
- Lists: `<ul>`, `<ol>`
- Code blocks: `<pre><code class="language-xxx">`
- Links: `<a href="...">`
- Images: `<img src="...">`

Example:
```html
<h2>Introduction</h2>
<p>Your introduction paragraph here.</p>

<h2>Main Content</h2>
<p>More content...</p>
```

### Step 3: Add Entry to posts.json
Add a new entry to `posts.json`:

```json
{
  "slug": "your-blog-post-slug",
  "title": "Your Blog Post Title",
  "date": "January 20, 2025",
  "category": "Security Research",
  "author": "Shred Security Team",
  "excerpt": "A brief description of your blog post that appears on the blog listing page.",
  "imageUrl": "https://example.com/image.jpg",
  "contentFile": "your-blog-post-slug.html"
}
```

**Fields:**
- `slug`: URL-friendly identifier (same as filename without .html)
- `title`: Full title of the blog post
- `date`: Publication date in "Month Day, Year" format
- `category`: Category (e.g., "Security Research", "Best Practices", "Technical")
- `author`: Author name
- `excerpt`: Short description (appears on blog listing)
- `imageUrl`: Header image URL (can be empty string "")
- `contentFile`: Name of the HTML content file

### Step 4: Test
1. Open `blog.html` - your new post should appear in the list
2. Click on your post - it should load correctly
3. The URL will be: `blog-post.html?slug=your-blog-post-slug`

## URL Format

Blog posts use slug-based URLs:
- Blog listing: `blog.html`
- Individual post: `blog-post.html?slug=your-slug-here`

Example:
- `blog-post.html?slug=cosmos-blockchain-security`
- `blog-post.html?slug=understanding-smart-contract-vulnerabilities`

## Notes

- Posts are automatically sorted by date (newest first) on the blog listing page
- The content HTML files are loaded via fetch(), so you need a local HTTP server for development (not file://)
- For development, use: `python -m http.server 8000` or `npx serve`
- In production (GitHub Pages, etc.), fetch() works fine with static files

