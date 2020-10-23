import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Modal from '../Modal'
import history from "../../history";
import {deleteStream, fetchStream} from "../../actions";


class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions = () => {
    const {id} = this.props.match.params;
    return (
      <>
        <button onClick={() => this.props.deleteStream(id)}
                className="ui button negative">Delete
        </button>
        <Link to='/' className="ui button">Cancel
        </Link>
      </>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
  }

  render() {
    console.log('stream', this.props.stream);
    if (!this.props.stream) {
      return (
        <div>
          <Modal title="Loading..."/>
        </div>
      )
    }

    return (
      <Modal
        title={`Delete Stream - ${this.props.stream.title}`}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    stream: state.streams[ownState.match.params.id]
  }
};

export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);