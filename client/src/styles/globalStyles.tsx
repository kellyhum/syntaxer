import { Global, css } from "@emotion/react";

export default function GlobalStyles() {
    return (
        <Global
            styles={css`
                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                }

                html,
                body,
                #root {
                    background-color: #fff;
                    color: #1e1e1e;
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
            `}
        />
    );
}
