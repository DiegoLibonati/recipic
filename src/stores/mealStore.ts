import { HistoryMeal, Meal } from "@src/entities/app";
import { MealState } from "@src/entities/states";

import { getHistoriesFromLocalStorage } from "@src/helpers/getHistoriesFromLocalStorage";
import { setLocalStorage } from "@src/helpers/setLocalStorage";

import { LOCAL_STORAGE_HISTORIES_KEY } from "@src/constants/vars";

import { Store } from "@src/stores/store";

export class MealStore extends Store<MealState> {
  constructor(initialState: MealState) {
    super(initialState);
  }

  public setCurrentMeal(meal: Meal | null): void {
    this.setState({ currentMeal: meal });
  }

  public setHistoryMeal(meal: Meal | null): void {
    this.setState({ historyMeal: meal });
  }

  public addHistory(history: HistoryMeal): void {
    const histories = this.get("historiesMeal");

    const newHistories = [...histories, history];

    this.setState({ historiesMeal: newHistories });
    setLocalStorage(LOCAL_STORAGE_HISTORIES_KEY, newHistories);
  }

  public removeHistory(id: string): void {
    const { historiesMeal, historyMeal } = this.getState();
    const newHistories = historiesMeal.filter((h) => h.idMeal !== id);

    this.setState({
      historiesMeal: newHistories,
      historyMeal: historyMeal?.idMeal === id ? null : historyMeal,
    });

    setLocalStorage(LOCAL_STORAGE_HISTORIES_KEY, newHistories);
  }

  public currentMealInHistory(): boolean {
    const { currentMeal, historiesMeal } = this.getState();

    return Boolean(
      historiesMeal.find((hm) => hm.idMeal === currentMeal?.idMeal)
    );
  }

  public idMealInHistory(id: string): boolean {
    const { historiesMeal } = this.getState();

    return Boolean(historiesMeal.find((hm) => hm.idMeal === id));
  }
}

export const mealStore = new MealStore({
  currentMeal: null,
  historiesMeal: getHistoriesFromLocalStorage(),
  historyMeal: null,
});
