import React from 'react';
import { Button, Loader, Input } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withRouter } from 'react-router-dom';


class SearchComp extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            result: '',
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    hasValue() {
        if (this.result.value !== '') {
            this.props.letSearch(this.result.value);
        }
    }
    renderPage() {

        return(
            <Input type="search" placeholder="Find books now..." fluid ref={ userIn => this.search = userIn}>
            <Button type='submit' onClick={this.hasValue()}>Let's Go!</Button>
            </Input>

        );
    }
}

export default withRouter(SearchComp);
