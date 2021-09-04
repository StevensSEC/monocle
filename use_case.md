# Primary Use Case

This document intends to describe the primary use cases of the app.

Upon launching the app, the user is immediately taken into a view that enables the phone's camera, referred to herein as the "camera view". The image in the camera's view port takes up the entirety of the screen, though small elements exist around the borders. At the bottom of the screen is a large circular button. When this is pressed, a picture is taken. While the user has yet to take a picture, anything that the app believes may be printed text is highlighted in orange.

Once the user presses the button to cause a picture to be taken, the picture is taken and a loading symbol is displayed over the picture while it is still being analyzed. Once the picture is finished being analyzed by the machine learning model, a different view is displayed that will show the user the text it found. This will be referred to as the transcription view. 80% of the transcription view is a text box filled with the text that the machine learning model believed to have found when the picture was taken. The text in this box can be freely edited by the user, and is already highlighted when this view is switched to. The bottom 20% of the screen contain two buttons: one that copies the text from the text box into the phone's clipboard, and another that restores the original text from the machine learning model into the text box. The button that copies text is on the left and has an icon of two sheets of paper, and the other contains an icon of an arrow turning about itself. At the top left corner is an arrow pointing to the direct left; pressing that button returns to the camera view.

## Error Use Case

The user takes a picture of something where nothing within is identified as text. After the loading symbol appears over the picture for a short time, a small pop-up at the bottom appears that reads "no text found". The user is then returned to the camera view immediately.

## Embellishing Details

The large circular button contains a monocle icon.

In the camera view, there is a lightning-bolt icon with a slash through it. Tapping on this icon turns on the camera flash and changes the icon to a lightning-bolt with no slash. Tapping on this icon again returns the icon to its former state and disables the flash. The flash is disabled by default.