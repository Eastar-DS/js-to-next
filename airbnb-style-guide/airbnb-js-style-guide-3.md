**Comments**

- [18.1](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--multiline) Use `/** ... */` for multiline comments.
    
    ```
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {
    
      // ...
    
      return element;
    }
    
    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
    
      // ...
    
      return element;
    }
    ```
    
- [18.2](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--singleline) Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it’s on the first line of a block.
    
    ```
    // bad
    const active = true;  // is current tab
    
    // good
    // is current tab
    const active = true;
    
    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this.type || 'no type';
    
      return type;
    }
    
    // good
    function getType() {
      console.log('fetching type...');
    
      // set the default type to 'no type'
      const type = this.type || 'no type';
    
      return type;
    }
    
    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this.type || 'no type';
    
      return type;
    }
    ```
    
- [18.3](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--spaces) Start all comments with a space to make it easier to read. eslint: [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment)
    
    ```
    // bad
    //is current tab
    const active = true;
    
    // good
    // is current tab
    const active = true;
    
    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {
    
      // ...
    
      return element;
    }
    
    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {
    
      // ...
    
      return element;
    }
    ```
    
- [18.4](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--actionitems) Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you’re pointing out a problem that needs to be revisited, or if you’re suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME: -- need to figure this out` or `TODO: -- need to implement`.
- [18.5](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--fixme) Use `// FIXME:` to annotate problems.
    
    ```
    class Calculator extends Abacus {
      constructor() {
        super();
    
        // FIXME: shouldn’t use a global here
        total = 0;
      }
    }
    ```
    
- [18.6](https://github.com/airbnb/javascript?tab=readme-ov-file#comments--todo) Use `// TODO:` to annotate solutions to problems.
    
    ```
    class Calculator extends Abacus {
      constructor() {
        super();
    
        // TODO: total should be configurable by an options param
        this.total = 0;
      }
    }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Whitespace**

- [19.1](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--spaces) Use soft tabs (space character) set to 2 spaces. eslint: [`indent`](https://eslint.org/docs/rules/indent)
    
    ```
    // bad
    function foo() {
    ∙∙∙∙let name;
    }
    
    // bad
    function bar() {
    ∙let name;
    }
    
    // good
    function baz() {
    ∙∙let name;
    }
    ```
    
- [19.2](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--before-blocks) Place 1 space before the leading brace. eslint: [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks)
    
    ```
    // bad
    function test(){
      console.log('test');
    }
    
    // good
    function test() {
      console.log('test');
    }
    
    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    
    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```
    
- [19.3](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--around-keywords) Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. eslint: [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing)
    
    ```
    // bad
    if(isJedi) {
      fight ();
    }
    
    // good
    if (isJedi) {
      fight();
    }
    
    // bad
    function fight () {
      console.log ('Swooosh!');
    }
    
    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```
    
- [19.4](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--infix-ops) Set off operators with spaces. eslint: [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops)
    
    ```
    // bad
    const x=y+5;
    
    // good
    const x = y + 5;
    ```
    
- [19.5](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--newline-at-end) End files with a single newline character. eslint: [`eol-last`](https://eslint.org/docs/rules/eol-last)
    
    ```
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;
    ```
    
    ```
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵
    ```
    
    ```
    // good
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ```
    
- [19.6](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--chains) Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which emphasizes that the line is a method call, not a new statement. eslint: [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](https://eslint.org/docs/rules/no-whitespace-before-property)
    
    ```
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();
    
    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();
    
    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();
    
    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin}, ${radius + margin})`)
        .call(tron.led);
    
    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', `translate(${radius + margin}, ${radius + margin})`)
        .call(tron.led);
    
    // good
    const leds = stage.selectAll('.led').data(data);
    const svg = leds.enter().append('svg:svg');
    svg.classed('led', true).attr('width', (radius + margin) * 2);
    const g = svg.append('svg:g');
    g.attr('transform', `translate(${radius + margin}, ${radius + margin})`).call(tron.led);
    ```
    
