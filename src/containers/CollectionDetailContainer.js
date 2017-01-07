import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../redux/modules/collections';
import { Link } from 'react-router';
import PageTitle from '../components/header/PageTitle';

class CollectionDetailContainer extends React.Component {
  componentWillMount() {
    const { dispatch, name } = this.props;
    dispatch(fetchCollection(name));
  }

  render() {
    const { collections : {selected}, user, name } = this.props;
    return Object.keys(selected).length === 0 ? <div className='spinner is-loading'>Loading...</div> : (
      <div className="main-content">
        <PageTitle title={selected.displayName || selected.name} />
        <div className='container'>
          <p>
            { 
              selected.lang
                .map(lang => <span key={lang} className="badge badge-pill">{lang}</span>)
            }
          </p>
          <div className="row">
            <div className="row">
              { selected.fields.map(field =>
                <div key={field.name}>
                  <div className="col-sm text-weight-bold">{field.name}</div>
                  <div className="col-sm">{field.type}</div>
                  { user.admin &&
                    <div className="col-sm">
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <Link to={`/collections/${name}/items`} className="btn btn-primary">View all items in this collection</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps)(CollectionDetailContainer);