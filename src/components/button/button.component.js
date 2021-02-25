import React, { useState } from "react";

// Styles
import "./button.styles.scss";

function Button({
  menu = [],
  defaultClick = () => {},
  tooltip,
  wrapperClassname = "",
  iconClassname = ""
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={`react__pdf--button ${wrapperClassname}`}>
      <i
        onClick={defaultClick}
        data-tip={tooltip}
        className={iconClassname}
      ></i>

      {/* Menu Icon */}
      {menu && (
        <div className="react__pdf--button-arrow">
          <i
            onClick={() => setShowMenu(!showMenu)}
            className="fas fa-caret-down pointer"
          ></i>
        </div>
      )}

      {menu && showMenu && (
        <div className="react__pdf--button-menu">
          {menu.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setShowMenu(!showMenu);
                item.onClick();
              }}
              className="react__pdf--button-menu-item pointer"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* Menu Items */}
    </div>
  );
}

export default Button;
