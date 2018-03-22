Angular 2 Gallery Plugin Exercise

Use the given JSON feed to create a gallery application using Angular 2.

The gallery should be written as a component that can be implemented in any Angular 2 project.

 

Requirements:

The gallery needs to work from within an independent component (plugin).
The component receives the following params and renders the gallery accordingly:
feed (String/Array) - path to load the json from / array of images
search (Boolean default:true) - show a search box
pagination (Boolean default true) - show a pagination component in the gallery.
results-per-page (Number, default 10) - number of results on each page of the gallery
sorting (Boolean default true) - allow the user to sort by the images elements (title, date)
auto-rotate-time (Number default 4) - Time for image slideshow mode
The gallery should have the following controls:
Pagination.
Search input box.
Sort by dropdown.
Items per page drop-down. (5, 10, 15 or 20 results Default to 10).
Slideshow - show the user a slideshow of the images that auto rotates according to the given time in the auto-rotate-time attribute
When clicking an image show a larger view (modal) of the picture with next/prev controls.
Using localStorage, enable the user to “delete” an image by adding it to a blacklist.
The gallery should handle unavailable images and show a placeholder instead (there are 2 false images in the given feed, they will return a 304 status).
 

Images JSON:

https://s3.amazonaws.com/yotpo-public/images.json

 
