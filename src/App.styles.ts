import styled, { createGlobalStyle } from "styled-components";
//@ts-ignore
import BGImage from "./assets/images/summer-background.jpg";

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }
    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Catamaran', san-serif;
    }


`

export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color:#fff;
    } 

    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0
    }

    h1 {
        font-family: Fascinate Inline, sans-serif
    }

    .next-question {

        margin: 10px 5px;
        border: 1px solid black;
        border-radius: 10px;
        background-color:#46C7C7;
        height: 35px;
    }


` 