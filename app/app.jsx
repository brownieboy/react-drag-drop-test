'use strict';

import React from 'react';
// import { Router, Route, Link } from 'react-router';
import IndexComponent from './components/ComponentsList.jsx';

// var sourceListComponent = <IndexComponent items={[1,2,3]}
// 	title="Source list" id="sourceList" sectionClassName="listSection"/>;
// var targetListComponent = <IndexComponent items={[4,5,6]} title="Target list"
// 	id="targetList" connectWithComponentId="sourceList"
// 	connectWithClass="connected-list" sectionClassName="listSection" />;


export default class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }

	render() {
		return ( <div>
			<IndexComponent items={this.props.sourceItems}
				title="Source list" id="sourceList"
				connectWithClass="connected-list" sectionClassName="listSection"
				onItemDragStop={this.onSourceListItemDragStop} />
			<IndexComponent items={this.props.targetItems} title="Target list"
				connectWithClass="connected-list" sectionClassName="listSection"
				id="targetList" onItemDragStop={this.onTargetListItemDragStop}
				connectWithComponentId="sourceList"/></div> );
	}

	onSourceListItemDragStop(event, ui) {
      var newText = ui.item[0].textContent;
      var targetListId = ui.item.parent().attr("id");
      console.log("tempText = " + tempText);
      console.log("targetListId = " + targetListId);
	}

	onTargetListItemDragStop(event, ui) {
      var newText = ui.item[0].textContent;
      var targetListId = ui.item.parent().attr("id");
      console.log("tempText = " + tempText);
      console.log("targetListId = " + targetListId);
	}
}

MainApp.defaultProps = {sourceItems: [1,2,3], targetItems: [4,5,6]};



React.render(<MainApp />, document.body);




