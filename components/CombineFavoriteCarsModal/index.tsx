import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onAccept: () => void;
  onCancel: () => void;
  onAskLater: () => void;
};

export const CombineFavoriteCarsModal = ({
  isOpen,
  isPending,
  onAccept,
  onCancel,
  onAskLater,
}: Props) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Merge Favorite Cars</AlertDialogTitle>
          <AlertDialogDescription>
            Merge locally stored favorite cars with your current saved cars?
            This action is irreversible. Review changes before confirming.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" disabled={isPending} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="ghost" disabled={isPending} onClick={onAskLater}>
            Ask me later
          </Button>
          <Button disabled={isPending} onClick={onAccept}>
            Merge
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
