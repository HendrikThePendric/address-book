import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {F_NAME_ASC, F_NAME_DESC, L_NAME_ASC, L_NAME_DESC, PHONE_ASC, PHONE_DESC, CUSTOM_ASC, CUSTOM_DESC} from '../app-constants';

const sortOptions = [
    <MenuItem key={1} value={F_NAME_ASC} primaryText={F_NAME_ASC} />,
    <MenuItem key={2} value={F_NAME_DESC} primaryText={F_NAME_DESC} />,
    <MenuItem key={3} value={L_NAME_ASC} primaryText={L_NAME_ASC} />,
    <MenuItem key={4} value={L_NAME_DESC} primaryText={L_NAME_DESC} />,
    <MenuItem key={5} value={PHONE_ASC} primaryText={PHONE_ASC} />,
    <MenuItem key={6} value={PHONE_DESC} primaryText={PHONE_DESC} />,
    <MenuItem key={7} value={CUSTOM_ASC} primaryText={CUSTOM_ASC} />,
    <MenuItem key={8} value={CUSTOM_DESC} primaryText={CUSTOM_DESC} />
];

export default class SelectFieldExampleFloatingLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currSortProp: props.currSortProp
        }
    }

    handleChange (event, index, value) {
        this.props.updateSortProp(value);
        this.setState({
            currSortProp: value
        });
    }

    render() {
        return(
            <SelectField
                value={this.state.currSortProp}
                onChange={this.handleChange.bind(this)}
                floatingLabelText="Sort by:"
            >
            {sortOptions}
            </SelectField>
        );
    }
}