import React from 'react';
import { connect } from 'react-redux';
import { fetchItem } from '../redux/modules/collectionItems';
import { Link } from 'react-router';
import PageTitle from '../components/header/PageTitle';

class ItemDetailContainer extends React.Component {
  componentWillMount() {
    const { dispatch, name, id} = this.props;
    dispatch(fetchItem(name, id));
  }

  render() {
    const { name, item, user: { user: { permissions }} } = this.props;
    let canEdit = false;
    if(permissions.collections[name]) {
      if(permissions.collections[name].write)
        canEdit = true;
    } else if(permissions.admin || permissions.collections._default.write) {
      canEdit = true;
    }

    return (
      <div className="main-content">
        <PageTitle title={ item.name } />
        <div className='container'>
          <dl class="dl-horizontal">
            {
              Object.keys(item)
                .map(key => (
                  <span>
                    <dt>{ key }</dt>
                    <dd>{ item[key] }</dd>
                  </span>
                ))
            }
          </dl>
          { canEdit &&
            <button className="btn btn-primary">Edit</button>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.collectionItems.selected
});

export default connect(mapStateToProps)(ItemDetailContainer);
