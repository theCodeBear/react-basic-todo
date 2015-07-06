var TodoApp = React.createClass({
  getInitialState: function() {
    return { items: [], id: 0 };
  },

  addItem: function(item) {
    this.setState({ items: this.state.items.concat({data:item, id:this.state.id}), id: this.state.id+1 });
  },

  deleteItem: function(id) {
    var indexOfItem = _.findIndex(this.state.items, {id: id});
    // the following two ways are another way to do this update, does same thing.
      // this.state.items.splice(indexOfItem, 1);
      // this.forceUpdate();
    this.state.items.splice(indexOfItem, 1);
    this.setState({ items: this.state.items });
  },

  render: function() {
    return (
      <div>
        <SubmissionForm addItem={this.addItem} />
        <List list={this.state.items} deleteItem={this.deleteItem} />
      </div>
    );
  }
});

var SubmissionForm = React.createClass({
  getInitialState: function() {
    return { item: '' };
  },

  addItem: function(e) {
    e.preventDefault();
    var input = React.findDOMNode(this.refs.newItem);
    this.props.addItem(input.value);
    input.value = '';
    input.focus();
  },

  render: function() {
    var item = this.state.item;
    return (
      <form onSubmit={this.addItem}>
        <input type='text'
               placeholder='Item to add to list'
               ref='newItem'
               autoFocus />
        <button type='submit'>+</button>
      </form>
    );
  }
});

var List = React.createClass({
  deleteItem: function(id) {
    this.props.deleteItem(id);
  },
  render: function() {
    var props = this.props;
    var deleteItem = this.deleteItem;
    var items = this.props.list.map(function(item) {
      return (
        <ListItem key={item.id}
                  itemData={item.data}
                  itemId={item.id}
                  deleteItem={deleteItem} />
      );
    });
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

var ListItem = React.createClass({
  deleteItem: function() {
    var itemId = this.props.itemId;
    this.props.deleteItem(itemId);
  },
  render: function() {
    var itemId = this.props.itemId;
    return (
      <li>
        <span>{this.props.itemData}</span>
        <button type='button'
                onClick={this.deleteItem}>
                  x
                </button>
      </li>
    );
  }
});

React.render(<TodoApp />, document.getElementById('root'));
