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
		var tempSourceItems = props.sourceItems.map((item, index) => {
			return {title: item, key: shortid.generate()};
		});
    var tempTargetItems = props.targetItems.map((item, index) => {
      return {title: item, key: shortid.generate()};
    });
		this.state = {sourceItems: tempSourceItems, targetItems: tempTargetItems};
    this.onSourceListItemDragStart = this.onSourceListItemDragStart.bind(this);
    this.onSourceListItemDragStop = this.onSourceListItemDragStop.bind(this);
  }
	render() {
		return (
			<div>
				<ListOfComponents items={this.state.sourceItems}
					title="Source list" id="sourceList"
					sectionClassName="listSection"
          connectWithClass="connected-list"
					onItemDragStop={this.onSourceListItemDragStop}
					onItemDragStart={this.onSourceListItemDragStart}
          sortable={false} />
        <ListOfComponents items={this.state.targetItems}
          title="Target list" id="targetList"
          sectionClassName="listSection"
          connectWithClass="connected-list"
          onItemDragStop={this.onSourceListItemDragStop}
          onItemDragStart={this.onSourceListItemDragStart} />
       </div>

		)
	}
	onSourceListItemDragStart (sortableContextObject, event, ui) {
      this.dragStartIndex = ui.item.index();
	}
	onSourceListItemDragStop (sortableContextObject, event, ui) {
    var tempId = ui.item.attr("id");
    var targetListId = ui.item.parent().attr("id");
    var oldIndex = this.dragStartIndex;
    var newIndex = ui.item.index();
    $(sortableContextObject).sortable("cancel");
    if(targetListId === "targetList") {
      this.reorderFromIndices(oldIndex, newIndex);
    }
	}
	reorderFromIndices(oldIndex, newIndex) {
    	var newStateTargetItems = this.state.targetItems.slice();
    	newStateTargetItems.splice(newIndex, 0, newStateTargetItems.splice(oldIndex, 1) [0]);
    	this.setState({targetItems: newStateTargetItems});
    	console.log("order is " + JSON.stringify(this.state.sourceItems));
 	}
}

MainApp.defaultProps = {sourceItems: [1,2,3], targetItems: [4,5,6]};


React.render(<MainApp />, document.body);




