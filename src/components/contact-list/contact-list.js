import React, { Component } from 'react';
import Reorder from 'react-reorder';
import {List, ListItem} from 'material-ui/List';
import {CUSTOM_ASC} from '../app-constants';

const SortListItem = ({item: {firstName, lastName, phone, sortDisabled}}) => {
    return (
        <ListItem
            primaryText={firstName +' '+ lastName}
            secondaryText={phone}
            disabled={sortDisabled}
        />
    );
};

const ContactList = ({contacts, sortBy, updateSequenceNumbers}) => {
    return (
        <Reorder
            // The key of each object in your list to use as the element key
            itemKey='id'
            // Lock horizontal to have a vertical list
            lock='horizontal'
            // The milliseconds to hold an item for before dragging begins
            holdTime='0'
            // The list to display
            list={contacts}
            // A template to display for each list item
            template={SortListItem}
            // Function that is called once a reorder has been performed
            callback={(event, item, index, newIndex, list) => updateSequenceNumbers(list)}
            // Class to be applied to the outer list element
            listClass='my-list'
            // Class to be applied to each list item's wrapper element
            itemClass='list-item'
            // The key to compare from the selected item object with each item object
            selectedKey='sequenceId'
            // Allows reordering to be disabled
            disableReorder={sortBy !== CUSTOM_ASC}
        />
    );
};

export default ContactList;
