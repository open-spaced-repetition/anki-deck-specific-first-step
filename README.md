# Anki Deck-Specific First Step

A custom scheduling script for Anki that allows you to configure deck-specific first learning steps for new cards.

## Overview

Anki's default learning steps configuration doesn't allow you to set a custom interval for the first "Hard" button press on new cards. This script solves that limitation by enabling deck-specific configuration of the first learning step for "Again", "Hard", and "Good" buttons on new cards. See the [Anki documentation on Learning Steps](https://docs.ankiweb.net/deck-options.html?highlight=custom#learning-steps) for more information.

## Features

- Configure the first learning step for "Again", "Hard", and "Good" buttons on new cards (including the first "Hard" step, which Anki's default settings don't support)
- Set deck-specific first step intervals
- Automatically applies to new cards only
- Supports sub-deck matching (sub-decks inherit parent deck settings)
- Works with Anki's filtered decks and rescheduling

## Installation

1. Copy the contents of `custom_scheduling.js`
2. Open Deck Options in Anki using one of these methods:
   - Click the gear icon on the Decks screen
   - Select a deck and click **Options** at the bottom
   - Click **More > Options** while in review mode
   - Press **O** while in review mode
3. Navigate to the **Advanced** section
4. Scroll down to find the **Custom Scheduling** field
5. Paste the script into the Custom Scheduling field
6. Click **OK** to save

**Note:** Custom Scheduling is a global option, so the code applies to all presets. See the [Anki documentation](https://docs.ankiweb.net/deck-options.html?highlight=custom#custom-scheduling) for more details.

## Configuration

Edit the `deckStepConfig` array to add or modify deck configurations:

```javascript
{
    deckName: "ALL::Learning::日本語::Expression",  // Full deck path
    againMins: 0.34,   // First "Again" step in minutes
    hardMins: 6.7,     // First "Hard" step in minutes
    goodMins: 67.32    // First "Good" step in minutes
}
```

### Notes

- Deck names must match exactly (case-sensitive)
- Sub-decks are matched by prefix, so a sub-deck will inherit its parent's configuration
- Only affects **new cards** - existing cards in learning/review are not modified
- Only configures the **first** learning step for each button - subsequent steps follow Anki's default learning steps configuration
- First step durations are specified in minutes and converted to seconds automatically

## Example

For a deck named `ALL::Learning::日本語::Expression`:
- Clicking "Again" on a new card will schedule it for review in ~20 seconds (0.34 minutes)
- Clicking "Hard" will schedule it for ~6.7 minutes
- Clicking "Good" will schedule it for ~67 minutes

## License

This project is part of the open-spaced-repetition initiative.

