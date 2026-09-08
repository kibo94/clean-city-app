interface GeneralModalModel {
    message: string,
    type?: string,
    onDone?: () => void
    onClose?: () => void
    show?: boolean,
    icon?: any,
    component?: any
}

interface GeneralPopup {
    show: boolean;
    message: string;
    type: 'info' | 'custom' | 'confirm';
    icon: React.ReactNode | null;
    component: React.ReactNode | null;
}

export {
    GeneralModalModel,
    GeneralPopup
}

