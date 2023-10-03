import React, { useState } from "react";
import { Button, css } from "@kuma-ui/core";

const KumaButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const buttonStyles = css`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 240px;
    height: 48px;
    border-radius: 50px;
    background-color: rgb(245, 205, 0);
    color: rgb(0, 0, 0);
    font-weight: 700;
    padding: 0.25em 1em;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      transition-duration: 0.05s;
      box-shadow: 0 0 0.2em #0003;
      transform: scale(0.95);
      filter: brightness(0.9) contrast(1.2);
    }

    &::before {
      content: "🐻";
      display: inline-block;
      padding-right: 0.5em;
    }

    @media screen and (max-width: 360px) {
      &::before {
        content: "🐱";
      }
    }
  `;

  return (
    // button active class is added by the css prop
    <Button
      className={isActive ? buttonStyles + " active" : buttonStyles}
      onClick={handleClick}
    >
      Click me
    </Button>
  );
};

export default KumaButton;
