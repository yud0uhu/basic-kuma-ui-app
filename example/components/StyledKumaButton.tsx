import { useState } from "react";
import { styled } from "@kuma-ui/core";

const StyledButton = styled.button`
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

const KumaButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <StyledButton className={isActive ? "active" : ""} onClick={handleClick}>
      Click me
    </StyledButton>
  );
};

export default KumaButton;
