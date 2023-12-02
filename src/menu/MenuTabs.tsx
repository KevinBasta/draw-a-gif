import { MenuTab, MenuTabsWrapper } from "./MenuTabsSyles";

interface tabType {
    key: string,
    name: string,
    icon: string,
};

const menuTabs: Array<tabType> = [
    {
        key: crypto.randomUUID(), 
        name: "CreateCanvas", 
        icon: "format_paint" 
    }, 
    {
        key: crypto.randomUUID(),
        name: "ViewSaves",
        icon: "bookmarks"
    }
];

interface MenuTabsProps {
    currentTabIndex: number,
    setCurrentTabIndex: Function
}

export function MenuTabs(props: MenuTabsProps) {

    function switchToTab(i: number) {
        props.setCurrentTabIndex(() => i);
    }

    const tabs = menuTabs.map((obj: tabType, i: number) => {
        return <MenuTab className="material-symbols-outlined" 
                        key={obj.key} 
                        onClick={e => switchToTab(i)}
                        $active={props.currentTabIndex == i}>
                    {obj.icon}
                </MenuTab>
    });

    return (
        <>
            <MenuTabsWrapper>
                {tabs}                
            </MenuTabsWrapper>
        </>
    );
}