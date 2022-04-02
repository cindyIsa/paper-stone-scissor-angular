import { createSelector } from "@ngrx/store";
import { AppState } from "../models/appState";

export const winRate = createSelector(
    (state:AppState)=> state.historys,
    (state) => state.filter(s=>s.result == 'win').length / state.length   
)
export const loseRate = createSelector(
    (state:AppState)=> state.historys,
    (state) => state.filter(s=>s.result == 'lose').length / state.length   
)
export const drawRate = createSelector(
    (state:AppState)=> state.historys,
    (state) => state.filter(s=>s.result == 'draw').length / state.length   
)
export const totalPlayed = createSelector(
    (state:AppState)=> state.historys,
    (state) => state.length   
)