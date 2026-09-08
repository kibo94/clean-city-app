import React, { forwardRef, useCallback } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface CustomBottomSheetProps {
  children: React.ReactNode | null;
  snaps: number[];
  index: number;
}

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  ({ children, snaps, index = -1 }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={2} />
      ),
      []
    );

    return (
      <BottomSheet
        style={{ paddingHorizontal: 10 }}
        ref={ref}
        index={index}
        snapPoints={snaps}
        enableDynamicSizing={false}
        backdropComponent={renderBackdrop}>
        <BottomSheetView
          style={{
            paddingHorizontal: 10,
            justifyContent: 'flex-end',
            height: '100%',
          }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;
