import React from 'react';
import {any, oneOf} from 'prop-types';
import classNames from 'classnames';
import s from './Toolbar.scss';
import OriginaLabel from '../../Label';

export const Toolbar = props => {
  return (
    <div className={s.toolbar}>
      {props.children}
    </div>
  );
};
Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  children: any // TODO: validate children are of type <ItemGroup>
};

export const ItemGroup = props => {
  const classes = classNames(
    [
      s.itemGroup,
      {
        positionStart: props.position === 'start',
        positionEnd: props.position === 'end'
      }
    ]
  );

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};
ItemGroup.displayName = 'Toolbar.ItemGroup';
ItemGroup.propTypes = {
  children: any, // TODO: validate children are either <Item> od <Divider>
  position: oneOf('start', 'end')
};
ItemGroup.defaultProps = {
  position: 'start'
};

export const Item = props => {
  const classes = classNames(
    [
      s.item,
      {
        [s.layoutButton]: props.layout === 'button'
      }
    ]
  );

  return (
    <span className={classes}>
      {props.children}
    </span>
  );
};
Item.displayName = 'Toolbar.Item';
Item.propTypes = {
  children: any,
  layout: oneOf('button')
};

export const Label = props => {
  return (
    <OriginaLabel {...props} className={s.itemLabel}>
      {
        React.Children.toArray(props.children).map((c, index) => {
          return typeof c === 'string' ?
            <span key={index}>{c}</span> :
            c;
        })
      }
    </OriginaLabel>
  );
};
Label.displayName = 'Toolbar.Label';
Label.propTypes = {
  children: any
};

// Aliases for convenience
Toolbar.ItemGroup = ItemGroup;
Toolbar.Item = Item;
Toolbar.Label = Label;
