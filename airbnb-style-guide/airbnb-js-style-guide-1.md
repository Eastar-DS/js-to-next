**Table of Contents**

1. [Types](https://github.com/airbnb/javascript?tab=readme-ov-file#types)
2. [References](https://github.com/airbnb/javascript?tab=readme-ov-file#references)
3. [Objects](https://github.com/airbnb/javascript?tab=readme-ov-file#objects)
4. [Arrays](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays)
5. [Destructuring](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring)
6. [Strings](https://github.com/airbnb/javascript?tab=readme-ov-file#strings)
7. [Functions](https://github.com/airbnb/javascript?tab=readme-ov-file#functions)
8. [Arrow Functions](https://github.com/airbnb/javascript?tab=readme-ov-file#arrow-functions)
9. [Classes & Constructors](https://github.com/airbnb/javascript?tab=readme-ov-file#classes--constructors)
10. [Modules](https://github.com/airbnb/javascript?tab=readme-ov-file#modules)
11. [Iterators and Generators](https://github.com/airbnb/javascript?tab=readme-ov-file#iterators-and-generators)
12. [Properties](https://github.com/airbnb/javascript?tab=readme-ov-file#properties)
13. [Variables](https://github.com/airbnb/javascript?tab=readme-ov-file#variables)
14. [Hoisting](https://github.com/airbnb/javascript?tab=readme-ov-file#hoisting)
15. [Comparison Operators & Equality](https://github.com/airbnb/javascript?tab=readme-ov-file#comparison-operators--equality)
16. [Blocks](https://github.com/airbnb/javascript?tab=readme-ov-file#blocks)
17. [Control Statements](https://github.com/airbnb/javascript?tab=readme-ov-file#control-statements)
18. [Comments](https://github.com/airbnb/javascript?tab=readme-ov-file#comments)
19. [Whitespace](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace)
20. [Commas](https://github.com/airbnb/javascript?tab=readme-ov-file#commas)
21. [Semicolons](https://github.com/airbnb/javascript?tab=readme-ov-file#semicolons)
22. [Type Casting & Coercion](https://github.com/airbnb/javascript?tab=readme-ov-file#type-casting--coercion)
23. [Naming Conventions](https://github.com/airbnb/javascript?tab=readme-ov-file#naming-conventions)
24. [Accessors](https://github.com/airbnb/javascript?tab=readme-ov-file#accessors)
25. [Events](https://github.com/airbnb/javascript?tab=readme-ov-file#events)
26. [jQuery](https://github.com/airbnb/javascript?tab=readme-ov-file#jquery)
27. [ECMAScript 5 Compatibility](https://github.com/airbnb/javascript?tab=readme-ov-file#ecmascript-5-compatibility)
28. [ECMAScript 6+ (ES 2015+) Styles](https://github.com/airbnb/javascript?tab=readme-ov-file#ecmascript-6-es-2015-styles)
29. [Standard Library](https://github.com/airbnb/javascript?tab=readme-ov-file#standard-library)
30. [Testing](https://github.com/airbnb/javascript?tab=readme-ov-file#testing)
31. [Performance](https://github.com/airbnb/javascript?tab=readme-ov-file#performance)
32. [Resources](https://github.com/airbnb/javascript?tab=readme-ov-file#resources)
33. [In the Wild](https://github.com/airbnb/javascript?tab=readme-ov-file#in-the-wild)
34. [Translation](https://github.com/airbnb/javascript?tab=readme-ov-file#translation)
35. [The JavaScript Style Guide Guide](https://github.com/airbnb/javascript?tab=readme-ov-file#the-javascript-style-guide-guide)
36. [Chat With Us About JavaScript](https://github.com/airbnb/javascript?tab=readme-ov-file#chat-with-us-about-javascript)
37. [Contributors](https://github.com/airbnb/javascript?tab=readme-ov-file#contributors)
38. [License](https://github.com/airbnb/javascript?tab=readme-ov-file#license)
39. [Amendments](https://github.com/airbnb/javascript?tab=readme-ov-file#amendments)

**Types**

- [1.1](https://github.com/airbnb/javascript?tab=readme-ov-file#types--primitives) **Primitives**: When you access a primitive type you work directly on its value.
    - `string`
    - `number`
    - `boolean`
    - `null`
    - `undefined`
    - `symbol`
    - `bigint`
    
    ```
    const foo = 1;
    let bar = foo;
    
    bar = 9;
    
    console.log(foo, bar); // => 1, 9
    ```
    
    - Symbols and BigInts cannot be faithfully polyfilled, so they should not be used when targeting browsers/environments that don’t support them natively.
- [1.2](https://github.com/airbnb/javascript?tab=readme-ov-file#types--complex) **Complex**: When you access a complex type you work on a reference to its value.
    - `object`
    - `array`
    - `function`
    
    ```
    const foo = [1, 2];
    const bar = foo;
    
    bar[0] = 9;
    
    console.log(foo[0], bar[0]); // => 9, 9
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**References**

- [2.1](https://github.com/airbnb/javascript?tab=readme-ov-file#references--prefer-const) Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](https://eslint.org/docs/rules/prefer-const), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign)
    
    > Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.
    > 
    
    ```
    // bad
    var a = 1;
    var b = 2;
    
    // good
    const a = 1;
    const b = 2;
    ```
    
- [2.2](https://github.com/airbnb/javascript?tab=readme-ov-file#references--disallow-var) If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](https://eslint.org/docs/rules/no-var)
    
    > Why? let is block-scoped rather than function-scoped like var.
    > 
    
    ```
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }
    
    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```
    
- [2.3](https://github.com/airbnb/javascript?tab=readme-ov-file#references--block-scope) Note that both `let` and `const` are block-scoped, whereas `var` is function-scoped.
    
    ```
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
      var c = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    console.log(c); // Prints 1
    ```
    
    In the above code, you can see that referencing `a` and `b` will produce a ReferenceError, while `c` contains the number. This is because `a` and `b` are block scoped, while `c` is scoped to the containing function.
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Objects**

- [3.1](https://github.com/airbnb/javascript?tab=readme-ov-file#objects--no-new) Use the literal syntax for object creation. eslint: [`no-new-object`](https://eslint.org/docs/rules/no-new-object)
    
    ```
    // bad
    const item = new Object();
    
    // good
    const item = {};
    ```
    
- [3.2](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-computed-properties) Use computed property names when creating objects with dynamic property names.
    
    > Why? They allow you to define all the properties of an object in one place.
    > 
    
    ```
    function getKey(k) {
      return `a key named ${k}`;
    }
    
    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;
    
    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };
    ```
    
- [3.3](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-object-shorthand) Use object method shorthand. eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand)
    
    ```
    // bad
    const atom = {
      value: 1,
    
      addValue: function (value) {
        return atom.value + value;
      },
    };
    
    // good
    const atom = {
      value: 1,
    
      addValue(value) {
        return atom.value + value;
      },
    };
    ```
    
- [3.4](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-object-concise) Use property value shorthand. eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand)
    
    > Why? It is shorter and descriptive.
    > 
    
    ```
    const lukeSkywalker = 'Luke Skywalker';
    
    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };
    
    // good
    const obj = {
      lukeSkywalker,
    };
    ```
    
- [3.5](https://github.com/airbnb/javascript?tab=readme-ov-file#objects--grouped-shorthand) Group your shorthand properties at the beginning of your object declaration.
    
    > Why? It’s easier to tell which properties are using the shorthand.
    > 
    
    ```
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';
    
    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };
    
    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```
    
- [3.6](https://github.com/airbnb/javascript?tab=readme-ov-file#objects--quoted-props) Only quote properties that are invalid identifiers. eslint: [`quote-props`](https://eslint.org/docs/rules/quote-props)
    
    > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.
    > 
    
    ```
    // bad
    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };
    
    // good
    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };
    ```
    
- [3.7](https://github.com/airbnb/javascript?tab=readme-ov-file#objects--prototype-builtins) Do not call `Object.prototype` methods directly, such as `hasOwnProperty`, `propertyIsEnumerable`, and `isPrototypeOf`. eslint: [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)
    
    > Why? These methods may be shadowed by properties on the object in question - consider { hasOwnProperty: false } - or, the object may be a null object (Object.create(null)). In modern browsers that support ES2022, or with a polyfill such as https://npmjs.com/object.hasown, Object.hasOwn can also be used as an alternative to Object.prototype.hasOwnProperty.call.
    > 
    
    ```
    // bad
    console.log(object.hasOwnProperty(key));
    
    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));
    
    // better
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    console.log(has.call(object, key));
    
    // best
    console.log(Object.hasOwn(object, key)); // only supported in browsers that support ES2022
    
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    console.log(has(object, key));
    /* or */
    console.log(Object.hasOwn(object, key)); // https://www.npmjs.com/package/object.hasown
    ```
    
- [3.8](https://github.com/airbnb/javascript?tab=readme-ov-file#objects--rest-spread) Prefer the object spread syntax over [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to shallow-copy objects. Use the object rest parameter syntax to get a new object with certain properties omitted. eslint: [`prefer-object-spread`](https://eslint.org/docs/rules/prefer-object-spread)
    
    ```
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this
    
    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
    
    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
    
    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Arrays**

- [4.1](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--literals) Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor)
    
    ```
    // bad
    const items = new Array();
    
    // good
    const items = [];
    ```
    
- [4.2](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--push) Use [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.
    
    ```
    const someStack = [];
    
    // bad
    someStack[someStack.length] = 'abracadabra';
    
    // good
    someStack.push('abracadabra');
    ```
    
- [4.3](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-array-spreads) Use array spreads `...` to copy arrays.
    
    ```
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;
    
    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }
    
    // good
    const itemsCopy = [...items];
    ```
    
- [4.4](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--from-iterable) To convert an iterable object to an array, use spreads `...` instead of [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
    
    ```
    const foo = document.querySelectorAll('.foo');
    
    // good
    const nodes = Array.from(foo);
    
    // best
    const nodes = [...foo];
    ```
    
- [4.5](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--from-array-like) Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for converting an array-like object to an array.
    
    ```
    const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
    
    // bad
    const arr = Array.prototype.slice.call(arrLike);
    
    // good
    const arr = Array.from(arrLike);
    ```
    
- [4.6](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--mapping) Use [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of spread `...` for mapping over iterables, because it avoids creating an intermediate array.
    
    ```
    // bad
    const baz = [...foo].map(bar);
    
    // good
    const baz = Array.from(foo, bar);
    ```
    
- [4.7](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--callback-return) Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following [8.2](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--implicit-return). eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)
    
    ```
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => x + 1);
    
    // bad - no returned value means `acc` becomes undefined after the first iteration
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
    });
    
    // good
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
      return flatten;
    });
    
    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });
    
    // good
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }
    
      return false;
    });
    ```
    
- [4.8](https://github.com/airbnb/javascript?tab=readme-ov-file#arrays--bracket-newline) Use line breaks after opening array brackets and before closing array brackets, if an array has multiple lines
    
    ```
    // bad
    const arr = [
      [0, 1], [2, 3], [4, 5],
    ];
    
    const objectInArray = [{
      id: 1,
    }, {
      id: 2,
    }];
    
    const numberInArray = [
      1, 2,
    ];
    
    // good
    const arr = [[0, 1], [2, 3], [4, 5]];
    
    const objectInArray = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    
    const numberInArray = [
      1,
      2,
    ];
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Destructuring**

- [5.1](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring--object) Use object destructuring when accessing and using multiple properties of an object. eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)
    
    > Why? Destructuring saves you from creating temporary references for those properties, and from repetitive access of the object. Repeating object access creates more repetitive code, requires more reading, and creates more opportunities for mistakes. Destructuring objects also provides a single site of definition of the object structure that is used in the block, rather than requiring reading the entire block to determine what is used.
    > 
    
    ```
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;
    
      return `${firstName} ${lastName}`;
    }
    
    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }
    
    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```
    
- [5.2](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring--array) Use array destructuring. eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)
    
    ```
    const arr = [1, 2, 3, 4];
    
    // bad
    const first = arr[0];
    const second = arr[1];
    
    // good
    const [first, second] = arr;
    ```
    
- [5.3](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring--object-over-array) Use object destructuring for multiple return values, not array destructuring.
    
    > Why? You can add new properties over time or change the order of things without breaking call sites.
    > 
    
    ```
    // bad
    function processInput(input) {
      // then a miracle occurs
      return [left, right, top, bottom];
    }
    
    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);
    
    // good
    function processInput(input) {
      // then a miracle occurs
      return { left, right, top, bottom };
    }
    
    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Strings**

- [6.1](https://github.com/airbnb/javascript?tab=readme-ov-file#strings--quotes) Use single quotes `''` for strings. eslint: [`quotes`](https://eslint.org/docs/rules/quotes)
    
    ```
    // bad
    const name = "Capt. Janeway";
    
    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;
    
    // good
    const name = 'Capt. Janeway';
    ```
    
- [6.2](https://github.com/airbnb/javascript?tab=readme-ov-file#strings--line-length) Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.
    
    > Why? Broken strings are painful to work with and make code less searchable.
    > 
    
    ```
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';
    
    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    
    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```
    
- [6.3](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-template-literals) When programmatically building up strings, use template strings instead of concatenation. eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)
    
    > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.
    > 
    
    ```
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }
    
    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }
    
    // bad
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }
    
    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```
    
- [6.4](https://github.com/airbnb/javascript?tab=readme-ov-file#strings--eval) Never use `eval()` on a string; it opens too many vulnerabilities. eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)
- [6.5](https://github.com/airbnb/javascript?tab=readme-ov-file#strings--escaping) Do not unnecessarily escape characters in strings. eslint: [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape)
    
    > Why? Backslashes harm readability, thus they should only be present when necessary.
    > 
    
    ```
    // bad
    const foo = '\'this\' \i\s \"quoted\"';
    
    // good
    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Functions**

- [7.1](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--declarations) Use named function expressions instead of function declarations. eslint: [`func-style`](https://eslint.org/docs/rules/func-style), [`func-names`](https://eslint.org/docs/latest/rules/func-names)
    
    > Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error’s call stack. (Discussion)
    > 
    
    ```
    // bad
    function foo() {
      // ...
    }
    
    // bad
    const foo = function () {
      // ...
    };
    
    // good
    // lexical name distinguished from the variable-referenced invocation(s)
    const short = function longUniqueMoreDescriptiveLexicalFoo() {
      // ...
    };
    ```
    
- [7.2](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--iife) Wrap immediately invoked function expressions in parentheses. eslint: [`wrap-iife`](https://eslint.org/docs/rules/wrap-iife)
    
    > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.
    > 
    
    ```
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```
    
- [7.3](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--in-blocks) Never declare a function in a non-function block (`if`, `while`, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears. eslint: [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func)
- [7.4](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--note-on-blocks) **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement.
    
    ```
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }
    
    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    ```
    
- [7.5](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--arguments-shadow) Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.
    
    ```
    // bad
    function foo(name, options, arguments) {
      // ...
    }
    
    // good
    function foo(name, options, args) {
      // ...
    }
    ```
    
- [7.6](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-rest) Never use `arguments`, opt to use rest syntax `...` instead. eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)
    
    > Why? ... is explicit about which arguments you want pulled. Plus, rest arguments are a real Array, and not merely Array-like like arguments.
    > 
    
    ```
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }
    
    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```
    
- [7.7](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-default-parameters) Use default parameter syntax rather than mutating function arguments.
    
    ```
    // really bad
    function handleThings(opts) {
      // No! We shouldn’t mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }
    
    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }
    
    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```
    
- [7.8](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--default-side-effects) Avoid side effects with default parameters.
    
    > Why? They are confusing to reason about.
    > 
    
    ```
    let b = 1;
    // bad
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```
    
- [7.9](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--defaults-last) Always put default parameters last. eslint: [`default-param-last`](https://eslint.org/docs/rules/default-param-last)
    
    ```
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }
    
    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```
    
- [7.10](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--constructor) Never use the Function constructor to create a new function. eslint: [`no-new-func`](https://eslint.org/docs/rules/no-new-func)
    
    > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.
    > 
    
    ```
    // bad
    const add = new Function('a', 'b', 'return a + b');
    
    // still bad
    const subtract = Function('a', 'b', 'return a - b');
    ```
    
- [7.11](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--signature-spacing) Spacing in a function signature. eslint: [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks)
    
    > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.
    > 
    
    ```
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};
    
    // good
    const x = function () {};
    const y = function a() {};
    ```
    
- [7.12](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--mutate-params) Never mutate parameters. eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign)
    
    > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.
    > 
    
    ```
    // bad
    function f1(obj) {
      obj.key = 1;
    }
    
    // good
    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    }
    ```
    
- [7.13](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--reassign-params) Never reassign parameters. eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign)
    
    > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the arguments object. It can also cause optimization issues, especially in V8.
    > 
    
    ```
    // bad
    function f1(a) {
      a = 1;
      // ...
    }
    
    function f2(a) {
      if (!a) { a = 1; }
      // ...
    }
    
    // good
    function f3(a) {
      const b = a || 1;
      // ...
    }
    
    function f4(a = 1) {
      // ...
    }
    ```
    
- [7.14](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--spread-vs-apply) Prefer the use of the spread syntax `...` to call variadic functions. eslint: [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)
    
    > Why? It’s cleaner, you don’t need to supply a context, and you can not easily compose new with apply.
    > 
    
    ```
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);
    
    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);
    
    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));
    
    // good
    new Date(...[2016, 8, 5]);
    ```
    
- [7.15](https://github.com/airbnb/javascript?tab=readme-ov-file#functions--signature-invocation-indentation) Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item. eslint: [`function-paren-newline`](https://eslint.org/docs/rules/function-paren-newline)
    
    ```
    // bad
    function foo(bar,
                 baz,
                 quux) {
      // ...
    }
    
    // good
    function foo(
      bar,
      baz,
      quux,
    ) {
      // ...
    }
    
    // bad
    console.log(foo,
      bar,
      baz);
    
    // good
    console.log(
      foo,
      bar,
      baz,
    );
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Arrow Functions**

- [8.1](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--use-them) When you must use an anonymous function (as when passing an inline callback), use arrow function notation. eslint: [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback), [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing)
    
    > Why? It creates a version of the function that executes in the context of this, which is usually what you want, and is a more concise syntax.
    > 
    
    > Why not? If you have a fairly complicated function, you might move that logic out into its own named function expression.
    > 
    
    ```
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```
    
- [8.2](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--implicit-return) If the function body consists of a single statement returning an [expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a `return` statement. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style)
    
    > Why? Syntactic sugar. It reads well when multiple functions are chained together.
    > 
    
    ```
    // bad
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });
    
    // good
    [1, 2, 3].map((number) => `A string containing the ${number + 1}.`);
    
    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });
    
    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number,
    }));
    
    // No implicit return with side effects
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }
    
    let bool = false;
    
    // bad
    foo(() => bool = true);
    
    // good
    foo(() => {
      bool = true;
    });
    ```
    
- [8.3](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--paren-wrap) In case the expression spans over multiple lines, wrap it in parentheses for better readability.
    
    > Why? It shows clearly where the function starts and ends.
    > 
    
    ```
    // bad
    ['get', 'post', 'put'].map((httpMethod) => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );
    
    // good
    ['get', 'post', 'put'].map((httpMethod) => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));
    ```
    
- [8.4](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--one-arg-parens) Always include parentheses around arguments for clarity and consistency. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens)
    
    > Why? Minimizes diff churn when adding or removing arguments.
    > 
    
    ```
    // bad
    [1, 2, 3].map(x => x * x);
    
    // good
    [1, 2, 3].map((x) => x * x);
    
    // bad
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));
    
    // good
    [1, 2, 3].map((number) => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));
    
    // bad
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```
    
- [8.5](https://github.com/airbnb/javascript?tab=readme-ov-file#arrows--confusing) Avoid confusing arrow function syntax (`=>`) with comparison operators (`<=`, `>=`). eslint: [`no-confusing-arrow`](https://eslint.org/docs/rules/no-confusing-arrow)
    
    ```
    // bad
    const itemHeight = (item) => item.height <= 256 ? item.largeSize : item.smallSize;
    
    // bad
    const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;
    
    // good
    const itemHeight = (item) => (item.height <= 256 ? item.largeSize : item.smallSize);
    
    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height <= 256 ? largeSize : smallSize;
    };
    ```
    
- [8.6](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--implicit-arrow-linebreak) Enforce the location of arrow function bodies with implicit returns. eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)
    
    ```
    // bad
    (foo) =>
      bar;
    
    (foo) =>
      (bar);
    
    // good
    (foo) => bar;
    (foo) => (bar);
    (foo) => (
       bar
    )
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Classes & Constructors**

- [9.1](https://github.com/airbnb/javascript?tab=readme-ov-file#constructors--use-class) Always use `class`. Avoid manipulating `prototype` directly.
    
    > Why? class syntax is more concise and easier to reason about.
    > 
    
    ```
    // bad
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };
    
    // good
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }
    ```
    
- [9.2](https://github.com/airbnb/javascript?tab=readme-ov-file#constructors--extends) Use `extends` for inheritance.
    
    > Why? It is a built-in way to inherit prototype functionality without breaking instanceof.
    > 
    
    ```
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this.queue[0];
    };
    
    // good
    class PeekableQueue extends Queue {
      peek() {
        return this.queue[0];
      }
    }
    ```
    
- [9.3](https://github.com/airbnb/javascript?tab=readme-ov-file#constructors--chaining) Methods can return `this` to help with method chaining.
    
    ```
    // bad
    Jedi.prototype.jump = function () {
      this.jumping = true;
      return true;
    };
    
    Jedi.prototype.setHeight = function (height) {
      this.height = height;
    };
    
    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined
    
    // good
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }
    
      setHeight(height) {
        this.height = height;
        return this;
      }
    }
    
    const luke = new Jedi();
    
    luke.jump()
      .setHeight(20);
    ```
    
- [9.4](https://github.com/airbnb/javascript?tab=readme-ov-file#constructors--tostring) It’s okay to write a custom `toString()` method, just make sure it works successfully and causes no side effects.
    
    ```
    class Jedi {
      constructor(options = {}) {
        this.name = options.name || 'no name';
      }
    
      getName() {
        return this.name;
      }
    
      toString() {
        return `Jedi - ${this.getName()}`;
      }
    }
    ```
    
- [9.5](https://github.com/airbnb/javascript?tab=readme-ov-file#constructors--no-useless) Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)
    
    ```
    // bad
    class Jedi {
      constructor() {}
    
      getName() {
        return this.name;
      }
    }
    
    // bad
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }
    
    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }
    ```
    
- [9.6](https://github.com/airbnb/javascript?tab=readme-ov-file#classes--no-duplicate-members) Avoid duplicate class members. eslint: [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members)
    
    > Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.
    > 
    
    ```
    // bad
    class Foo {
      bar() { return 1; }
      bar() { return 2; }
    }
    
    // good
    class Foo {
      bar() { return 1; }
    }
    
    // good
    class Foo {
      bar() { return 2; }
    }
    ```
    
- [9.7](https://github.com/airbnb/javascript?tab=readme-ov-file#classes--methods-use-this) Class methods should use `this` or be made into a static method unless an external library or framework requires using specific non-static methods. Being an instance method should indicate that it behaves differently based on properties of the receiver. eslint: [`class-methods-use-this`](https://eslint.org/docs/rules/class-methods-use-this)
    
    ```
    // bad
    class Foo {
      bar() {
        console.log('bar');
      }
    }
    
    // good - this is used
    class Foo {
      bar() {
        console.log(this.bar);
      }
    }
    
    // good - constructor is exempt
    class Foo {
      constructor() {
        // ...
      }
    }
    
    // good - static methods aren't expected to use this
    class Foo {
      static bar() {
        console.log('bar');
      }
    }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)