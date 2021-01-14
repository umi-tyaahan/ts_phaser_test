export interface State {
  stateMachine: StateMachine;
  enter(...args: any[]): void;
  execute(...args: any[]): void;
}

export class StateMachine {
  private initialState: string;
  private possibleStates: Map<string, State>;
  private stateArgs;

  private currentState: string;

  constructor(initialState, possibleStates, stateArgs = []) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.currentState = null;

    // State instances get access to the state machine via this.stateMachine.
    this.possibleStates.forEach((state) => {
      state.stateMachine = this;
    });
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.currentState === null) {
      this.currentState = this.initialState;
      this.possibleStates.get(this.currentState).enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates.get(this.currentState).execute(...this.stateArgs);
  }

  transition(newState, ...enterArgs) {
    this.currentState = newState;
    this.possibleStates
      .get(this.currentState)
      .enter(...this.stateArgs, ...enterArgs);
  }
}
