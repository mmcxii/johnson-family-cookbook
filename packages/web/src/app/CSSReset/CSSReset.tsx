import { createGlobalStyle } from "styled-components";

import { bg, text } from "../../utils/style";

export const GlobalStyles = createGlobalStyle`
    /* Establish normalcy between elements */
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    /* Establish single column flow for main body of document */
    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: ${bg.root};
        color: ${text.root};
    }
`;
