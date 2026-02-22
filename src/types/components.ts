export interface Component {
  cleanup?: () => void;
}

export interface ButtonCircleComponent extends Component, HTMLButtonElement {}
export interface HistoryMealComponent extends Component, HTMLDivElement {}
export interface InformationMealComponent extends Component, HTMLDivElement {}
export interface PresentationMealComponent
  extends Component, HTMLImageElement {}
