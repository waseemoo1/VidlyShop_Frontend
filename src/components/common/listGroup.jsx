import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {

  return (
    <ul className="list-group">
      {items.map((item) =>
        <li style={{ textAlign: "center" }}
          key={item[valueProperty]}
          className={item === selectedItem ? "list-group-item btn btn-primary active" : "list-group-item btn btn-primary"}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      )}
    </ul>
  );


}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;