- [19.7](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--after-blocks) Leave a blank line after blocks and before the next statement.
    
    ```
    // bad
    if (foo) {
      return bar;
    }
    return baz;
    
    // good
    if (foo) {
      return bar;
    }
    
    return baz;
    
    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;
    
    // good
    const obj = {
      foo() {
      },
    
      bar() {
      },
    };
    
    return obj;
    
    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;
    
    // good
    const arr = [
      function foo() {
      },
    
      function bar() {
      },
    ];
    
    return arr;
    ```
    
- [19.8](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--padded-blocks) Do not pad your blocks with blank lines. eslint: [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks)
    
    ```
    // bad
    function bar() {
    
      console.log(foo);
    
    }
    
    // bad
    if (baz) {
    
      console.log(quux);
    } else {
      console.log(foo);
    
    }
    
    // bad
    class Foo {
    
      constructor(bar) {
        this.bar = bar;
      }
    }
    
    // good
    function bar() {
      console.log(foo);
    }
    
    // good
    if (baz) {
      console.log(quux);
    } else {
      console.log(foo);
    }
    ```
    
- [19.9](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--no-multiple-blanks) Do not use multiple blank lines to pad your code. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)
    
    ```
    // bad
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;
    
        this.email = email;
    
        this.setAge(birthday);
      }
    
      setAge(birthday) {
        const today = new Date();
    
        const age = this.getAge(today, birthday);
    
        this.age = age;
      }
    
      getAge(today, birthday) {
        // ..
      }
    }
    
    // good
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;
        this.email = email;
        this.setAge(birthday);
      }
    
      setAge(birthday) {
        const today = new Date();
        const age = getAge(today, birthday);
        this.age = age;
      }
    
      getAge(today, birthday) {
        // ..
      }
    }
    ```
    
- [19.10](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--in-parens) Do not add spaces inside parentheses. eslint: [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens)
    
    ```
    // bad
    function bar( foo ) {
      return foo;
    }
    
    // good
    function bar(foo) {
      return foo;
    }
    
    // bad
    if ( foo ) {
      console.log(foo);
    }
    
    // good
    if (foo) {
      console.log(foo);
    }
    ```
    
- [19.11](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--in-brackets) Do not add spaces inside brackets. eslint: [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing)
    
    ```
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);
    
    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```
    
- [19.12](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--in-braces) Add spaces inside curly braces. eslint: [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing)
    
    ```
    // bad
    const foo = {clark: 'kent'};
    
    // good
    const foo = { clark: 'kent' };
    ```
    
- [19.13](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--max-len) Avoid having lines of code that are longer than 100 characters (including whitespace). Note: per [above](https://github.com/airbnb/javascript?tab=readme-ov-file#strings--line-length), long strings are exempt from this rule, and should not be broken up. eslint: [`max-len`](https://eslint.org/docs/rules/max-len)
    
    > Why? This ensures readability and maintainability.
    > 
    
    ```
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;
    
    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));
    
    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;
    
    // better
    const foo = jsonData
      ?.foo
      ?.bar
      ?.baz
      ?.quux
      ?.xyzzy;
    
    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));
    ```
    
- [19.14](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--block-spacing) Require consistent spacing inside an open block token and the next token on the same line. This rule also enforces consistent spacing inside a close block token and previous token on the same line. eslint: [`block-spacing`](https://eslint.org/docs/rules/block-spacing)
    
    ```
    // bad
    function foo() {return true;}
    if (foo) { bar = 0;}
    
    // good
    function foo() { return true; }
    if (foo) { bar = 0; }
    ```
    
- [19.15](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--comma-spacing) Avoid spaces before commas and require a space after commas. eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)
    
    ```
    // bad
    const foo = 1,bar = 2;
    const arr = [1 , 2];
    
    // good
    const foo = 1, bar = 2;
    const arr = [1, 2];
    ```
    
- [19.16](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--computed-property-spacing) Enforce spacing inside of computed property brackets. eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)
    
    ```
    // bad
    obj[foo ]
    obj[ 'foo']
    const x = {[ b ]: a}
    obj[foo[ bar ]]
    
    // good
    obj[foo]
    obj['foo']
    const x = { [b]: a }
    obj[foo[bar]]
    ```
    
- [19.17](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--func-call-spacing) Avoid spaces between functions and their invocations. eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)
    
    ```
    // bad
    func ();
    
    func
    ();
    
    // good
    func();
    ```
    
