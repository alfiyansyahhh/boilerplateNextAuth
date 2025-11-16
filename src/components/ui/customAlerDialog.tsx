import React, { ReactNode } from 'react';
import {
  AlertDialog as RadixAlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface CustomAlertDialogProps {
  triggerText: string;
  children: ReactNode;
  width?: string; // bisa diatur lebarnya
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  triggerText,
  children,
  width = '500px', // default
}) => {
  return (
    <RadixAlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>{triggerText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={`w-[${width}]`}>
        {children}
      </AlertDialogContent>
    </RadixAlertDialog>
  );
};

export default CustomAlertDialog;
