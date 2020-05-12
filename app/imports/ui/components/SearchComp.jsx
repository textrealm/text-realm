import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withRouter } from 'react-router-dom';

/** Renders a search component so the user can search for a book based on author, ISBN, or title.
 * See pages/SearchComp.jsx. */
export class SearchComp extends React.Component {
  result;

  constructor(props) {
    super(props);
    this.result = '';
  }

  hasValue() {
    if (this.result.value !== '') {
      // eslint-disable-next-line react/prop-types
      this.props.send(this.result.value);
    }
  }

  render() {
    return (
        <Container className='search-bar'>
          <input style={{ height: '35px', width: '900px', borderless: 'true' }} type="search"
                 placeholder="Search by Title, ISBN, or Author"
              /* eslint-disable-next-line no-return-assign */
                 ref={userIn => this.result = userIn}/>
          <Button type='submit' onClick={() => this.hasValue()}>Go!</Button>
        </Container>
    );
  }

}

export default withRouter(SearchComp);
