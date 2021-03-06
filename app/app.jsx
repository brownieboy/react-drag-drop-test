'use strict';
import $ from 'jquery';
import 'jquery-ui/sortable';
import 'jquery-ui-touch-punch';
import shortid from "shortid";
import React from 'react';
import ListOfComponents from './components/ListOfComponents.jsx';

class MainApp extends React.Component {
  constructor(props) {
    	super(props);
    	// In ES6 class syntax, React no longer automagically binds your
    	// methods to the component object, so DIY (if they're likely to
    	// used as callbacks only?)
    var tempSourceItems = [];
    var tempTargetItems = [];
    try {
  		tempSourceItems = props.sourceItems.map((item, index) => {
  			return {title: item, key: shortid.generate()};
  		});
    }
    catch(e){}
    try {
      tempTargetItems = props.targetItems.map((item, index) => {
        return {title: item, key: shortid.generate()};
      });
    }
    catch(e){}
		this.state = {sourceItems: tempSourceItems, targetItems: tempTargetItems};
    this.onSourceListItemDragStart = this.onSourceListItemDragStart.bind(this);
    this.onTargetListItemDragStart = this.onTargetListItemDragStart.bind(this);
    this.onListItemDragStop = this.onListItemDragStop.bind(this);
  }
	render() {
		return (
			<div>
				<ListOfComponents items={this.state.sourceItems}
					title="Source list" id="sourceList"
					sectionClassName="listSection"
          connectWithClass="connected-list"
					onItemDragStop={this.onListItemDragStop}
					onItemDragStart={this.onSourceListItemDragStart}
          sortable={false} />
        <ListOfComponents items={this.state.targetItems}
          title="Target list" id="targetList"
          sectionClassName="listSection"
          connectWithClass="connected-list"
          onItemDragStop={this.onListItemDragStop}
          onItemDragStart={this.onTargetListItemDragStart} />
       </div>

		)
	}
	onSourceListItemDragStart (sortableContextObject, event, ui) {
      this.dragStart = {"origin":"source",
                        "index": ui.item.index()};
	}
  onTargetListItemDragStart (sortableContextObject, event, ui) {
      this.dragStart = {"origin":"target",
                        "index": ui.item.index()};
  }
	onListItemDragStop (sortableContextObject, event, ui) {
    var targetListId = ui.item.parent().attr("id");
    var newText = ui.item[0].textContent;
    var oldIndex = this.dragStart.index;
    var newIndex = ui.item.index();
    $(sortableContextObject).sortable("cancel");
    if(targetListId === "targetList") {
      if (this.dragStart.origin === "source") {
        this.insertItem(newText, newIndex);
      }
      else {
        this.reorderFromIndices(oldIndex, newIndex);
      }
    }
	}
	reorderFromIndices(oldIndex, newIndex) {
    	var newStateTargetItems = this.state.targetItems.slice();
    	newStateTargetItems.splice(newIndex, 0, newStateTargetItems.splice(oldIndex, 1) [0]);
    	this.setState({targetItems: newStateTargetItems});
    	console.log("order is " + JSON.stringify(this.state.sourceItems));
 	}
  insertItem(newTitle, newIndex) {
    var newItem = {title: newTitle, key: shortid.generate()};
    var newStateTargetItems = this.state.targetItems.slice();
    newStateTargetItems.splice(newIndex, 0, newItem);

    this.setState({targetItems: newStateTargetItems});
  }
}

MainApp.defaultProps = {sourceItems: ["bananas", "apples", "oranges"]};


React.render(<MainApp />, document.body);




