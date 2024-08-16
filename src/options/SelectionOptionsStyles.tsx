import styled from "styled-components";

export const SelectionOptionsWrapper = styled.div<{ $collapsed?: boolean; }>`
    height: 100%;
    width: fit-content;
    
    ${props => props.$collapsed ? 
    `
        display: none;
    ` 
    :
    `
        display: flex;
        justify-content: flex-start;
    `};
`;

export const SelectionTabsWrapper = styled.div`
    width: 4vw;

`;

export const ButtonSelectionTab = styled.div<{ $selected?: boolean; }>`
    height: max-content;
    padding: 1.75vh 0px;
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

export const ButtonHomeTab = styled.div`
    height: max-content;
    padding: 1.5vh 0px;
    width: 100%;

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

    width: 0px;
    flex-grow: 1;
    transition: 0.2s;
    z-index: 10;
    
    ${props => props.$collapsed == true ?
    `
        display: none;
    ` 
    :
    `
        display: block;
    `
    };
`;

export const OptionsControlWrapper = styled.div`
    text-wrap: nowrap;
    width: 70%;
    height: 50%;
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    
    padding-top: max(10px, 1vh);
    gap: max(10px, 1vh);
`;

export const ButtonUncollapseOptions = styled.div<{ $icon: string; $displayed: boolean; }>`
    height: max-content;
    padding: 2vh 0px;
    width: 100%;

    font-size: var(--font-size-sm);

    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: "${props => props.$icon}";
    }
`;

export const ExpandOptionButtonsWrapper = styled.div<{ $width: string; $collapse: boolean }>`
    height: fit-content;
    width: min(${props => props.$width}, 100px);
    z-index: 1;
    position: absolute; 
    left: 0;
    bottom: 0;
    
    ${props => props.$collapse ? 
        `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        `
        :
        `
        display: none;
        `};
`;

export const OptionsAndToolsWrapper = styled.div<{ $width: string; $collapse: boolean }>`
    height: 100%;
    width: min(${props => props.$width}, 100px);

    ${props => props.$collapse ?
        `
        display: none;
        `
        : 
        `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        `};

    background-color: var(--secondary-color);
`;
