import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { createStyleRegistry, StyleRegistry } from "@kuma-ui/core";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const registry = createStyleRegistry();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            (
              <StyleRegistry registry={registry}>
                <App {...props} />
              </StyleRegistry>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, registry.styles()],
      };
    } finally {
      registry.flush();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
