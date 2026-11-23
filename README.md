NFA → DFA Conversion Simulator
Group: SUBSET SQUAD
Course: CSET302 – Automata Theory and Computability
University: Bennett University, SCSET

An interactive, browser-based simulator that converts a Non-Deterministic Finite Automaton (NFA) into an equivalent Deterministic Finite Automaton (DFA) using the Subset Construction Algorithm.
Objective
The simulator allows users to define and validate an NFA, run subset construction, inspect the generated DFA states and transition table, explore an interactive DFA graph, and test input strings while viewing their execution path.
Features
- Dynamic NFA state and alphabet input
- Start-state and final-state selection
- NFA transition editor supporting multiple destinations
- Input and transition validation with error feedback
- Subset Construction Algorithm
- Canonical subset representation to avoid duplicate DFA states
- Empty/dead subset handling (when generated)
- Automatic identification of DFA final subsets
- Step-by-step derivation display
- Generated DFA-state summary
- DFA transition table
- Interactive DFA graph visualization
- String testing with execution-path display
- Tested-path graph highlighting
- Four predefined examples
- Reset and responsive interface
Technology Stack
- React 18
- JavaScript
- Vite 6
- CSS
- @xyflow/react 12 (graph visualization)
- Vitest 2 (tests)
Version ranges and dependency details are recorded in package.json and package-lock.json.

The application is client-side. It does not require a backend, database, authentication, or server-side processing.
Subset Construction
For an NFA N = (Q, Σ, δ, q0, F), the simulator constructs DFA states as subsets of the NFA state set.

The DFA start subset is:

{q0}

For each subset S and input symbol a, the transition is computed as:

δ'(S, a) = ⋃ {δ(q, a) | q ∈ S}

A DFA subset is accepting if it contains at least one NFA final state:

S ∩ F ≠ ∅

If the empty subset ∅ is generated, it is handled as a dead state with self-loops for the alphabet symbols.

Limitation: The simulator supports NFAs without ε-transitions. ε-closure and ε-transition conversion are not implemented.
Prerequisites
- Node.js and npm
- A modern browser
Installation and Run
From the project directory, run:
npm install
npm run dev
Open the local URL printed by Vite in your browser.
Build and Test
Run the automated tests:
npm test
Create a production build:
npm run build
How to Use
1. Load one of the predefined NFAs or enter an NFA.
2. Define states, alphabet, start state, final states, and transitions.
3. Validate the NFA.
4. Select Convert NFA → DFA.
5. Inspect the subset-construction derivation and generated states.
6. Review the transition table.
7. Explore the DFA graph.
8. Enter a string and select Test String.
9. Review the accepted/rejected result and execution path.
Demonstration Example
This example is used for the project demonstration.
- States: q0, q1, q2
- Alphabet: 0, 1
- Start state: q0
- Final state: q2
NFA transitions:
From	Input	To
q0	0	q0, q1
q0	1	q0
q1	1	q2


The reachable DFA subsets for this example are:
DFA state	NFA subset	Status
A	{q0}	Start
B	{q0, q1}	Normal
C	{q0, q2}	Final


DFA transition table:
DFA state	Input 0	Input 1
A ({q0})	B	A
B ({q0, q1})	B	C
C ({q0, q2})	B	A


Example string: 10101

The simulator's displayed execution path for this input is:

A → A → B → C → B → C

The string is accepted because the computation ends in final DFA state C ({q0, q2}).
Project Structure
src/
├── algorithms/
│   ├── automataUtils.js           # Automata-related helper utilities
│   ├── subsetConstruction.js       # NFA-to-DFA subset construction
│   ├── subsetConstruction.test.js # Conversion tests
│   ├── simulateDFA.js             # DFA string simulation
│   └── simulateDFA.test.js       # Simulation tests
├── components/                    # UI components for input and DFA outputs
├── data/                          # Predefined NFA examples
├── utils/
│   ├── validation.js              # NFA input validation
│   └── validation.test.js         # Validation tests
├── App.jsx                        # Main application component
└── main.jsx                       # Application entry point
The source also contains UI components for NFA input, subset-construction output, DFA states, transition table, graph, and string testing.
Testing
Automated tests are run with:
npm test
Verified project test result: 10 tests passed across three test files:
- subsetConstruction.test.js — 3 tests
- simulateDFA.test.js — 3 tests
- validation.test.js — 4 tests
The tests cover reachable subset generation, accepting-subset identification, dead-state handling, accepted and rejected strings, invalid alphabet input, valid NFA definitions, duplicate states, invalid transition destinations, and duplicate state-symbol rows.

A production build was also verified using npm run build.

Team Contributions
- Muskan Singh (S24CSEU2095): Team lead; core subset-construction logic, simulator implementation, and integration.
- Arisha Ali (S24CSEU2060): NFA input setup and transition-case review.
- Tanika Vashisht (S24CSEU2131): Reachable-subset and transition-table checks.
- Anshika (S24CSEU2136): String-testing scenarios and execution-path review.
- Megha Sharma (S24CSEU0118): Input-validation and malformed-input checks.
- Aastha Raikwar (S24CSEU2243): DFA graph and visual-output review.