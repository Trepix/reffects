import * as todoListEvents from "./todos/TodoList/events";
import { dispatch } from "./lib/lib";
import * as store from "./lib/lib-store";

import * as httpEffects from "./effects/httpEffects";
import * as mutateEffect from "./effects/mutate";
import * as toastEffect from "./effects/toast";

import * as stateCoeffect from "./coeffects/state";
import * as dateTimeCoeffect from "./coeffects/datetime";
import * as apiUrlCoeffect from "./coeffects/apiUrl";

import * as httpClient from "./infrastructure/httpClient";
import * as timer from "./infrastructure/timer";


export function intializeApp(){
  window.apiUrl = "https://gateway.marvel.com/v1/public/characters?ts=thesoer&apikey=001ac6c73378bbfff488a36141458af2&hash=72e5ed53d1398abb831c3ceec263f18b";

  const initialState = {
    todos: [],
    visibilityFilter: 'all',
    toast: {
      text: '',
      timeoutId: null,
      visible: false,
    }
  };

  store.initialize(initialState);

  registerEffects();
  registerCoeffects();
  registerEvents();
}

function registerEffects() {
  httpEffects.register(httpClient, dispatch);
  mutateEffect.register(store);
  toastEffect.register(store, timer);
}

function registerCoeffects() {
  stateCoeffect.register(store);
  dateTimeCoeffect.register(Date);
  apiUrlCoeffect.register(window);
}

function registerEvents() {
  todoListEvents.register();
}