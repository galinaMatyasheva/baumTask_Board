export const boxSource = {
  beginDrag(props) {
    return {
      name: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(item.name, dropResult.name);
    }
  },
};

export const boxTarget = {
  drop(props) {
    return { name: props.status };
  },
};
