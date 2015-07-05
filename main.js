var TodoApp = React.createClass({
  getInitialState: function() {
    return { items: [], id: 0 };
  },

  addItem: function(item) {
    this.setState({ items: this.state.items.concat({data:item, id:this.state.id}), id: this.state.id+1 });
  },

  render: function() {
    return (
      <div>
        <SubmissionForm addItem={this.addItem} />
        <List list={this.state.items} />
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
  render: function() {
    var items = this.props.list.map(function(item) {
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