- [19.18](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--key-spacing) Enforce spacing between keys and values in object literal properties. eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)
    
    ```
    // bad
    const obj = { foo : 42 };
    const obj2 = { foo:42 };
    
    // good
    const obj = { foo: 42 };
    ```
    
- [19.19](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--no-trailing-spaces) Avoid trailing spaces at the end of lines. eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)
- [19.20](https://github.com/airbnb/javascript?tab=readme-ov-file#whitespace--no-multiple-empty-lines) Avoid multiple empty lines, only allow one newline at the end of files, and avoid a newline at the beginning of files. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)
    
    ```
    // bad - multiple empty lines
    const x = 1;
    
    const y = 2;
    
    // bad - 2+ newlines at end of file
    const x = 1;
    const y = 2;
    
    // bad - 1+ newline(s) at beginning of file
    
    const x = 1;
    const y = 2;
    
    // good
    const x = 1;
    const y = 2;
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Commas**

- [20.1](https://github.com/airbnb/javascript?tab=readme-ov-file#commas--leading-trailing) Leading commas: **Nope.** eslint: [`comma-style`](https://eslint.org/docs/rules/comma-style)
    
    ```
    // bad
    const story = [
        once
      , upon
      , aTime
    ];
    
    // good
    const story = [
      once,
      upon,
      aTime,
    ];
    
    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };
    
    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```
    
- [20.2](https://github.com/airbnb/javascript?tab=readme-ov-file#commas--dangling) Additional trailing comma: **Yup.** eslint: [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle)
    
    > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the trailing comma problem in legacy browsers.
    > 
    
    ```
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };
    
    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```
    
    ```
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };
    
    const heroes = [
      'Batman',
      'Superman'
    ];
    
    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };
    
    const heroes = [
      'Batman',
      'Superman',
    ];
    
    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }
    
    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }
    
    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }
    
    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );
    
    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );
    
    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    );
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Semicolons**

- [21.1](https://github.com/airbnb/javascript?tab=readme-ov-file#semicolons--required) **Yup.** eslint: [`semi`](https://eslint.org/docs/rules/semi)
    
    > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called Automatic Semicolon Insertion to determine whether it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.
    > 
    
    ```
    // bad - raises exception
    const luke = {}
    const leia = {}
    [luke, leia].forEach((jedi) => jedi.father = 'vader')
    
    // bad - raises exception
    const reaction = "No! That’s impossible!"
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }())
    
    // bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }
    
    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = 'vader';
    });
    
    // good
    const reaction = 'No! That’s impossible!';
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }());
    
    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ```
    
    [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214).
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Type Casting & Coercion**

- [22.1](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--explicit) Perform type coercion at the beginning of the statement.
- [22.2](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--strings) Strings: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)
    
    ```
    // => this.reviewScore = 9;
    
    // bad
    const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"
    
    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()
    
    // bad
    const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string
    
    // good
    const totalScore = String(this.reviewScore);
    ```
    
