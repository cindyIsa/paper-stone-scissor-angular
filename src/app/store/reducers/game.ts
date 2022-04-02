import { createReducer, on } from "@ngrx/store";
import { history } from "src/app/models/history";
import { addNewResult } from "../actions/game";

const initialState:Array<history> = []
export const gameReducer = createReducer(
    initialState,
    on(addNewResult, (state, action) => [action.result,...state]),
)