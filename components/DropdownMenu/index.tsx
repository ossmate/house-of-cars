import {
  DropdownMenu as UIDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  actions: {
    id: string;
    label: string;
    onClick: () => void;
  }[];
};

export const DropdownMenu = ({ actions }: Props) => {
  return (
    <UIDropdownMenu>
      <DropdownMenuTrigger>Action</DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map(({ id, label, onClick }) => (
          <DropdownMenuItem
            key={id}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </UIDropdownMenu>
  );
};
