import styled from "styled-components";

export const SelectionOptionsWrapper = styled.div`
    position: absolute; 
    height: inherit;
    width: fit-content;
    z-index: 1;
    right: 0;
    top: 0;

    display: flex;
    justify-content: center;

    z-index: 10;
`;

export const SelectionTabsWrapper = styled.div`
    width: 4vw;

`;

export const ButtonSelectionTab = styled.div<{ $selected?: boolean; }>`
    height: max-content;
    padding: 3vh 0px;
    width: 100%;
    writing-mode: vertical-lr;
    transform: rotate(180deg);

    font-size: var(--font-size-sm);

    border-bottom: 1px solid black;
    border-top: 1px solid black;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--secondary-color);
`;

export const SelectedOptionContext = styled.div<{ $collapsed?: boolean; }>`
    background-color: var(--primary-color);

    width: 1vw;
    flex-grow: 1;
    transition: 0.2s;
    ${props => props.$collapsed == true ?
    `
        width: 0px;
    ` 
    :
    `
        width: 50vw;
    `
    };
`;