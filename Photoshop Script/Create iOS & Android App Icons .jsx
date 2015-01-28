// Photoshop Script to Create iPhone & android Icons from iTunesArtwork
//
// WARNING!!! In the rare case that there are name collisions, this script will
// overwrite (delete perminently) files in the same folder in which the selected
// iTunesArtwork file is located. Therefore, to be safe, before running the
// script, it's best to make sure the selected iTuensArtwork file is the only
// file in its containing folder.
//
// Copyright (c) 2010 Matt Di Pasquale
// Added tweaks Copyright (c) 2012 by Josh Jones http://www.appsbynight.com
// iOS 7 & 8 Compatibility Copyright (c) 2013-2014 by Arthur Sabintsev (http://www.sabintsev.com)
// Android Phone Compatibility Copyright (c) 2014-2015 by Cartor Chen (https://github.com/cartor)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Prerequisite:
// First, create at least a 1024x1024 px PNG file according to:
// http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
//
// Install - Save Create Icons.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop
//
// Update:
// * Just modify & save, no need to resart Photoshop once it's installed.
//
// Run:
// * With Photoshop open, select File > Scripts > Create Icons
// * When prompted select the prepared iTunesArtwork file for your app.
// * The different version of the icons will get saved to the same folder that
//   the iTunesArtwork file is in.
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html


// Turn debugger on. 0 is off.
// $.level = 1;

function DoIcons(iTunesArtwork, iconsInfo) {
  try
  {
    if (iTunesArtwork !== null) 
    { 
      var doc = open(iTunesArtwork, OpenDocumentType.PNG);
      
      if (doc == null)
      {
        throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
      }

      var startState = doc.activeHistoryState;       // save for undo
      var initialPrefs = app.preferences.rulerUnits; // will restore at end
      app.preferences.rulerUnits = Units.PIXELS;     // use pixels

      // Save icons in PNG using Save for Web.
      var sfw = new ExportOptionsSaveForWeb();
      sfw.format = SaveDocumentType.PNG;
      sfw.PNG8 = false; // use PNG-24
      sfw.transparency = true;
      doc.info = null;  // delete metadata

      var icon;
      for (i = 0; i < iconsInfo.length; i++) 
      {
        icon = iconsInfo[i];
        doc.resizeImage(icon.size, icon.size, // width, height
                        null, ResampleMethod.BICUBICSHARPER);

        checkFolderExist(icon.density);

        doc.exportDocument(new File(icon.density + "/" + icon.name), ExportType.SAVEFORWEB, sfw);
        doc.activeHistoryState = startState; // undo resize
      }
    }
  }
  catch (exception)
  {
    // Show degbug message and then quit
    if ((exception != null) && (exception != ""))
      alert(exception);
   }
  finally
  {
      if (doc != null)
          doc.close(SaveOptions.DONOTSAVECHANGES);
    
      app.preferences.rulerUnits = initialPrefs; // restore prefs
  }
}

function DoiOSIcons(iTunesArtwork, destFolder) {
  if (iTunesArtwork == null) return;
  if (destFolder == null) return;

  try
  {
    destFolder +="/iOS";
      
    var icons = [
      {"name": "iTunesArtwork@2x",    "size": 1024, "density": ""},
      {"name": "iTunesArtwork",       "size": 512,  "density": ""},    
      {"name": "Icon-29",             "size": 29,   "density": ""},
      {"name": "Icon-40",             "size": 40,   "density": ""},
      {"name": "Icon-50",             "size": 50,   "density": ""},
      {"name": "Icon-57",             "size": 57,   "density": ""},
      {"name": "Icon-58",             "size": 58,   "density": ""},
      {"name": "Icon-60",             "size": 60,   "density": ""},
      {"name": "Icon-72",             "size": 72,   "density": ""},
      {"name": "Icon-76",             "size": 76,   "density": ""},
      {"name": "Icon-80",             "size": 80,   "density": ""},
      {"name": "Icon-87",             "size": 87,   "density": ""},
      {"name": "Icon-100",            "size": 100,  "density": ""},
      {"name": "Icon-114",            "size": 114,  "density": ""},
      {"name": "Icon-120",            "size": 120,  "density": ""},
      {"name": "Icon-144",            "size": 144,  "density": ""},
      {"name": "Icon-152",            "size": 152,  "density": ""},
      {"name": "Icon-180",            "size": 180,  "density": ""}  
    ];

    for (i = 0; i < icons.length; i++) 
    {
      if ((icons[i].name != "iTunesArtwork@2x") && (icons[i].name != "iTunesArtwork"))
      {
        // iTunesArtwork files don't have an extension
        icons[i].name += ".png";
      }

      icons[i].density = destFolder;
    }

    DoIcons(iTunesArtwork, icons);
  }
  catch (exception)
  {
    // Show degbug message and then quit
  	if ((exception != null) && (exception != ""))
      alert(exception);
  }
}

