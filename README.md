1) What is the difference between var, let, and const?
    Ans:
        var: var is hoisted to the top. It can be redeclared and can be re assigned. var is function scoped.

        let: let is not hoisted to the top and it has a temporal dead zone above it where it can not be accessed. It can not be redeclared in the same scope but can be reassigned. It is block scoped.

        const: const is not hoisted to the top. Can not be redeclared or reassigned that means value can not be changed once declared. It is also block scoped.

2) What is the difference between map(), forEach(), and filter()?
    Ans:
        map(): map() performs the task based on the logic passed as callback function and returns a new array.

        forEach(): forEach() just performs the task based on the callback function but doesn't return anything.

        filter(): filter() returns a new array consisting of the elements selected based on the callback function.

3) What are arrow functions in ES6?
    Ans:
        Arrow function in ES6 is a new cleaner syntax of decaring function. It can be with name or annonymous. () is not mendatory for single parameter and single expression without {} returns automatically. Example:
            const functionName = (a,b) => {return a+b};

4) How does destructuring assignment work in ES6?
    Ans:
        destructuring is a sort and cleaner technique for assigning the array items to different variables. example:
            const arr = [1,2,3];
            const [a,b,c] = arr;
        This assigns a=1 , b=2 and c=3 .

5) Explain template literals in ES6. How are they different from string concatenation?
    Ans:
        Template literals in ES6 is a new technique for assigning strings with backtics (``) rather than '' or "" .
        It is different from string concatenation because unlike concatenation javascript variables are usable inside template literals with a ${} sign. It helps preventing frequent concating. 

