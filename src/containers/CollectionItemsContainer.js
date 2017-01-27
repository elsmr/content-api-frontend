import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../redux/modules/collectionItems';
import { fetchCollection } from '../redux/modules/collections';
import { Link } from 'react-router';
import PageTitle from '../components/header/PageTitle';

class CollectionDetailContainer extends React.Component {
  componentWillMount() {
    const { dispatch, name } = this.props;
    dispatch(fetchCollection(name));
    dispatch(fetchItems(name));
  }

  render() {
    const { collectionItems, collection } = this.props;
    return collection && (
      <div className="main-content">
        <PageTitle title={collection.displayName} />
        <div className='container'>
          { collectionItems.error &&
            <div className='alert alert-danger'>{collectionItems.error.message}</div>
          }
          <div className='list-group'>
            { collectionItems.list.length > 0 ?
              collectionItems.list.map(item =>
                <Link to={`/collections/${collection.name}/items/${item._id}`} key={item._id} className='list-group-item list-group-item-action'>{item.name}</Link>
              ) :
              <div className='list-group-item disabled'>No items found</div>
            }
            { collectionItems.pending &&
              <div className='spinner is-loading'>Loading...</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collectionItems: state.collectionItems,
  collection: state.collections.selected
});

export default connect(mapStateToProps)(CollectionDetailContainer);
