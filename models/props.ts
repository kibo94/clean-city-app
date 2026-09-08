import BottomSheet from "@gorhom/bottom-sheet";
import { FormFieldStateModel } from "./form";
import { RefObject } from "react";

interface CustomFormPropsModel {
    formInputs: FormFieldStateModel[]; // your type
    title: string;
    onPress: (data: FormFieldStateModel[]) => void;
    onSelectChange?: (value: any) => void | null;
    extraFileds?: React.ReactNode | null;
    showSubmitBtn?: boolean;
}
interface CustomBottomSheetPropModel {
    children: React.ReactNode | null;
    ref?: RefObject<BottomSheet>; // type the ref properly
    snaps: number[]; // array of snap points
}

interface ReserveSheetPropsModel {
    from: string; to: string; objectId: string; objectCreatorId: string; bottomSheetRef: RefObject<BottomSheet>; pricePerHour: number; clientId: number; fullPrice: number;
}

interface DefaultPopUpPropsModel {
    icon: React.ReactNode | null, closeModal: () => void | null, message: string, onDone?: () => void
}

interface CustomPopUpPropsModel {
    icon: React.ReactNode | null, closeModal: () => void | null, message: string, component: React.ReactNode | null
}



export {
    CustomFormPropsModel,
    CustomBottomSheetPropModel,
    CustomPopUpPropsModel,
    ReserveSheetPropsModel,
    DefaultPopUpPropsModel
}