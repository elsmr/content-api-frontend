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
      <div>
        { collections.error &&
          <div className='alert alert-danger'>{collections.error.message}</div>
        }
        <div className='list-group'>
          { collections.list.length > 0 ?
            collections.list.map(collection => 
              <Link to={`/collections/${collection.name}`} key={collection._id} className='list-group-item list-group-item-action'>{collection.displayName || collection.name}</Link>
            ) :
            <div className='list-group-item disabled'>No collections found</div>          
          }
          { collections.pending &&
            <div className='spinner is-loading'>Loading...</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(CollectionsContainer);