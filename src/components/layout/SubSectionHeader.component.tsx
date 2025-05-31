import React from "react";

function SubSectionHeader({ children }: React.PropsWithChildren): React.JSX.Element {
    return <header className='mb-5'>
        {children}
    </header>
}

SubSectionHeader.Title = SubSectionHeaderTitle;
SubSectionHeader.Subtitle = SubSectionHeaderSubtitle;

function SubSectionHeaderSubtitle({ children }: React.PropsWithChildren): React.JSX.Element {
    return <small className="text-muted">{children}</small>
}

function SubSectionHeaderTitle({ children }: React.PropsWithChildren): React.JSX.Element {
    return <h2><b>{children}</b></h2>
}

export default SubSectionHeader;