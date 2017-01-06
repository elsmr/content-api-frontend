import React from 'react';
import { connect } from 'react-redux';
import { fetchItems, deleteItems } from '../redux/modules/collectionItems';
import { Link } from 'react-router';
import PageTitle from '../components/header/PageTitle';

class CollectionDetailContainer extends React.Component {
  componentWillMount() {
    const { dispatch, collection } = this.props;
    dispatch(fetchItems(collection));
  }

  componentWillUnmount() {
    const { dispatch, collection } = this.props;
    dispatch(deleteItems(collection));
  }

  render() {
    const { collectionItems, collection } = this.props;
    return (
      <div className="main-content">
        <PageTitle title={collection} />
        <div className='container'>
          <div className='list-group'>
            { collectionItems.data.length > 0 ?
              collectionItems.data.map(item => 
                <Link to={`/collections/${item.name}`} key={item._id} className='list-group-item list-group-item-action'>{item.name}</Link>
              ) : ( collectionItems.error ?
              <div className='list-group-item list-group-item-action disabled'>No collections found</div> :
              <div className='spinner is-loading'>Loading...</div>
              )          
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collectionItems: state.collectionItems
});

export default connect(mapStateToProps)(CollectionDetailContainer);