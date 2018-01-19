import React from 'react';
import LinkIndex from './link_index.jsx';

class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
  }

  render() {
    return (
      <div>
        <LinkIndex />
      </div>
    );
  }
}

export default LinkForm;
