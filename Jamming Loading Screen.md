
# Jamming Loading Screen
July 13, 2024

## OBJECTIVE
Add a loading screen during playlist saving to enhance the user experience.

## BACKGROUND
Adding a loading screen during playlist saving is crucial to provide visual feedback to users while they wait for their playlist to be saved to Spotify. Without this feedback, users might think that the application is not functioning correctly or that the saving process has failed, leading to potential frustration. User experience studies show that having a clear loading indication reduces user anxiety and improves their perception of waiting time. By implementing a loading screen with a completion percentage, users will be informed about the progress of the playlist saving, thereby improving the overall usability of the application.

## TECHNICAL DESIGN
To implement this feature, new components will be created and existing ones will be updated.

### LoadingScreen Component
- Creation of a new `LoadingScreen` component that displays a loading circle and a completion percentage.
- CSS to style the loading circle, making it larger and more colorful, and to display the percentage.

### App Component Modifications
- Adding an `isLoading` state to manage the visibility of the loading screen.
- Adding a `percentage` state to track the loading progress.
- Logic to increment the percentage during the playlist saving process.
- Integration of the `LoadingScreen` component within the `App` component.

## CAVEATS
A possible alternative would be implementing a simple loading animation without a percentage. However, this might not provide detailed feedback on the progress, potentially reducing clarity for the user. Another alternative could be using textual messages to inform the user about the saving status. However, textual messages might not be as dynamic or visually engaging as an animated loading bar with a percentage. The proposed solution combines clear and detailed visual feedback, enhancing user interaction compared to the considered alternatives.

