var resolver = {
    resolve: function resolve(options, callback) {
        // THE STRING TO RESOLVE
        var resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        var combinedOptions = Object.assign({}, options, { resolveString: resolveString });
        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        function randomCharacter(characters) {
            //Line below is for having multiple characters under var options => characters that can be cycled through
            //return characters[getRandomInteger(0, character.length - 1)];
            return characters;
        };

        function doRandomiserEffect(options, callback) {
            var characters = options.characters;
            var timeout = options.timeout;
            var element = options.element;
            var partialString = options.partialString;

            var iterations = options.iterations;

            setTimeout(function () {
                if (iterations >= 0) {
                    var nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

                    // ensures partialString without the random character as the final state
                    if (iterations === 0) {
                        element.textContent = partialString;
                    }
                    else {
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                    }
                    doRandomiserEffect(nextOptions, callback);
                }
                else if (typeof callback === "function") {
                    callback();
                }
            }, options.timeout);

        };

        function doResolverEffect(options, callback) {
            var resolveString = options.resolveString;
            var characters = options.characters;
            var offset = options.offset;
            var partialString = resolveString.substring(0, offset);
            var combinedOptions = Object.assign({}, options, { partialString: partialString });

            doRandomiserEffect(combinedOptions, function (){
                var nextOptions =  Object.assign({}, options, { offset: offset + 1 });

                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                }
                else if (typeof callback === "function"){
                    callback();
                }
            });
        };

        doResolverEffect(combinedOptions, callback);
    }
};

var strings = ["a web developer.", "a writer.", "a data journalist.", "never gonna give you up, never gonna let you down, never gonna run around and desert you."];
var counter = 0;
var options = {
    offset: 0,
    timeout: 4,
    iterations: 20,
    characters: ['_',],
    resolveSting: strings[counter],
    element: document.querySelector('[data-target-resolver'),
    };

// callback function when resolveString completes

function callback() {
    setTimeout(function () {
        counter++;

        if (counter >= strings.length) {
            counter = 0;
        }

        var nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
        resolver.resolve(nextOptions, callback);
    }, 1000);
}

resolver.resolve(options, callback);
console.log("type_effect.js | status: OK")


