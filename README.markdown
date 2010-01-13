# Jubilator

[Jubilator](http://jubilator.thumblemonks.com/) is my attempt to make the GitHub repository browsing experience better. I often times find myself looking through some source code on GitHub and in fact, looking at many files at one time. Typically, I would open multiple tabs - one for each file - and possibly open another tab to work my way through directories. It's all very 1995; single request stuff.

You suggest I clone the repository locally. Yeah, I could do that. But I don't like committing myself to that; no pun intended. Seriously, it's a slight hassle, but a hassle for me nonetheless.

No ... I want to look at the source code online and I want to do it in an interface that feels like a text-editor, without the edit part. A nice, source code viewer.

### Usage

There are two ways you can use Jubilator: through my [hosted instance](http://jubilator.thumblemonks.com/) or by hosting your own instance. To host your own, simply clone the repo and configure a web server to point requests at that directory.

Also, when you go to the [hosted instance](http://jubilator.thumblemonks.com/), notice the bookmarklet at the top. If you put this in your bookmark bar, then when you are looking at a repo on GitHub itself you can click the bookmarklet and a new window will open with that repo loaded into Jubilator (yay!). I have found this to be very useful.

#### How does it work?

Jubilator is entirely HTML, CSS, and JavaScript. Beyond that, Jubilator uses the very awesome [GitHub Developer API](http://develop.github.com/) to:

* Get high-level information about a repository
* Retrieve information about trees (essentially, directories)
* Retrieve the content of a blob (essentially, files)

[jQuery](http://jquery.com/) is the general JavaScript toolkit of choice because I just love it. For this type of thing it is perfect! It also has some nice plugins that we take advantage of. For now, those are: jLayout, metadata, and sizes (for layout stuff). jLayout is very flexible.

We're using [Sammy](http://dailyjs.com/2009/11/05/sammy/) for the [SOFEA](http://dailyjs.com/2009/11/10/sofea-soui/) stuff; that is - the hash based URL routing. Very nice.

[Mustache.js](http://github.com/janl/mustache.js) is used for some of the basic content delivery needs. It's worth it to mention that Mustache.js can be used very nicely as a string interpolator:

    Mustache.to_html("repos/show/{{user}}/{{repo}}", {user:"thumblemonks", repo:"jubilator"})

Someone get creative and make that shorter.

Jubilator uses [Google's code prettifier](http://code.google.com/p/google-code-prettify/) for syntax highlighting. If I'm not mistaken, GitHub does the same. I've been wrong before.

### What it doesn't

It doesn't do a lot of things and it very well could. I would love to use this interface for a doing a lot of interacting with a repository (read-only for now). A short list would include:

* searching through content and/or for file names. Everyone who has seen Jubilator says first, "Does it search?"
* viewing other branches, commits, tags, etc. 
* viewing gists
* opening a side panel to see comments, blames, whatever
* keyboard shortcuts for controlling open tabs and such

There are also a few glitches at the moment, but they'll get worked out over time. Short list again:

* Not closing tabs when opening another repo
* Not loading all trees down to a blob when sent a specific address to a blob you have not opened

### Why is it called Jubilator?

This is an easy one. [gabrielg](http://github.com/gabrielg) and I were hanging out at a local bar called [Gasthaus](http://www.yelp.com/biz/gasthaus-zur-linde-elgin) and I noticed [this picture](http://www.flickr.com/photos/jaknowlden/4086032885/) on the wall (unknown, are those people in the picture). I thought, I want to name a project that. Eventually, I found that project.

Lesson learned, in good time things will wait :)

## Who to blame for all of this

Justin "Gus" Knowlden or Thumble Monks. And this is just public domain stuff. What the hell good is a license for something like this, which only really exists as a superficial wrapper on top of goodness? It's like patenting a bag to put stuff in, the process of clicking a button to purchase something online, getting into a car and going somewhere, whatever.

Speaking of that clicking a button thing, it seems like Djikstra had prior-art on shortest-path to a node. No wait, Euclid.
