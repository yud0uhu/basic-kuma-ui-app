# Example

- styled-component・emotion のように styled("div")`...` や css`...` が使える
- ビルド時に静的な CSS になる（ゼロランタイム）
- 動的なスタイルを書いたらそこだけランタイムで処理される（ハイブリッド）

**参考資料**

- [Emotion ユーザーが Kuma UI を試してみたら結構いい感じ](https://zenn.dev/yuneco/articles/kuma-ui-trial)

## 例 : 動的に style を書き換える
![image](https://github.com/yud0uhu/basic-kuma-ui-app/assets/60646787/ad178804-5879-42ba-823a-06a89550ed94)

以下に示す様に、props で動的な styled を適用させる書き方は実行時に処理されるため、
パフォーマンスの観点では css utility を使った書き方が推奨されている。

> Kuma を最適化するには、動的 props を使用するのではなく、css API を使用して事前に CSS クラスを生成し、条件に基づいて CSS クラスを切り替えることが望ましいと考えられます。
> https://www.kuma-ui.com/docs/Recepies/Dynamic より

```tsx
const [isPressed, setPressed] = useState(false);
const onClick = () => setPressed(true);

return <Box color={isPressed ? "red" : "blue"}></Box>;
```

### [css utility](https://www.kuma-ui.com/docs/API/css)を用いた記法

```tsx
// example/components/KumaButton.tsx

import React, { useState } from "react";
import { Button, css } from "@kuma-ui/core";

const KumaButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const buttonStyles = css`
    padding: 0.25em 1em;
    height: 2em;
    border-radius: 1em;
    font-weight: bold;
    background: linear-gradient(to bottom, salmon, powderblue);
    border: none;
    color: white;
    transition: all 0.2s;
    cursor: pointer;

    &:active {
      transition-duration: 0.05s;
      box-shadow: 0 0 0.2em #0003;
      scale: 0.95;
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
```

- 開発環境では、🐻 で始まるクラス名は静的に解釈され、🦄​​ で始まるクラス名は動的に追加される(開発者コンソールから確認可能)
- 本番環境では、これらのクラス名には「kuma」という接頭辞が付けられる

```html
/* before */
<button class="🐻-2839521805 🐻-4122797946">Click me</button>
/* after */
<button class="🐻-2839521805 🐻-4122797946 active">Click me</button>
```

### [styled utility](https://www.kuma-ui.com/docs/API/styled)を用いた記法

- `:active` 疑似クラスを使い、ボタンのスタイルを切り替えることができる

```tsx
// example/components/StyledButton.tsx

import { useState } from "react";
import { styled } from "@kuma-ui/core";

const StyledButton = styled.button`
  padding: 0.25em 1em;
  height: 2em;
  border-radius: 1em;
  font-weight: bold;
  background: linear-gradient(to bottom, salmon, powderblue);
  border: none;
  color: white;
  transition: all 0.2s;
  cursor: pointer;

  &:active {
    transition-duration: 0.05s;
    box-shadow: 0 0 0.2em #0003;
    scale: 0.95;
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
```

```html
/* before */
<button class="🐻-3740106457">Click me</button>
/* after */
<button class="active 🐻-3740106457">Click me</button>
```

- styled utility では、関数内でテーマトークンを使用することができる
  https://www.kuma-ui.com/docs/Theme/ThemeTokens

```tsx
export const HogeComponent = styled.div`
  color: t("colors.primary");
`;
```

```ts:kuma.config.ts
const theme = createTheme({
  colors: {
    primary: "#576ddf",
    secondary: "#f6a5ce",
    // ... other colors ...
  },
});
```
