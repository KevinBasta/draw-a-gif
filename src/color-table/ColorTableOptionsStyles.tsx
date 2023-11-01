import styled from "styled-components";

export const ColorOptions = styled.div`
    width: 20%;
    background-color: var(--secondary-color);
    padding: var(--standard-gap-size) 2vw;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    gap: 0.2vw;
`;

export const ColorPicker = styled.input`
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    width: 50%;
    height: 100%;
    cursor: pointer;
    border: none;
    
    &::-webkit-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }
    
    &::-moz-color-swatch {
        transition-duration: 0.2s;
        border-radius: 2px;
        padding: 5px;
        border: 5px solid var(--tertiary-color);
    }

    &:hover {
        &::-webkit-color-swatch {
            border: 5px solid #555555;
        }

        &::-moz-color-swatch {
            border: 5px solid #555555;
        }
    }
`;

export const ButtonManager = styled.div`
    width: 50%;
    max-height: 90%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    
    gap: 0.5vh;
`;