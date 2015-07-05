var TodoApp = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },

  addItem: function(item) {
    this.setState({ items: this.state.items.concat(item) });
    console.log(this.state.items);
  },

  render: function() {
    return (
      <div>
        <SubmissionForm addItem={this.addItem} />
        <List className='redBorder' />
      </div>
    );
  }
});

var SubmissionForm = React.createClass({
  getInitialState: function() {
    return { item: '' };
  },

  addItem: function() {
    this.props.addItem(this.state.item);
  },

  render: function() {
    var item = this.state.item;
    return (
      <div>
        <input type='text' value={item} placeholder='Item to add to list' />
        <button type='button' onClick={this.addItem}>+</button>
      </div>
    );
  }
});

var List = React.createClass({
  getInitialState: function() {
    return { list: [{data: 'get groceries', id: 1}, {data: 'do laundry', id: 2}] };
  },

  render: function() {
    var items = this.state.list.map(function(item) {
      return <ListItem key={item.id} data={item.data} />
    });
    return (
      <ul>
        {items}
      </ul>
    );
  }
});

var ListItem = React.createClass({
  render: function() {
    return (
      <li> {this.props.data} </li>
    );
  }
});

React.render(<TodoApp />, document.getElementById('root'));