function DoAndroidIcons(iTunesArtwork, destFolder) {
  if (iTunesArtwork == null) return;
  if (destFolder == null) return;

  try
  {
    destFolder +="/Android";
      
    var icons = [
      {"name": "Icon", "size":48,  "density": "mdpi"},
      {"name": "Icon", "size":72,  "density": "hdpi"},
      {"name": "Icon", "size":96,  "density": "xhdpi"},
      {"name": "Icon", "size":144, "density": "xxhdpi"},
      {"name": "Icon", "size":512, "density": "web"},
    ];

    for (i = 0; i < icons.length; i++) 
    {
      icons[i].name += ".png";

      icons[i].density = destFolder + "/" + GetDrawableName(icons[i].density);
    }

    DoIcons(iTunesArtwork, icons);
  }
  catch (exception)
  {
    // Show degbug message and then quit
    if ((exception != null) && (exception != ""))
    alert(exception);
   }
}

function getFileName() {
  var iTunesArtwork;
  try
  {
    // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
    iTunesArtwork = File.openDialog("Select a sqaure PNG file that is at least 1024x1024.", "*.png", false);

    if (iTunesArtwork !== null) 
    { 
      var doc = open(iTunesArtwork, OpenDocumentType.PNG);
      
      if (doc == null)
      {
        throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
      }

      var startState = doc.activeHistoryState;       // save for undo
      var initialPrefs = app.preferences.rulerUnits; // will restore at end
      app.preferences.rulerUnits = Units.PIXELS;     // use pixels

      if (doc.width != doc.height)
      {
        throw "Image is not square";
      }
      else if ((doc.width < 1024) && (doc.height < 1024))
      {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
      }
      else if (doc.width < 1024)
      {
        throw "Image width is too small!  Image width must be at least 1024 pixels.";
      }
      else if (doc.height < 1024)
      {
        throw "Image height is too small!  Image height must be at least 1024 pixels.";
      }
    }
  }
  catch (exception)
  {
    // Show degbug message and then quit
    if ((exception != null) && (exception != ""))
    alert(exception);
   }
  finally
  {
    if (doc != null)
      doc.close(SaveOptions.DONOTSAVECHANGES);
    
    app.preferences.rulerUnits = initialPrefs; // restore prefs

    return iTunesArtwork;
  }
}

function GetDestFolder() {
  // Folder selection dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");

    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }

    return destFolder;
}

function checkFolderExist(folder) {
  var dirstore = Folder(folder);
  if(!dirstore.exists) { dirstore.create(); }
}

function GetDrawableName(density) {
  var result = "drawable";
  
  if (density === "mdpi")
    return result;
    
  if (density === "web")
    return density;
    
  result += "-" + density;
  
  return result;
}

var iTunesArtwork = getFileName();
var destDolder = GetDestFolder();

if (iTunesArtwork !== null && destDolder !== null) {
  DoiOSIcons(iTunesArtwork, destDolder);
  DoAndroidIcons(iTunesArtwork, destDolder);

  alert("iOS & Android Icons created!");
}
else {
  alert("created failed!");
}


