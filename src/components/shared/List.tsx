import React from 'react';

function List({ items }: { items: string[] }) {
  return items.length ? (
    <ol>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  ) : (
    <span>
      <div>no items</div>
    </span>
  );
}

export default List;
