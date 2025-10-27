Apple Orchard — Demo static site
--------------------------------
Files:
- index.html (home)
- products.html (product catalog)
- checkout.html (demo checkout)
- about.html
- assets/css/style.css
- assets/js/cart.js

Images are loaded from source.unsplash.com (Unsplash Source) which returns working image URLs for queries like:
  https://source.unsplash.com/featured/?apple,orchard

For production hosting:
- Download the images you like and host them under assets/images/
- Replace the source.unsplash.com URLs in the HTML with local image paths
- Add a proper payment integration (Stripe/Razorpay) on the checkout page

Attribution:
Unsplash photos are free to use under Unsplash license. For full license details visit https://unsplash.com/license
