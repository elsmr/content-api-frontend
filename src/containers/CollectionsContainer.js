import React from 'react';
import { connect } from 'react-redux';
import { fetchCollections, deleteCollections } from '../redux/modules/collections';
import { Link } from 'react-router';

class CollectionsContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchCollections())
  }

  componentWillUnmount() {
    this.props.dispatch(deleteCollections())
  }

  render() {
    const { collections } = this.props;
    return (
      <div className='list-group'>
        { collections.data.length > 0 ?
          collections.data.map(collection => 
            <Link to={`/collections/${collection.name}`} key={collection._id} className='list-group-item list-group-item-action'>{collection.displayName}</Link>
          ) : ( collections.error ?
          <div className='list-group-item list-group-item-action disabled'>No collections found</div> :
          <div className='spinner is-loading'>Loading...</div>
          )          
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(CollectionsContainer);