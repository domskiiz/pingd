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

function getBorderColor(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.Blue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

function getImageBorderColor(type) {
    if (type === Types.Friend) return Theme.Green;
    else if (type === Types.Acquaintance) return Theme.DarkBlue;
    else if (type === Types.Touchpoint) return Theme.Purple;
}

export {
    Types,
    getBorderColor,
    getImageBorderColor,
};