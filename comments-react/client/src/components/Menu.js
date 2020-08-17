import React from "react";

const Menu = () => (
  <div className="section">
    <aside className="menu">
      <p className="menu-label">Channels</p>
      <ul className="menu-list">
        <li>
          <a>Channel 1</a>
        </li>
        <li>
          <a>Channel 2</a>
        </li>
        <li>
          <a>Channel 3</a>
        </li>
      </ul>
      <p className="menu-label">Conversations</p>
      <ul className="menu-list">
        <li>
          <a>Mark</a>
        </li>
        <li>
          <a>Chris</a>
        </li>
      </ul>
    </aside>
  </div>
);

export default Menu;
