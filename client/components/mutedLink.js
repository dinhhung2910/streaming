import React from 'react';

/**
 *
 * @param {*} props
 * @return {*}
 */
function MutedLink(props) {
  let {onClick, ...rest} = props;
  onClick = (typeof props.onClick === 'function' ? props.onClick : () => {});

  const mutedOnclick = (e) => {
    e.preventDefault();
    onClick(e);
  };
  return (
    <a href="/" onClick={mutedOnclick} {...rest} />
  );
}

export default MutedLink;
