/*
 * RelationshipTypes.js
 * defines constants & utility functions for relationship types
 */

import Theme from './Theme';

const Types = {
    Friend: 0,
    Acquaintance: 1,
    Touchpoint: 2,
};

const ContactFreqs = {
    0: 14, // days (2 weeks)
    1: 30, // days (1 month)
    2: 60, // days (2 months)
};

function getColor(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.Blue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

function getColorFaded(type) {
    if (type === Types.Friend) return Theme.FadedGreen;
    else if (type === Types.Acquaintance) return Theme.FadedBlue;
    else if (type === Types.Touchpoint) return Theme.FadedPurple;
}

function getColorImage(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.DarkBlue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

function getText(type) {
    if (type === Types.Friend) return 'Friend';
    else if (type === Types.Acquaintance) return 'Acquaintance';
    else if (type === Types.Touchpoint) return 'Touchpoint';
}

export {
    Types,
    ContactFreqs,
    getColor,
    getColorFaded,
    getColorImage,
    getText,
};