# Assessment Answers

**1. How to run:** Open the `index.html` file directly in any modern web browser. No installations or build tools are required.

**2. Stack & design choices:** I chose vanilla HTML, CSS, and JavaScript. Since this is a single-screen app with relatively localized state, a heavy framework like React wasn't strictly necessary.
*Decision 1:* I used CSS variables (`--primary-color`, `--bg-color`) attached to the `body` tag so the entire app can instantly switch from a "Focus" theme (Red) to a "Break" theme (Teal) by toggling a single class in JavaScript.
*Decision 2:* I set `font-variant-numeric: tabular-nums;` on the timer display so the numbers don't jump left and right as the seconds tick down, creating a much smoother visual experience.

**3. Responsive & accessibility:** The app is fully responsive. It uses a flexible flexbox layout and a `max-width` on the main card container, meaning it scales down gracefully to fit a 360px phone screen while remaining perfectly centered on a 1440px laptop screen.
*Accessibility Handled:* High color contrast between the white text and the primary colored buttons.
*Accessibility Skipped:* I knowingly skipped adding comprehensive ARIA live regions for the countdown timer. Announcing every single ticking second to a screen reader would be overwhelming for the user.

**4. AI usage:** *Tool:* Gemini
*Usage:* I used Gemini as an interactive tutor to help me scaffold the HTML structure and write the CSS variable logic for the theme switching. 
*Modification:* Gemini provided a base JavaScript logic block for the timer, but I modified it to use the browser's native `AudioContext` API to generate a beep sound instead of relying on an external `.mp3` file that could break upon submission.

**5. Honest gap:** If I had another day, I would improve the history list. Currently, it just adds items to a scrolling list. I would add a visual counter (e.g., "3 Sessions Completed Today") and perhaps a progress bar indicating how close the user is to a standard 4-cycle Pomodoro goal.