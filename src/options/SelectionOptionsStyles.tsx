import styled from "styled-components";

export const SelectionOptionsWrapper = styled.div<{ $collapsed?: boolean; }>`
    position: absolute; 
    height: inherit;
    ${props => props.$collapsed == true ?
    `
        width: 50px;
    ` 
    :
    `
        width: 50vw;
    `};
    z-index: 1;
    right: 0;
    top: 0;

    display: flex;
    justify-content: center;
    
    background-color: var(--primary-color);
`;