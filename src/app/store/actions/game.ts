import { createAction, props } from "@ngrx/store";
import { history } from "src/app/models/history";

export const addNewResult = createAction(
    '[game] add a new game result',
    props<{result:history}>()
)