- [22.3](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--numbers) Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings. eslint: [`radix`](https://eslint.org/docs/rules/radix) [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)
    
    > Why? The parseInt function produces an integer value dictated by interpretation of the contents of the string argument according to the specified radix. Leading whitespace in string is ignored. If radix is undefined or 0, it is assumed to be 10 except when the number begins with the character pairs 0x or 0X, in which case a radix of 16 is assumed. This differs from ECMAScript 3, which merely discouraged (but allowed) octal interpretation. Many implementations have not adopted this behavior as of 2013. And, because older browsers must be supported, always specify a radix.
    > 
    
    ```
    const inputValue = '4';
    
    // bad
    const val = new Number(inputValue);
    
    // bad
    const val = +inputValue;
    
    // bad
    const val = inputValue >> 0;
    
    // bad
    const val = parseInt(inputValue);
    
    // good
    const val = Number(inputValue);
    
    // good
    const val = parseInt(inputValue, 10);
    ```
    
- [22.4](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--comment-deviations) If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](https://web.archive.org/web/20200414205431/https://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you’re doing.
    
    ```
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;
    ```
    
- [22.5](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--bitwise) **Note:** Be careful when using bitshift operations. Numbers are represented as [64-bit values](https://es5.github.io/#x4.3.19), but bitshift operations always return a 32-bit integer ([source](https://es5.github.io/#x11.7)). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Largest signed 32-bit Int is 2,147,483,647:
    
    ```
    2147483647 >> 0; // => 2147483647
    2147483648 >> 0; // => -2147483648
    2147483649 >> 0; // => -2147483647
    ```
    
- [22.6](https://github.com/airbnb/javascript?tab=readme-ov-file#coercion--booleans) Booleans: eslint: [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers)
    
    ```
    const age = 0;
    
    // bad
    const hasAge = new Boolean(age);
    
    // good
    const hasAge = Boolean(age);
    
    // best
    const hasAge = !!age;
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Naming Conventions**

- [23.1](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--descriptive) Avoid single letter names. Be descriptive with your naming. eslint: [`id-length`](https://eslint.org/docs/rules/id-length)
    
    ```
    // bad
    function q() {
      // ...
    }
    
    // good
    function query() {
      // ...
    }
    ```
    
- [23.2](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--camelCase) Use camelCase when naming objects, functions, and instances. eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase)
    
    ```
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}
    
    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```
    
- [23.3](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--PascalCase) Use PascalCase only when naming constructors or classes. eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap)
    
    ```
    // bad
    function user(options) {
      this.name = options.name;
    }
    
    const bad = new user({
      name: 'nope',
    });
    
    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }
    
    const good = new User({
      name: 'yup',
    });
    ```
    
- [23.4](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--leading-underscore) Do not use trailing or leading underscores. eslint: [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle)
    
    > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.
    > 
    
    ```
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';
    
    // good
    this.firstName = 'Panda';
    
    // good, in environments where WeakMaps are available
    // see https://compat-table.github.io/compat-table/es6/#test-WeakMap
    const firstNames = new WeakMap();
    firstNames.set(this, 'Panda');
    ```
    
- [23.5](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--self-this) Don’t save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
    
    ```
    // bad
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }
    
    // bad
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }
    
    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }
    ```
    
- [23.6](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--filename-matches-export) A base filename should exactly match the name of its default export.
    
    ```
    // file 1 contents
    class CheckBox {
      // ...
    }
    export default CheckBox;
    
    // file 2 contents
    export default function fortyTwo() { return 42; }
    
    // file 3 contents
    export default function insideDirectory() {}
    
    // in some other file
    // bad
    import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
    import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
    import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export
    
    // bad
    import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
    import forty_two from './forty_two'; // snake_case import/filename, camelCase export
    import inside_directory from './inside_directory'; // snake_case import, camelCase export
    import index from './inside_directory/index'; // requiring the index file explicitly
    import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly
    
    // good
    import CheckBox from './CheckBox'; // PascalCase export/import/filename
    import fortyTwo from './fortyTwo'; // camelCase export/import/filename
    import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
    ```
    
- [23.7](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--camelCase-default-export) Use camelCase when you export-default a function. Your filename should be identical to your function’s name.
    
    ```
    function makeStyleGuide() {
      // ...
    }
    
    export default makeStyleGuide;
    ```
    
- [23.8](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--PascalCase-singleton) Use PascalCase when you export a constructor / class / singleton / function library / bare object.
    
    ```
    const AirbnbStyleGuide = {
      es6: {
      },
    };
    
    export default AirbnbStyleGuide;
    ```
    
- [23.9](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--Acronyms-and-Initialisms) Acronyms and initialisms should always be all uppercased, or all lowercased.
    
    > Why? Names are for readability, not to appease a computer algorithm.
    > 
    
    ```
    // bad
    import SmsContainer from './containers/SmsContainer';
    
    // bad
    const HttpRequests = [
      // ...
    ];
    
    // good
    import SMSContainer from './containers/SMSContainer';
    
    // good
    const HTTPRequests = [
      // ...
    ];
    
    // also good
    const httpRequests = [
      // ...
    ];
    
    // best
    import TextMessageContainer from './containers/TextMessageContainer';
    
    // best
    const requests = [
      // ...
    ];
    ```
    
- [23.10](https://github.com/airbnb/javascript?tab=readme-ov-file#naming--uppercase) You may optionally uppercase a constant only if it (1) is exported, (2) is a `const` (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.
    
    > Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.
    > 
    - What about all `const` variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
    - What about exported objects? - Uppercase at the top level of export (e.g. `EXPORTED_OBJECT.key`) and maintain that all nested properties do not change.
    
    ```
    // bad
    const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';
    
    // bad
    export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';
    
    // bad
    export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';
    
    // ---
    
    // allowed but does not supply semantic value
    export const apiKey = 'SOMEKEY';
    
    // better in most cases
    export const API_KEY = 'SOMEKEY';
    
    // ---
    
    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
      KEY: 'value'
    };
    
    // good
    export const MAPPING = {
      key: 'value',
    };
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Accessors**

