import React from 'react';
import LinkIndexItem from './link_index_item.jsx';

class LinkIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      url: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.afterChange = this.afterChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return fetch('/v1/links')
    .then(res => res.json())
    .then(data => this.setState({links: data}));
  }

  handleFormChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = { link: { url: this.state.url } };
    $.ajax({
      method: 'post',
      url: '/v1/links',
      data,
      success: () => (this.afterChange())
    });
  }

  afterChange() {
    return fetch('/v1/links')
    .then(res => res.json())
    .then(data => this.setState({links: data}));
  }

  handleDelete(e) {
    $.ajax({
      method: 'delete',
      url: `/v1/links/${e.target.value}`,
      success: () => ( this.afterChange() )
    });
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        Enter the long link here: <input type="text" onChange={this.handleFormChange} />
      <input type="submit" value="Shorten the link!"/>
      </form>
      <h4>Recent shortened urls:</h4>
        <ul>
          {this.state.links.map(link => (
            <li key={link.id}>
              <LinkIndexItem link={link} />
              <br/>
              <button onClick={this.handleDelete} value={link.id}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LinkIndex;
