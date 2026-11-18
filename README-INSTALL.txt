SIDEMEN TOUR GUIDE - BLOG STARTER
=================================

This package adds a first blog index and one article. It does not overwrite your existing website files.

FILES
- blog/index.html
- blog/blog.css
- blog/5-best-things-to-do-in-sidemen-bali/index.html

INSTALL
1. Make a backup of your current website folder.
2. Extract this ZIP.
3. Copy the included "blog" folder into your website root folder:
   C:\Users\junia\sidemen-tour-guide\sidemen-tour-guide\
4. Confirm the resulting paths are:
   ...\sidemen-tour-guide\blog\index.html
   ...\sidemen-tour-guide\blog\blog.css
   ...\sidemen-tour-guide\blog\5-best-things-to-do-in-sidemen-bali\index.html

5. Add a Blog link to the existing navigation in your root index.html.
   Place this line among the other navigation links:
   <a href="blog/index.html">Blog</a>

   You can later add the same link to tours.html, About.html and other site-wide navigation bars.

IMAGE CHECK
The pages refer to existing image files in your website's images folder:
- images/logo.png
- images/sidemen.jpg
- images/ricefield-experience.jpg
- images/purification-lead-by-local-priest.jpg
- images/guided-scooter-tour.jpg
- images/local-lunch-experience.jpg

The cooking-class section currently uses local-lunch-experience.jpg because the uploaded homepage source did not identify a separate cooking-class photo. Replace that image reference with your actual cooking-class photo filename when you know it.

IMPORTANT LINKS
The article links to these existing pages:
- tours.html
- transport-scooter-rental-sidemen.html
- balinese-cooking-class-sidemen.html
- authentic-local-lunch.html

Before publishing, confirm that these files exist in your website root and that the URLs are correct.

LOCAL PREVIEW
- Open the project folder in VS Code.
- Right-click blog/index.html and choose "Open with Live Server" if you use the Live Server extension.
- Open the article from the blog page.
- Test the navigation, images, and WhatsApp buttons on desktop and mobile width.

NETLIFY
Once the pages work locally, deploy using your usual Netlify workflow. The new URLs will be:
https://sidementourguide.com/blog/
https://sidementourguide.com/blog/5-best-things-to-do-in-sidemen-bali/

SEO NOTES
- Each page has its own title, meta description and canonical URL.
- The article includes a clear H1, descriptive H2 sections, internal links, image alt text and a WhatsApp call to action.
- Submit the two URLs for indexing in Google Search Console after deployment.