- [24.1](https://github.com/airbnb/javascript?tab=readme-ov-file#accessors--not-required) Accessor functions for properties are not required.
- [24.2](https://github.com/airbnb/javascript?tab=readme-ov-file#accessors--no-getters-setters) Do not use JavaScript getters/setters as they cause unexpected side effects and are harder to test, maintain, and reason about. Instead, if you do make accessor functions, use `getVal()` and `setVal('hello')`.
    
    ```
    // bad
    class Dragon {
      get age() {
        // ...
      }
    
      set age(value) {
        // ...
      }
    }
    
    // good
    class Dragon {
      getAge() {
        // ...
      }
    
      setAge(value) {
        // ...
      }
    }
    ```
    
- [24.3](https://github.com/airbnb/javascript?tab=readme-ov-file#accessors--boolean-prefix) If the property/method is a `boolean`, use `isVal()` or `hasVal()`.
    
    ```
    // bad
    if (!dragon.age()) {
      return false;
    }
    
    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```
    
- [24.4](https://github.com/airbnb/javascript?tab=readme-ov-file#accessors--consistent) It’s okay to create `get()` and `set()` functions, but be consistent.
    
    ```
    class Jedi {
      constructor(options = {}) {
        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);
      }
    
      set(key, val) {
        this[key] = val;
      }
    
      get(key) {
        return this[key];
      }
    }
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Events**

- [25.1](https://github.com/airbnb/javascript?tab=readme-ov-file#events--hash) When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass an object literal (also known as a "hash") instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:
    
    ```
    // bad
    $(this).trigger('listingUpdated', listing.id);
    
    // ...
    
    $(this).on('listingUpdated', (e, listingID) => {
      // do something with listingID
    });
    ```
    
    prefer:
    
    ```
    // good
    $(this).trigger('listingUpdated', { listingID: listing.id });
    
    // ...
    
    $(this).on('listingUpdated', (e, data) => {
      // do something with data.listingID
    });
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**jQuery**

- [26.1](https://github.com/airbnb/javascript?tab=readme-ov-file#jquery--dollar-prefix) Prefix jQuery object variables with a `$`.
    
    ```
    // bad
    const sidebar = $('.sidebar');
    
    // good
    const $sidebar = $('.sidebar');
    
    // good
    const $sidebarBtn = $('.sidebar-btn');
    ```
    
- [26.2](https://github.com/airbnb/javascript?tab=readme-ov-file#jquery--cache) Cache jQuery lookups.
    
    ```
    // bad
    function setSidebar() {
      $('.sidebar').hide();
    
      // ...
    
      $('.sidebar').css({
        'background-color': 'pink',
      });
    }
    
    // good
    function setSidebar() {
      const $sidebar = $('.sidebar');
      $sidebar.hide();
    
      // ...
    
      $sidebar.css({
        'background-color': 'pink',
      });
    }
    ```
    
- [26.3](https://github.com/airbnb/javascript?tab=readme-ov-file#jquery--queries) For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > ul')`. [jsPerf](https://web.archive.org/web/20200414183810/https://jsperf.com/jquery-find-vs-context-sel/16)
- [26.4](https://github.com/airbnb/javascript?tab=readme-ov-file#jquery--find) Use `find` with scoped jQuery object queries.
    
    ```
    // bad
    $('ul', '.sidebar').hide();
    
    // bad
    $('.sidebar').find('ul').hide();
    
    // good
    $('.sidebar ul').hide();
    
    // good
    $('.sidebar > ul').hide();
    
    // good
    $sidebar.find('ul').hide();
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**ECMAScript 5 Compatibility**

- [27.1](https://github.com/airbnb/javascript?tab=readme-ov-file#es5-compat--kangax) Refer to [Kangax](https://twitter.com/kangax/)’s ES5 [compatibility table](https://compat-table.github.io/compat-table/es5/).

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**ECMAScript 6+ (ES 2015+) Styles**

- [28.1](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-styles) This is a collection of links to the various ES6+ features.
1. [Arrow Functions](https://github.com/airbnb/javascript?tab=readme-ov-file#arrow-functions)
2. [Classes](https://github.com/airbnb/javascript?tab=readme-ov-file#classes--constructors)
3. [Object Shorthand](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-object-shorthand)
4. [Object Concise](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-object-concise)
5. [Object Computed Properties](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-computed-properties)
6. [Template Strings](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-template-literals)
7. [Destructuring](https://github.com/airbnb/javascript?tab=readme-ov-file#destructuring)
8. [Default Parameters](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-default-parameters)
9. [Rest](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-rest)
10. [Array Spreads](https://github.com/airbnb/javascript?tab=readme-ov-file#es6-array-spreads)
11. [Let and Const](https://github.com/airbnb/javascript?tab=readme-ov-file#references)
12. [Exponentiation Operator](https://github.com/airbnb/javascript?tab=readme-ov-file#es2016-properties--exponentiation-operator)
13. [Iterators and Generators](https://github.com/airbnb/javascript?tab=readme-ov-file#iterators-and-generators)
14. [Modules](https://github.com/airbnb/javascript?tab=readme-ov-file#modules)
- [28.2](https://github.com/airbnb/javascript?tab=readme-ov-file#tc39-proposals) Do not use [TC39 proposals](https://github.com/tc39/proposals) that have not reached stage 3.
    
    > Why? They are not finalized, and they are subject to change or to be withdrawn entirely. We want to use JavaScript, and proposals are not JavaScript yet.
    > 

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Standard Library**

The [Standard Library](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects) contains utilities that are functionally broken but remain for legacy reasons.

- [29.1](https://github.com/airbnb/javascript?tab=readme-ov-file#standard-library--isnan) Use `Number.isNaN` instead of global `isNaN`. eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)
    
    > Why? The global isNaN coerces non-numbers to numbers, returning true for anything that coerces to NaN. If this behavior is desired, make it explicit.
    > 
    
    ```
    // bad
    isNaN('1.2'); // false
    isNaN('1.2.3'); // true
    
    // good
    Number.isNaN('1.2.3'); // false
    Number.isNaN(Number('1.2.3')); // true
    ```
    
- [29.2](https://github.com/airbnb/javascript?tab=readme-ov-file#standard-library--isfinite) Use `Number.isFinite` instead of global `isFinite`. eslint: [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals)
    
    > Why? The global isFinite coerces non-numbers to numbers, returning true for anything that coerces to a finite number. If this behavior is desired, make it explicit.
    > 
    
    ```
    // bad
    isFinite('2e3'); // true
    
    // good
    Number.isFinite('2e3'); // false
    Number.isFinite(parseInt('2e3', 10)); // true
    ```
    

[**⬆ back to top**](https://github.com/airbnb/javascript?tab=readme-ov-file#table-of-contents)

**Testing**

- [30.1](https://github.com/airbnb/javascript?tab=readme-ov-file#testing--yup) **Yup.**
    
    ```
    function foo() {
      return true;
    }
    ```
    
- [30.2](https://github.com/airbnb/javascript?tab=readme-ov-file#testing--for-real) **No, but seriously**:
    - Whichever testing framework you use, you should be writing tests!
    - Strive to write many small pure functions, and minimize where mutations occur.
    - Be cautious about stubs and mocks - they can make your tests more brittle.
    - We primarily use [`mocha`](https://www.npmjs.com/package/mocha) and [`jest`](https://www.npmjs.com/package/jest) at Airbnb. [`tape`](https://www.npmjs.com/package/tape) is also used occasionally for small, separate modules.
    - 100% test coverage is a good goal to strive for, even if it’s not always practical to reach it.
    - Whenever you fix a bug, *write a regression test*. A bug fixed without a regression test is almost certainly going to break again in the future.