# flickr-browser
A tool for easily browsing and viewing public photos on Flickr

This is my submission for the Holiday Extras tech assessment!

It's a React/Redux app built in ES6 JavaScript, transpiled through Babel.

It consumes the Flickr API to allow users to browse and view publically available photos.


## Installation Instructions

1. Clone the repo

```
git clone git@github.com:david-moxon/flickr-browser.git
```

2. Go to the root directory

```
cd flickr-browser
```

3. Install dependencies

```
npm install
```

4. Run the dev server

```
npm run dev-open
```


## Features

- Search: find a selection of photos on Flickr by entering a search term (safe search is automatically enabled)
- Progressive Loading: photos are loaded in batches, each being loaded dynamically when you scroll to the bottom of the page
- Tag Search: click on a photo's tag to search all photos on Flickr with the same tag. Click more tags to refine your results
- Preview: hover over a photo to see a larger image
- Photo Link: click the photo's title to visit the photo on Flickr
- Author Link: click the photo's author to visit their page on Flickr


## Further Changes

Things I would like to do to improve this:

- Fade out the preview when moving off the photo
- Correct the preview showing off-screen for those toward the right-hand side of the page
- Correctly format the total number of photos in the heading (e.g. "Showing 13,241 photos...")


@david-moxon
