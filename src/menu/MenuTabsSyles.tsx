import styled from "styled-components";

export const MenuTabsWrapper = styled.div`
    min-width: min(10vw, 10vh);
    height: inherit;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    background-color: var(--snd-btn-hvr-clr);
`;

export const MenuTab = styled.div<{ $active?: boolean; }>`
    background-color: var(--snd-btn-clr);
    font-size: var(--font-size-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1/1;

    cursor: pointer;
    
    ${props => props.$active ? 
        `background-color: var(--snd-btn-hvr-clr);`
        :
        `
        &:hover {
            background-color: var(--snd-btn-hvr-clr);
        }
        `
    };
`;