import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            canSubmit: false,
            firstName: '',
            lastName: '',
            phone: '',
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
        };
    }

    showForm() {
        this.setState({
            showForm: true
        });
    }

    updateCanSubmit() {
        const {firstName, lastName, phone} = this.state;
        const canSubmit = !firstName || !lastName || !phone ? false : true;
        this.setState({
            canSubmit: canSubmit
        });
    }

    handleChange(event, field) {
        const val = event.target.value;
        let error;
        switch (field) {
            case 'firstName':
                error = val === '' ? 'Please fill in a first name' : '';
                this.setState({
                    firstName: val,
                    firstNameError: error
                });
                break;
            case 'lastName':
                error = val === '' ? 'Please fill in a last name' : '';
                this.setState({
                    lastName: val,
                    lastNameError: error
                });
                break;
            case 'phone':
                error = this.validatePhone(val);
                this.setState({
                    phone: val,
                    phoneError: error
                });
                break;
        }
        this.updateCanSubmit();
    }

    validatePhone(val) {
        // Very simplistic pattern for validating phone number
        // Only checks if there is at least 1 digit and allows + - ( )
        // At least it will not throw false negatives
        const pattern = /^[- +()]*[0-9][- +()0-9]*$/;
        return pattern.test(val) ? '' : 'Please fill in a valid phone number';
    }

    addNewContact(event) {
        event.preventDefault();
        const {firstName, lastName, phone} = this.state;
        const id = Date.now();
        const sequenceId = 0;
        const sortDisabled = this.props.sortDisabled;
        const contact = {firstName, lastName, phone, id, sequenceId, sortDisabled};
        this.props.addNewContact(contact);
        // Reset
        this.setState({
            showForm: false,
            canSubmit: false,
            firstName: '',
            lastName: '',
            phone: '',
            firstNameError: '',
            lastNameError: '',
            phoneError: '',
        });
    }

    renderForm() {
        const {showForm, firstName, firstNameError, lastName, lastNameError, phone, phoneError, canSubmit} = this.state;
        if (!showForm) {
            return null;
        }
        return (
            <form
                className="add-contact-form"
                onSubmit={this.addNewContact.bind(this)}
            >
                <TextField
                    onChange={(event)=>this.handleChange(event, 'firstName')}
                    value={firstName}
                    floatingLabelText="First name"
                    type="text"
                    errorText={firstNameError}
                    style={{display: 'block'}}
                />
                <TextField
                    onChange={(event)=>this.handleChange(event, 'lastName')}
                    value={lastName}
                    floatingLabelText="Last name"
                    type="text"
                    errorText={lastNameError}
                    style={{display: 'block'}}
                />
                <TextField
                    onChange={(event)=>this.handleChange(event, 'phone')}
                    value={phone}
                    floatingLabelText="Phone number"
                    type="text"
                    errorText={phoneError}
                    style={{display: 'block', marginBottom: '20px'}}
                />
                <RaisedButton
                    label="Add contact"
                    secondary={true}
                    type="submit"
                    disabled={!canSubmit}
                />
            </form>
        );
    }

    render() {
        const { showForm } = this.state;
        return (
            <div className="add-contact">
                <FloatingActionButton
                    style={{marginBottom: '20px'}}
                    onClick={this.showForm.bind(this)}
                    disabled={showForm}
                >
                    <ContentAdd />
                </FloatingActionButton>
                {this.renderForm()}
            </div>
        );
    }
}
