import React from 'react';
import { DropTarget } from 'react-dnd';
import * as BS from 'react-bootstrap';

import FilterStore from '../filter-store';
import {isLight} from '../helpers';

const ItemTypes = {
  CARD: 'card'
};

const cardListTarget = {
  drop: function (props) {
    // TODO: Do something simpler than just props
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}


const IssueList = React.createClass({
  displayName: 'IssueList',
  render() {
    const {title, label, children} = this.props;
    const {connectDropTarget} = this.props;
    const {isOver} = this.props; // from the collector

    let className = 'column-title';
    if (!label.color || isLight(label.color)) {
      className = className || '';
      className += ' ' + 'is-light';
    }

    const header = (
      <h2 className={className} style={{backgroundColor: '#' + label.color}}>
        <span className='column-title-text' onClick={() => FilterStore.addLabel(label)}><i className='octicon octicon-list-unordered'/> {title}</span>
        {' (' + children.length + ')'}
      </h2>
    );

    const classes = {
      'kanban-issues': true,
      'is-over': isOver
    };

    return connectDropTarget(
      <BS.Panel className={classes} header={header}>
        <BS.ListGroup fill>
          <BS.ListGroupItem key='dnd-placeholder' className='dnd-placeholder'/>
          {children}
        </BS.ListGroup>
      </BS.Panel>
    );
  }
});

// Export the wrapped version
export default DropTarget(ItemTypes.CARD, cardListTarget, collect)(IssueList);
