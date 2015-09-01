import $ from 'jquery';
import 'jquery-ui/sortable';

import React from 'react';
import ListComponent from './ListComponent.jsx';

export default class ComponentsList extends React.Component {
  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    return (
      <section className={this.props.sectionClassName}>
        <h2>{this.props.title}</h2>
        <ul id={this.props.id} className="connected-list index-list">
          {this.props.items.map(function(item, index) {
              return(<ListComponent key={item.key} title={item.title} />);
          })}
        </ul>
      </section>
    )
  }

  componentDidMount() {
    var thisDOMNode = React.findDOMNode(this);
    this.makeSortable(thisDOMNode);
  }

  makeSortable(thisDOMNode) {
    if(this.props.sortable) {
      var that = this;
      var connectionString = "#" + this.props.id;
      $(connectionString).sortable({
        connectWith: "." + that.props.connectWithClass,
        over: function() {
          console.log("over called");
          $('.placeholder').hide();
        },
        helper: "clone",
        start: function(event, ui) {
          that.props.onItemDragStart(this, event, ui);
        },
        stop: function(event, ui) {
          that.props.onItemDragStop(this, event, ui);
        }
      });
    }
  }

  getId() {
    return this.props.id;
  }
}

ComponentsList.defaultProps = {
  items: []
};
