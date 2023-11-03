import styled from "styled-components";


export const ImgGIFStorageItemPreview = styled.img<{ $widthratio: number; $heightratio: number; }>`
    max-width: 90%;
    max-height: 90%;

    aspect-ratio:  ${props => props.$widthratio / props.$heightratio};
`;