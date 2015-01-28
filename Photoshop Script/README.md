# Photoshop Script to Create iPhone & android Icons from iTunesArtwork

WARNING!!! In the rare case that there are name collisions, this script will overwrite (delete perminently) files in the same folder in which the selected iTunesArtwork file is located. Therefore, to be safe, before running the script, it's best to make sure the selected iTuensArtwork file is the only file in its containing folder.

Copyright (c) 2010 Matt Di Pasquale 
Added tweaks Copyright (c) 2012 by [Josh Jones](http://www.appsbynight.com)
iOS 7 & 8 Compatibility Copyright (c) 2013-2014 by [Arthur Sabintsev](http://www.sabintsev.com)
Android Phone Compatibility Copyright (c) 2014-2015 by [Cartor Chen](https://github.com/cartor)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Prerequisite:
 First, create at least a 1024x1024 px PNG file according to:
  http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
  
Install - Save Create Icons.jsx to:
   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
* Restart Photoshop

Update:
 * Just modify & save, no need to resart Photoshop once it's installed.

Run:
 * With Photoshop open, select File > Scripts > Create Icons
 * When prompted select the prepared iTunesArtwork file for your app.
 * The different version of the icons will get saved to the same folder that the iTunesArtwork file is in.

[Adobe Photoshop JavaScript Reference](http://www.adobe.com/devnet/photoshop/scripting.html)

