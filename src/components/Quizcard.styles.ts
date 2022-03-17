import styled from "styled-components";

export const Wrapper = styled.div`

    max-width: 1100px;
    background-color: #ebfeff;
    border-radius: 10px;
    border: 2px solid #0085a3;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    padding: 20px;
    text-align:center

    > p {
        font-size; 1rem;
    }
`
type ButtonProps = {
    correct: boolean
    userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonProps>`
    transition : all 0.3s ease;
    button {
        cursor: pointer;
        user-select:none;
        font-size: 0.8rem;
        width: 100%;
        height: 40px;
        margin; 0 5px;
        background : ${({correct, userClicked}) =>
            
                correct ? "blue" : !correct && userClicked ? "red" : "none"
            };
        border: 1px solid black;
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;


    }

`