import React from 'react';
import { Link } from 'react-router-dom';

class LinkIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target_url: this.props.link.url,
      shortened_url: this.props.link.shortened_url,
      toggle_form: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  afterChange() {
    return fetch('/v1/links')
    .then(res => res.json())
    .then(links => {
      let linkId = this.props.link.id;
      let myLink = links.find(link => (
        link.id === linkId
      ));
      this.setState({
        target_url: myLink.url,
        shortened_url: myLink.shortened_url,
        toggle_form: false
      });
    });
  }

  handleEdit() {
    let data = { link:
      { url: this.state.target_url,
        shortened_url: this.props.link.shortened_url,
      }
    };
    $.ajax({
      method: 'patch',
      url: `/v1/links/${this.props.link.id}`,
      data,
      success: (res) => (console.log(res))
    });
  }

  handleChange(e) {
    this.setState( { target_url: e.target.value } );
  }

  handleClick() {
    this.setState( { toggle_form: !this.state.toggle_form} );
  }

  editForm() {
    return (
      <form onSubmit={this.handleEdit}>
        Edit target url: <input type="text" onChange={this.handleChange} />
      <input type="submit" value="Edit!"/>
      </form>
    );
  }

  render() {
    return (
      <div>
        <h5>Original url:</h5> <div id="long-url">{this.props.link.url}</div>
        <br/>
        <h5>Shortened url:</h5>
        <a href={"/v1/links/" + this.props.link.shortened_url }>
          {"/v1/links/" + this.props.link.shortened_url}
        </a>
        <br/>
        <button onClick={this.handleClick} value="Edit">Edit Target</button>
        <br/>
        { this.state.toggle_form ? this.editForm() : "" }
      </div>
    );
  }
}

export default LinkIndexItem;
