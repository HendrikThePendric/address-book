import React, { Component } from 'react';
import {mockContacts} from '../mock-contacts/mock-contacts';
import {F_NAME_ASC, F_NAME_DESC, L_NAME_ASC, L_NAME_DESC, PHONE_ASC, PHONE_DESC, CUSTOM_ASC} from './app-constants';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddContact from './add-contact/add-contact';
import SortContacts from './sort-contacts/sort-contacts';
import ContactList from './contact-list/contact-list';

injectTapEventPlugin();

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: JSON.parse(localStorage.getItem('contacts')) || mockContacts,
            sortBy: JSON.parse(localStorage.getItem('sortBy')) || L_NAME_ASC
        }
    }

    shiftSequenceNumbers(contacts) {
        return contacts.map(contact => {
            contact.sequenceId = contact.sequenceId + 1;
            return contact;
        });
    }

    addContact(newContact) {
        const shiftedCurrentContacts = this.shiftSequenceNumbers(this.state.contacts)
        let newContacts = [newContact, ...shiftedCurrentContacts];
        if (this.state.sortBy !== CUSTOM_ASC) {
            newContacts = this.sortContactsBy(newContacts, this.state.sortBy);
        }
        this.setState({
            contacts: newContacts
        });
        localStorage.setItem('contacts', JSON.stringify(newContacts));
    }

    changeSortByProp(prop) {
        let sortedContacts;
        const {sortBy, contacts} = this.state;
        // Update each item's disabled state if there was a change in sortDisabled state
        if ((prop !== CUSTOM_ASC && sortBy === CUSTOM_ASC) || (prop === CUSTOM_ASC && sortBy !== CUSTOM_ASC)) {
            sortedContacts = this.toggleContactsDisabledState(prop !== CUSTOM_ASC);
        } else {
            sortedContacts = [...contacts];
        }
        sortedContacts = this.sortContactsBy(sortedContacts, prop);
        this.setState({
            sortBy: prop,
            contacts: sortedContacts
        });
        localStorage.setItem('sortBy', JSON.stringify(prop));
        localStorage.setItem('contacts', JSON.stringify(sortedContacts));
    }

    updateSequenceNumbers(contacts) {
        const updatedContacts = contacts.map((contact, index) => {
            contact.sequenceId = index;
            return contact;
        });
        this.setState({
            contacts: updatedContacts
        });
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }

    sortContactsBy(contacts, sortProp) {
        return contacts.sort((a, b) => {
            switch (sortProp) {
                case F_NAME_ASC:
                    return this.compare(a.firstName, b.firstName);
                case F_NAME_DESC:
                    return this.compare(b.firstName, a.firstName);
                case L_NAME_ASC:
                    return this.compare(a.lastName, b.lastName);
                case L_NAME_DESC:
                    return this.compare(b.lastName, a.lastName);
                case PHONE_ASC:
                    return this.compare(a.phone, b.phone);
                case PHONE_DESC:
                    return this.compare(b.phone, a.phone);
                case CUSTOM_ASC:
                    return a.sequenceId - b.sequenceId;
            }
        });
    }

    compare (a, b) {
        a = a.toString().toLowerCase();
        b = b.toString().toLowerCase();
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    }

    toggleContactsDisabledState (sortDisabled) {
        return this.state.contacts.map(contact => {
            contact.sortDisabled = sortDisabled;
            return contact;
        });
    }

    render() {
        const {contacts, sortBy} = this.state;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <main className="app">
                    <div className="add-wrap">
                        <AddContact
                            addNewContact={this.addContact.bind(this)}
                            sortDisabled={this.state.sortBy !== CUSTOM_ASC}
                        />
                    </div>
                    <div className="list-wrap">
                        <h2>Contact list <small>({contacts.length} contacts)</small></h2>
                        <SortContacts
                            updateSortProp={this.changeSortByProp.bind(this)}
                            currSortProp={sortBy}
                        />
                        <ContactList
                            contacts={contacts}
                            sortBy={sortBy}
                            updateSequenceNumbers={this.updateSequenceNumbers.bind(this)}
                        />
                    </div>
                </main>
            </MuiThemeProvider>
        );
    }
}
