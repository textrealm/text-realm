import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withRouter } from 'react-router-dom';


export class SearchComp extends React.Component {
    result;

    constructor(props) {
        super(props);
        this.result = '';
    }

// handleChange(event)
// {
//     this.setState({value: event.target.value});
// }
    hasValue() {
        if (this.result.value !== '') {
            this.props.send(this.result.value);
        }
    }

    render() {
        return (
            <Container className='search-bar'>
                <input style={{ height: '35px', width: '900px', borderless: 'true' }} type="search" placeholder="Search by Title, ISBN, or Author"
                       ref={userIn => this.result = userIn}/>
                <Button type='submit' onClick={() => this.hasValue()}>Let's Go!</Button>
            </Container>

        )
    }

}

export default withRouter(SearchComp);