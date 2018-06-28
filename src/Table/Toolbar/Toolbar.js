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
  position: oneOf(['start', 'end'])
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
  layout: oneOf(['button'])
};

/**
 * Similar to the original WSR Label, but the label is displayed on the same line as the target element (and not above it).
 * TODO:; we might want to simply add this ability to the existing Label.
 */
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

export const Divider = () => {
  return <span className={s.divider}/>;
};
Divider.displayName = 'Toolbar.Divider';


// Aliases for convenience
Toolbar.ItemGroup = ItemGroup;
Toolbar.Item = Item;
Toolbar.Label = Label;
Toolbar.Divider = Divider;
