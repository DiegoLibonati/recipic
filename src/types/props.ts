interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface ButtonCircleProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export interface PresentationMealProps {
  name: string;
  thumbUrl: string;
}

export interface HistoryMealProps {
  id: string;
  name: string;
  thumbUrl: string;
  onClick: (e: MouseEvent, id: string) => void;
}

export interface InformationMealProps {
  name: string;
  thumbUrl: string;
  instructions: string;
}
