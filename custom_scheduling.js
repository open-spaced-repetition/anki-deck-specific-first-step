const deckStepConfig = [
    {
        deckName: "ALL::Learning::日本語::Expression",
        againMins: 0.34,
        hardMins: 6.7,
        goodMins: 67.32
    },
    {
        deckName: "ALL::Learning::日本語::Jlab's beginner course",
        againMins: 8.23,
        hardMins: 19.86,
        goodMins: 189.69
    },
    {
        deckName: "ALL::Learning::日本語::蓝宝书N1-N5【超值白金版】",
        againMins: 4.43,
        hardMins: 28.90,
        goodMins: 101.04
    },
]

debugger;

let currentConfig = {};
// get the name of the card's deck
if (deck_name = get_deckname()) {
    // Arrange the deckParams of sub-decks in front of their parent decks.
    deckStepConfig.sort(function (a, b) {
        return -a.deckName.localeCompare(b.deckName);
    });
    for (let i = 0; i < deckStepConfig.length; i++) {
        if (deck_name.startsWith(deckStepConfig[i]["deckName"])) {
            currentConfig = deckStepConfig[i];
            break;
        }
    }
}

if (Object.keys(currentConfig).length > 0 && is_new()) {
    const mapping = [
        { key: "again", mins: "againMins" },
        { key: "hard", mins: "hardMins" },
        { key: "good", mins: "goodMins" }
    ];
    mapping.forEach(({ key, mins }) => {
        const state = states[key]?.normal?.learning;
        if (state) {
            state.scheduledSecs = mins_to_secs(currentConfig[mins]);
        }
    });
}

function get_deckname() {
    if (typeof ctx !== 'undefined' && ctx.deckName) {
        return ctx.deckName;
    } else if (document.getElementById("deck") !== null && document.getElementById("deck").getAttribute("deck_name")) {
        return document.getElementById("deck").getAttribute("deck_name");
    } else {
        return null;
    }
}

function is_new() {
    if (states.current.normal?.new !== undefined && states.current.normal?.new !== null) {
        return true;
    }
    if (
        states.current.filtered?.rescheduling?.originalState !== undefined &&
        Object.hasOwn(states.current.filtered?.rescheduling?.originalState, 'new')
    ) {
        return true;
    }
    return false;
}

function mins_to_secs(mins) {
    return Math.round(mins * 60);
}