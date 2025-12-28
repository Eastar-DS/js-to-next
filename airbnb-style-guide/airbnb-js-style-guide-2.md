**Modules**

- [10.1](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--use-them) Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.
    
    > Why? Modules are the future, let’s start using the future now.
    > 
    
    ```
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;
    
    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;
    
    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```
    
- [10.2](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--no-wildcard) Do not use wildcard imports.
    
    > Why? This makes sure you have a single default export.
    > 
    
    ```
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';
    
    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```
    
- [10.3](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--no-export-from-import) And do not export directly from an import.
    
    > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.
    > 
    
    ```
    // bad
    // filename es6.js
    export { es6 as default } from './AirbnbStyleGuide';
    
    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```
    
- [10.4](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--no-duplicate-imports) Only import from a path in one place. eslint: [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports)
    
    > Why? Having multiple lines that import from the same path can make code harder to maintain.
    > 
    
    ```
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';
    
    // good
    import foo, { named1, named2 } from 'foo';
    
    // good
    import foo, {
      named1,
      named2,
    } from 'foo';
    ```
    
- [10.5](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--no-mutable-exports) Do not export mutable bindings. eslint: [`import/no-mutable-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
    
    > Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.
    > 
    
    ```
    // bad
    let foo = 3;
    export { foo };
    
    // good
    const foo = 3;
    export { foo };
    ```
    
- [10.6](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--prefer-default-export) In modules with a single export, prefer default export over named export. eslint: [`import/prefer-default-export`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)
    
    > Why? To encourage more files that only ever export one thing, which is better for readability and maintainability.
    > 
    
    ```
    // bad
    export function foo() {}
    
    // good
    export default function foo() {}
    ```
    
- [10.7](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--imports-first) Put all `import`s above non-import statements. eslint: [`import/first`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/first.md)
    
    > Why? Since imports are hoisted, keeping them all at the top prevents surprising behavior.
    > 
    
    ```
    // bad
    import foo from 'foo';
    foo.init();
    
    import bar from 'bar';
    
    // good
    import foo from 'foo';
    import bar from 'bar';
    
    foo.init();
    ```
    
- [10.8](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--multiline-imports-over-newlines) Multiline imports should be indented just like multiline array and object literals. eslint: [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline)
    
    > Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.
    > 
    
    ```
    // bad
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';
    
    // good
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';
    ```
    
- [10.9](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--no-webpack-loader-syntax) Disallow Webpack loader syntax in module import statements. eslint: [`import/no-webpack-loader-syntax`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
    
    > Why? Since using Webpack syntax in the imports couples the code to a module bundler. Prefer using the loader syntax in webpack.config.js.
    > 
    
    ```
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';
    
    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    ```
    
- [10.10](https://github.com/airbnb/javascript?tab=readme-ov-file#modules--import-extensions) Do not include JavaScript filename extensions eslint: [`import/extensions`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/extensions.md)
    
    > Why? Including extensions inhibits refactoring, and inappropriately hardcodes implementation details of the module you're importing in every consumer.
    > 
    
    ```
    // bad
    import foo from './foo.js';
    import bar from './bar.jsx';
    import baz from './baz/index.jsx';
    
    // good
    import foo from './foo';
    import bar from './bar';
    import baz from './baz';
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Iterators and Generators**

- [11.1](https://github.com/airbnb/javascript?tab=readme-ov-file#iterators--nope) Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like `for-in` or `for-of`. eslint: [`no-iterator`](https://eslint.org/docs/rules/no-iterator) [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax)
    
    > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.
    > 
    
    > Use map() / every() / filter() / find() / findIndex() / reduce() / some() / ... to iterate over arrays, and Object.keys() / Object.values() / Object.entries() to produce arrays so you can iterate over objects.
    > 
    
    ```
    const numbers = [1, 2, 3, 4, 5];
    
    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    sum === 15;
    
    // good
    let sum = 0;
    numbers.forEach((num) => {
      sum += num;
    });
    sum === 15;
    
    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;
    
    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
      increasedByOne.push(numbers[i] + 1);
    }
    
    // good
    const increasedByOne = [];
    numbers.forEach((num) => {
      increasedByOne.push(num + 1);
    });
    
    // best (keeping it functional)
    const increasedByOne = numbers.map((num) => num + 1);
    ```
    
- [11.2](https://github.com/airbnb/javascript?tab=readme-ov-file#generators--nope) Don’t use generators for now.
    
    > Why? They don’t transpile well to ES5.
    > 
- [11.3](https://github.com/airbnb/javascript?tab=readme-ov-file#generators--spacing) If you must use generators, or if you disregard [our advice](https://github.com/airbnb/javascript?tab=readme-ov-file#generators--nope), make sure their function signature is spaced properly. eslint: [`generator-star-spacing`](https://eslint.org/docs/rules/generator-star-spacing)
    
    > Why? function and * are part of the same conceptual keyword - * is not a modifier for function, function* is a unique construct, different from function.
    > 
    
    ```
    // bad
    function * foo() {
      // ...
    }
    
    // bad
    const bar = function * () {
      // ...
    };
    
    // bad
    const baz = function *() {
      // ...
    };
    
    // bad
    const quux = function*() {
      // ...
    };
    
    // bad
    function*foo() {
      // ...
    }
    
    // bad
    function *foo() {
      // ...
    }
    
    // very bad
    function
    *
    foo() {
      // ...
    }
    
    // very bad
    const wat = function
    *
    () {
      // ...
    };
    
    // good
    function* foo() {
      // ...
    }
    
    // good
    const foo = function* () {
      // ...
    };
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Properties**

- [12.1](https://github.com/airbnb/javascript?tab=readme-ov-file#properties--dot) Use dot notation when accessing properties. eslint: [`dot-notation`](https://eslint.org/docs/rules/dot-notation)
    
    ```
    const luke = {
      jedi: true,
      age: 28,
    };
    
    // bad
    const isJedi = luke['jedi'];
    
    // good
    const isJedi = luke.jedi;
    ```
    
- [12.2](https://github.com/airbnb/javascript?tab=readme-ov-file#properties--bracket) Use bracket notation `[]` when accessing properties with a variable.
    
    ```
    const luke = {
      jedi: true,
      age: 28,
    };
    
    function getProp(prop) {
      return luke[prop];
    }
    
    const isJedi = getProp('jedi');
    ```
    
- [12.3](https://github.com/airbnb/javascript?tab=readme-ov-file#es2016-properties--exponentiation-operator) Use exponentiation operator `*` when calculating exponentiations. eslint: [`prefer-exponentiation-operator`](https://eslint.org/docs/rules/prefer-exponentiation-operator).
    
    ```
    // bad
    const binary = Math.pow(2, 10);
    
    // good
    const binary = 2 ** 10;
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Variables**

- [13.1](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--const) Always use `const` or `let` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that. eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)
    
    ```
    // bad
    superPower = new SuperPower();
    
    // good
    const superPower = new SuperPower();
    ```
    
- [13.2](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--one-const) Use one `const` or `let` declaration per variable or assignment. eslint: [`one-var`](https://eslint.org/docs/rules/one-var)
    
    > Why? It’s easier to add new variable declarations this way, and you never have to worry about swapping out a ; for a , or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once.
    > 
    
    ```
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';
    
    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';
    
    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```
    
- [13.3](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--const-let-group) Group all your `const`s and then group all your `let`s.
    
    > Why? This is helpful when later on you might need to assign a variable depending on one of the previously assigned variables.
    > 
    
    ```
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;
    
    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;
    
    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```
    
- [13.4](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--define-where-used) Assign variables where you need them, but place them in a reasonable place.
    
    > Why? let and const are block scoped and not function scoped.
    > 
    
    ```
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();
    
      if (hasName === 'test') {
        return false;
      }
    
      if (name === 'test') {
        this.setName('');
        return false;
      }
    
      return name;
    }
    
    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }
    
      const name = getName();
    
      if (name === 'test') {
        this.setName('');
        return false;
      }
    
      return name;
    }
    ```
    
- [13.5](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--no-chain-assignment) Don’t chain variable assignments. eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)
    
    > Why? Chaining variable assignments creates implicit global variables.
    > 
    
    ```
    // bad
    (function example() {
      // JavaScript interprets this as
      // let a = ( b = ( c = 1 ) );
      // The let keyword only applies to variable a; variables b and c become
      // global variables.
      let a = b = c = 1;
    }());
    
    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1
    
    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());
    
    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError
    
    // the same applies for `const`
    ```
    
- [13.6](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--unary-increment-decrement) Avoid using unary increments and decrements (`++`, `-`). eslint [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)
    
    > Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like num += 1 instead of num++ or num ++. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.
    > 
    
    ```
    // bad
    
    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;
    
    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      sum += value;
      if (value) {
        truthyCount++;
      }
    }
    
    // good
    
    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;
    
    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;
    ```
    
- [13.7](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--linebreak) Avoid linebreaks before or after `=` in an assignment. If your assignment violates [`max-len`](https://eslint.org/docs/rules/max-len), surround the value in parens. eslint [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak).
    
    > Why? Linebreaks surrounding = can obfuscate the value of an assignment.
    > 
    
    ```
    // bad
    const foo =
      superLongLongLongLongLongLongLongLongFunctionName();
    
    // bad
    const foo
      = 'superLongLongLongLongLongLongLongLongString';
    
    // good
    const foo = (
      superLongLongLongLongLongLongLongLongFunctionName()
    );
    
    // good
    const foo = 'superLongLongLongLongLongLongLongLongString';
    ```
    
- [13.8](https://github.com/airbnb/javascript?tab=readme-ov-file#variables--no-unused-vars) Disallow unused variables. eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)
    
    > Why? Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such variables take up space in the code and can lead to confusion by readers.
    > 
    
    ```
    // bad
    
    const some_unused_var = 42;
    
    // Write-only variables are not considered as used.
    let y = 10;
    y = 5;
    
    // A read for a modification of itself is not considered as used.
    let z = 0;
    z = z + 1;
    
    // Unused function arguments.
    function getX(x, y) {
        return x;
    }
    
    // good
    
    function getXPlusY(x, y) {
      return x + y;
    }
    
    const x = 1;
    const y = a + 2;
    
    alert(getXPlusY(x, y));
    
    // 'type' is ignored even if unused because it has a rest property sibling.
    // This is a form of extracting an object that omits the specified keys.
    const { type, ...coords } = data;
    // 'coords' is now the 'data' object without its 'type' property.
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Hoisting**

- [14.1](https://github.com/airbnb/javascript?tab=readme-ov-file#hoisting--about) `var` declarations get hoisted to the top of their closest enclosing function scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz). It’s important to know why [typeof is no longer safe](https://web.archive.org/web/20200121061528/http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).
    
    ```
    // we know this wouldn’t work (assuming there
    // is no notDefined global variable)
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }
    
    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }
    
    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }
    
    // using const and let
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```
    
- [14.2](https://github.com/airbnb/javascript?tab=readme-ov-file#hoisting--anon-expressions) Anonymous function expressions hoist their variable name, but not the function assignment.
    
    ```
    function example() {
      console.log(anonymous); // => undefined
    
      anonymous(); // => TypeError anonymous is not a function
    
      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```
    
- [14.3](https://github.com/airbnb/javascript?tab=readme-ov-file#hoisting--named-expressions) Named function expressions hoist the variable name, not the function name or the function body.
    
    ```
    function example() {
      console.log(named); // => undefined
    
      named(); // => TypeError named is not a function
    
      superPower(); // => ReferenceError superPower is not defined
    
      var named = function superPower() {
        console.log('Flying');
      };
    }
    
    // the same is true when the function name
    // is the same as the variable name.
    function example() {
      console.log(named); // => undefined
    
      named(); // => TypeError named is not a function
    
      var named = function named() {
        console.log('named');
      };
    }
    ```
    
- [14.4](https://github.com/airbnb/javascript?tab=readme-ov-file#hoisting--declarations) Function declarations hoist their name and the function body.
    
    ```
    function example() {
      superPower(); // => Flying
    
      function superPower() {
        console.log('Flying');
      }
    }
    ```
    
- [14.5](https://github.com/airbnb/javascript?tab=readme-ov-file#no-use-before-define) Variables, classes, and functions should be defined before they can be used. eslint: [`no-use-before-define`](https://eslint.org/docs/latest/rules/no-use-before-define)
    
    > Why? When variables, classes, or functions are declared after being used, it can harm readability since a reader won't know what a thing that's referenced is. It's much clearer for a reader to first encounter the source of a thing (whether imported from another module, or defined in the file) before encountering a use of the thing.
    > 
    
    ```
    // bad
    
    // Variable a is being used before it is being defined.
    console.log(a); // this will be undefined, since while the declaration is hoisted, the initialization is not
    var a = 10;
    
    // Function fun is being called before being defined.
    fun();
    function fun() {}
    
    // Class A is being used before being defined.
    new A(); // ReferenceError: Cannot access 'A' before initialization
    class A {
    }
    
    // `let` and `const` are hoisted, but they don't have a default initialization.
    // The variables 'a' and 'b' are in a Temporal Dead Zone where JavaScript
    // knows they exist (declaration is hoisted) but they are not accessible
    // (as they are not yet initialized).
    
    console.log(a); // ReferenceError: Cannot access 'a' before initialization
    console.log(b); // ReferenceError: Cannot access 'b' before initialization
    let a = 10;
    const b = 5;
    
    // good
    
    var a = 10;
    console.log(a); // 10
    
    function fun() {}
    fun();
    
    class A {
    }
    new A();
    
    let a = 10;
    const b = 5;
    console.log(a); // 10
    console.log(b); // 5
    ```
    
- For more information refer to [JavaScript Scoping & Hoisting](https://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](https://www.adequatelygood.com/).

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Comparison Operators & Equality**

- [15.1](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--eqeqeq) Use `===` and `!==` over `==` and `!=`. eslint: [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq)
- [15.2](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--if) Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:
    - **Objects** evaluate to **true**
    - **Undefined** evaluates to **false**
    - **Null** evaluates to **false**
    - **Booleans** evaluate to **the value of the boolean**
    - **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    - **Strings** evaluate to **false** if an empty string `''`, otherwise **true**
    
    ```
    if ([0] && []) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```
    
- [15.3](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--shortcuts) Use shortcuts for booleans, but explicit comparisons for strings and numbers.
    
    ```
    // bad
    if (isValid === true) {
      // ...
    }
    
    // good
    if (isValid) {
      // ...
    }
    
    // bad
    if (name) {
      // ...
    }
    
    // good
    if (name !== '') {
      // ...
    }
    
    // bad
    if (collection.length) {
      // ...
    }
    
    // good
    if (collection.length > 0) {
      // ...
    }
    ```
    
- [15.4](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--moreinfo) For more information see [Truth, Equality, and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.
- [15.5](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--switch-blocks) Use braces to create blocks in `case` and `default` clauses that contain lexical declarations (e.g. `let`, `const`, `function`, and `class`). eslint: [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations)
    
    > Why? Lexical declarations are visible in the entire switch block but only get initialized when assigned, which only happens when its case is reached. This causes problems when multiple case clauses attempt to define the same thing.
    > 
    
    ```
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {
          // ...
        }
        break;
      default:
        class C {}
    }
    
    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {
          // ...
        }
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }
    ```
    
- [15.6](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--nested-ternaries) Ternaries should not be nested and generally be single line expressions. eslint: [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary)
    
    ```
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;
    
    // split into 2 separated ternary expressions
    const maybeNull = value1 > value2 ? 'baz' : null;
    
    // better
    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;
    
    // best
    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```
    
- [15.7](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--unneeded-ternary) Avoid unneeded ternary statements. eslint: [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary)
    
    ```
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;
    const quux = a != null ? a : b;
    
    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    const quux = a ?? b;
    ```
    
- [15.8](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison--no-mixed-operators) When mixing operators, enclose them in parentheses. The only exception is the standard arithmetic operators: `+`, , and `*` since their precedence is broadly understood. We recommend enclosing `/` and  in parentheses because their precedence can be ambiguous when they are mixed. eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators)
    
    > Why? This improves readability and clarifies the developer’s intention.
    > 
    
    ```
    // bad
    const foo = a && b < 0 || c > 0 || d + 1 === 0;
    
    // bad
    const bar = a ** b - 5 % d;
    
    // bad
    // one may be confused into thinking (a || b) && c
    if (a || b && c) {
      return d;
    }
    
    // bad
    const bar = a + b / c * d;
    
    // good
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
    
    // good
    const bar = a ** b - (5 % d);
    
    // good
    if (a || (b && c)) {
      return d;
    }
    
    // good
    const bar = a + (b / c) * d;
    ```
    
- [15.9](https://github.com/airbnb/javascript?tab=readme-ov-file#nullish-coalescing-operator) The nullish coalescing operator (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`. Otherwise, it returns the left-hand side operand.
    
    > Why? It provides precision by distinguishing null/undefined from other falsy values, enhancing code clarity and predictability.
    > 
    
    ```
    // bad
    const value = 0 ?? 'default';
    // returns 0, not 'default'
    
    // bad
    const value = '' ?? 'default';
    // returns '', not 'default'
    
    // good
    const value = null ?? 'default';
    // returns 'default'
    
    // good
    const user = {
      name: 'John',
      age: null
    };
    const age = user.age ?? 18;
    // returns 18
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Blocks**

- [16.1](https://github.com/airbnb/javascript?tab=readme-ov-file#blocks--braces) Use braces with all multiline blocks. eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)
    
    ```
    // bad
    if (test)
      return false;
    
    // good
    if (test) return false;
    
    // good
    if (test) {
      return false;
    }
    
    // bad
    function foo() { return false; }
    
    // good
    function bar() {
      return false;
    }
    ```
    
- [16.2](https://github.com/airbnb/javascript?tab=readme-ov-file#blocks--cuddled-elses) If you’re using multiline blocks with `if` and `else`, put `else` on the same line as your `if` block’s closing brace. eslint: [`brace-style`](https://eslint.org/docs/rules/brace-style)
    
    ```
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }
    
    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```
    
- [16.3](https://github.com/airbnb/javascript?tab=readme-ov-file#blocks--no-else-return) If an `if` block always executes a `return` statement, the subsequent `else` block is unnecessary. A `return` in an `else if` block following an `if` block that contains a `return` can be separated into multiple `if` blocks. eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)
    
    ```
    // bad
    function foo() {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    
    // bad
    function cats() {
      if (x) {
        return x;
      } else if (y) {
        return y;
      }
    }
    
    // bad
    function dogs() {
      if (x) {
        return x;
      } else {
        if (y) {
          return y;
        }
      }
    }
    
    // good
    function foo() {
      if (x) {
        return x;
      }
    
      return y;
    }
    
    // good
    function cats() {
      if (x) {
        return x;
      }
    
      if (y) {
        return y;
      }
    }
    
    // good
    function dogs(x) {
      if (x) {
        if (z) {
          return y;
        }
      } else {
        return z;
      }
    }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Control Statements**

- [17.1](https://github.com/airbnb/javascript?tab=readme-ov-file#control-statements) In case your control statement (`if`, `while` etc.) gets too long or exceeds the maximum line length, each (grouped) condition could be put into a new line. The logical operator should begin the line.
    
    > Why? Requiring operators at the beginning of the line keeps the operators aligned and follows a pattern similar to method chaining. This also improves readability by making it easier to visually follow complex logic.
    > 
    
    ```
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }
    
    // bad
    if (foo === 123 &&
      bar === 'abc') {
      thing1();
    }
    
    // bad
    if (foo === 123
      && bar === 'abc') {
      thing1();
    }
    
    // bad
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }
    
    // good
    if (
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }
    
    // good
    if (
      (foo === 123 || bar === 'abc')
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      thing1();
    }
    
    // good
    if (foo === 123 && bar === 'abc') {
      thing1();
    }
    ```
    
- [17.2](https://github.com/airbnb/javascript?tab=readme-ov-file#control-statements--value-selection) Don't use selection operators in place of control statements.
    
    ```
    // bad
    !isRunning && startRunning();
    
    // good
    if (!isRunning) {
      startRunning();
    }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)